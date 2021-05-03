---
layout: post
title: -Spring- API 문서화 (Spring Rest Docs) 1/2
categories: [Development,Spring]
tags: [문서화,API 문서,Spring Rest Docs]
date: 2021-05-03 21:39:00 +0900
thumbnail: "/assets/img/bloging/spring/junit_logo.png"
excerpt_separator: <!--more-->
hide: false
---
Spring RestDocs를 이용한 API 문서화

<!--more-->

## Spring Rest Docs 1/2

`API` 를 문서화 한다하면 `swagger` 를 많이 사용하는데 실제 `API` 가 변경 되었을 때는 문서가 변경되지않기 때문에 `Spring Rest Docs` 라는 강력한 라이브러리를 사용해보았다.

### 사용

- Maven

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.restdocs/spring-restdocs-mockmvc -->
<dependency>
    <groupId>org.springframework.restdocs</groupId>
    <artifactId>spring-restdocs-mockmvc</artifactId>
    <version>2.0.5.RELEASE</version>
    <scope>test</scope>
</dependency>

```



사용법은 간단하다. `@AutoConfigureRestDocs` 를 선언해주고 필요한 코드를 작성할 수있다.

먼저 사용방법은 MockMvc로 사용할 수 있고, rest Asured로 사용할 수도 있는데 여기서는 MockMvc를 이용 한다.

```java
mockMvc.perform(post("/api/events/")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaTypes.HAL_JSON)
                .content(objectMapper.writeValueAsString(event)))

                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").exists())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andExpect(header().string(HttpHeaders.CONTENT_TYPE,MediaTypes.HAL_JSON_VALUE))
                .andExpect(jsonPath("free").value(false))
                .andExpect(jsonPath("offLine").value(true))
                .andExpect(jsonPath("eventStatus").value(EventStatus.DRAFT.name()))
                .andExpect(jsonPath("_links.self").exists())
                .andExpect(jsonPath("_links.query-events").exists())
                .andExpect(jsonPath("_links.update-event").exists())
                .andDo(document("create-event"));
```

`document()` 메소드는 첫번째 인자로 생성할 디렉토리명을 받는다. 이렇게만 하고 실행해도 아래 처럼 기본 문서를 생성할 수 있다.

![create docs]({{ "/assets/img/bloging/spring/rest_docs.png" | relative_url }})

그냥 이 상태로 실행하면 `format` 이 보기불편하다 그러므로 다음과같이 `Customizer` 를 생성할수 있다.



```java
import org.springframework.boot.test.autoconfigure.restdocs.RestDocsMockMvcConfigurationCustomizer;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;

@TestConfiguration
public class RestDocsConfiguration {

    @Bean
    public RestDocsMockMvcConfigurationCustomizer restDocsMockMvcConfigurationCustomizer(){
        return configurer -> configurer.operationPreprocessors()
                .withRequestDefaults(prettyPrint())
                .withResponseDefaults(prettyPrint());
    }
}
```

또한 `Test Class` 에서 사용할 때는 `@Import(RestDocsConfiguration.class)` 를 붙여줘야 등록한 빈을 사용할 수있다.



### 결과

```
[source,bash]
----
$ curl 'http://localhost:8080/api/events/' -i -X POST \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H 'Accept: application/hal+json' \
    -d '{
  "name" : "Spring",
  "description" : "REST PAI Development with Spring",
  "beginEnrollmentDateTime" : "2021-04-10T21:31:00",
  "closeEnrollmentDateTime" : "2021-04-11T21:31:00",
  "beginEventDateTime" : "2021-04-12T21:31:00",
  "endEventDateTime" : "2021-04-13T21:34:00",
  "location" : "강남역 d2 스타텁 팩토리",
  "basePrice" : 100,
  "maxPrice" : 200,
  "limitOfEnrollment" : 100
}'
----
```
