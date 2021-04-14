---
layout: post
title: -Spring- Validation
categories: [Development,Spring]
tags: [Spring]
date: 2021-04-14 17:30:00 +0900
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/img/bloging/spring/serializationError.png"
---

Spring 에서 제공하는 validation의 Errors객체는 자바빈 표준스펙을 준수하지않기 때문에 serializing시 에러가 발생한다. 

<!--more-->
## [Error] No serializer found for class

![Serialization Error]({{ "/assets/img/bloging/spring/serializationError.png" | relative_url }})

---
<br>
### 원인


```
...

Caused by: com.fasterxml.jackson.databind.exc.InvalidDefinitionException: No serializer found for class org.springframework.validation.DefaultMessageCodesResolver and no properties discovered to create BeanSerializer (to avoid exception, disable SerializationFeature.FAIL_ON_EMPTY_BEANS) (through reference chain: org.springframework.validation.BeanPropertyBindingResult["messageCodesResolver"])

...
```  



일반 객체는 serialization 될때 Java Bean 표준스펙을 준수한다면 BeanSerializer를 통해 직렬화가 되지만 표준스펙을 따르지않는 객체는 직렬화 할 수 없다. 나는 spring 에서 지원해주는 validation 의 Error객체를 http body 에 담아서 응답을 보내려했지만, 응답의 `ContentType`이 `application/hal+json` 이기에 자동으로 serialization 하려한것이였다.하지만 Errors 클래스는 Java Bean 표준 스펙을 준수하지않는 객체 였기때문에 에러가 발생하였고, 이를 해결해야한다.  그래서 Errors를 직접 serialization할 HandlerClass 를 만들기로 하였다.  





```java
@Component
public class EventValidator {

    public void validate(EventDto eventDto, Errors errors){
        if(eventDto.getBasePrice() > eventDto.getMaxPrice() && eventDto.getMaxPrice() != 0){
            errors.rejectValue("basePrice","wrongValue","BasePrice is wrong.");
            errors.rejectValue("maxPrice","wrongValue","MaxPrice is wrong.");
        }

        LocalDateTime endEventDateTime = eventDto.getEndEventDateTime();
        if(endEventDateTime.isBefore(eventDto.getBeginEventDateTime()) ||
        endEventDateTime.isBefore(eventDto.getCloseEnrollmentDateTime())||
        endEventDateTime.isBefore(eventDto.getBeginEnrollmentDateTime())){
            errors.rejectValue("endEventDateTime","wrongValue","endEventDateTime is wrong");
        }

        //TODO beginEventDateTime
        //TODO CloseEnrollmentDateTime
    }
}

```

먼저 기존의  spring에서 지원하는 validation 클래스를 사용하여 유효성을 검증하는 부분이 한정적이기에 임의로 만든 클래스를 보면 6,7번째 라인에 `errors.rejectValue("...")`로 Field Error를 넣어주었다. 이는 첫번째 인자에 명시되어있는 `field`에 대한 에러를 담는 것인데, 응답을 받는 사용자는 Field Error를 보고서도 판단할 수있지만, 종합적인 Error를 명시해주면  API 응답 정보로서의 이해를 쉽게할 수 있다. Global Error를 넣기위해서는 errors객체에 `reject(...)`메서드로 작성할 수 있다.

```java
if(eventDto.getBasePrice() > eventDto.getMaxPrice() && eventDto.getMaxPrice() != 0){
            errors.rejectValue("basePrice","wrongValue","BasePrice is wrong.");
            //fieldError
            errors.rejectValue("maxPrice","wrongValue","MaxPrice is wrong.");
            //globalError
            errors.reject("wrongPrices","Value for Prices are wrong");
        }
```

---
<br>
### 해결

이렇게함으로써 `Erros` 객체에  Global Error를 담고, 이제 이에러를 Serialization할 Handler를 만들어준다.

```java
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.validation.Errors;

import java.io.IOException;

@JsonComponent //Error를 serializing 되는시점에 이클래스가 동작할 수 있도록 Bean으로 등록한다.
public class ErrorsSerializer extends JsonSerializer<Errors> {

    @Override
    public void serialize(Errors errors, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartArray();
        //Field Error
        errors.getFieldErrors().forEach( e -> {
            try {
                gen.writeStartObject();
                gen.writeStringField("field",e.getField());
                gen.writeStringField("objectName",e.getObjectName());
                gen.writeStringField("code",e.getCode());
                gen.writeStringField("defaultMessage",e.getDefaultMessage());
                Object rejectedValue = e.getRejectedValue();

                if(rejectedValue != null){
                    gen.writeStringField("rejectedValue",rejectedValue.toString());
                }

                gen.writeEndObject();
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        });

        //Global Error
        errors.getGlobalErrors().forEach((e -> {
            try {
                gen.writeStartObject();
                gen.writeStringField("objectName",e.getObjectName());
                gen.writeStringField("code",e.getCode());
                gen.writeStringField("defaultMessage",e.getDefaultMessage());
                gen.writeEndObject();
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }

        }));

        gen.writeEndArray();

    }

}
```

응답 테스트를 위해 mockMvc를 작성하여 테스트

```java
@Test
    @DisplayName("입력값이 잘못된 경우에 에러가 발생하는 테스트")
    public void createEvent_Bad_Request_Wrong_Input() throws Exception {
        //given
        EventDto eventDto = EventDto.builder()
                .name("Spring")
                .description("REST PAI Development with Spring")
                .beginEnrollmentDateTime(LocalDateTime.of(2021,04,13,21,31))
                .closeEnrollmentDateTime(LocalDateTime.of(2021,04,12,21,31))
                .beginEventDateTime(LocalDateTime.of(2021,04,11,21,31))
                .endEventDateTime(LocalDateTime.of(2021,04,10,21,34))
                .basePrice(10000)
                .maxPrice(200)
                .limitOfEnrollment(100)
                .location("강남역 d2 스타텁 팩토리")
                .build();

        mockMvc.perform(post("/api/events")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(eventDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[0].objectName").exists())
                .andExpect(jsonPath("$[0].field").exists()) // 만약 응답에 field error를 넣어주지 않았더라면 테스트 실패
                .andExpect(jsonPath("$[0].defaultMessage").exists())
                .andExpect(jsonPath("$[0].code").exists())  //테스트 실패 동일
                .andExpect(jsonPath("$[0].rejectedValue").exists());

        //when

        //then

    }
```

---
<br>
### 결과 (응답) :

```yml
MockHttpServletRequest:
      HTTP Method = POST
      Request URI = /api/events
       Parameters = {}
          Headers = [Content-Type:"application/json;charset=UTF-8", Content-Length:"349"]
             Body = {"name":"Spring","description":"REST PAI Development with Spring","beginEnrollmentDateTime":"2021-04-13T21:31:00","closeEnrollmentDateTime":"2021-04-12T21:31:00","beginEventDateTime":"2021-04-11T21:31:00","endEventDateTime":"2021-04-10T21:34:00","location":"강남역 d2 스타텁 팩토리","basePrice":10000,"maxPrice":200,"limitOfEnrollment":100}
    Session Attrs = {}

Handler:
             Type = me.kimchidev.demorestapi.events.EventController
           Method = me.kimchidev.demorestapi.events.EventController#createEvent(EventDto, Errors)

Async:
    Async started = false
     Async result = null

Resolved Exception:
             Type = null

ModelAndView:
        View name = null
             View = null
            Model = null

FlashMap:
       Attributes = null

MockHttpServletResponse:
           Status = 400
    Error message = null
          Headers = [Content-Type:"application/hal+json"]
     Content type = application/hal+json
             Body = [{"field":"basePrice","objectName":"eventDto","code":"wrongValue","defaultMessage":"BasePrice is wrong.","rejectedValue":"10000"},{"field":"maxPrice","objectName":"eventDto","code":"wrongValue","defaultMessage":"MaxPrice is wrong.","rejectedValue":"200"},{"field":"endEventDateTime","objectName":"eventDto","code":"wrongValue","defaultMessage":"endEventDateTime is wrong","rejectedValue":"2021-04-10T21:34"},{"objectName":"eventDto","code":"wrongPrices","defaultMessage":"Value for Prices are wrong"}]
    Forwarded URL = null
   Redirected URL = null
          Cookies = []

```
