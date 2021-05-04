---
layout: post
title: -Spring- API 문서화 (Spring Rest Docs) 2/2
categories: [Development,Spring]
tags: [문서화,API 문서,Spring Rest Docs,relaxedResponseField,responseField]
date: 2021-05-04 21:39:00 +0900
thumbnail: "/assets/img/bloging/spring/rest_docs.png"
excerpt_separator: <!--more-->
hide: false
---
Spring RestDocs를 이용한 API 문서화

<!--more-->
## Rest Docs 2/2

1편에서 기본적인 사용법에 대해서 다루었다면 이번엔 조금 더 상세하게 문서화 하는 순서를 가진다. `document` 의 두번째 인자부터는 문서화할 내용을 받는다.

`_links` 의 각 정보 ,`request` 의 `header` ,`content type` 정보, `response` 의 `header`,`content type` 정보 등등 여러가지 정보들을 문서화 할수 있게끔 지원한다.



```java
.andDo(document("create-event",
                        links(
                                linkWithRel("self").description("link to self"),
                                linkWithRel("query-events").description("link to query events"),
                                linkWithRel("update-event").description("link to update an existing")
                        ),
                        requestFields(
                                fieldWithPath("name").description("Name of new event"),
                                fieldWithPath("description").description("description of new event"),
                                fieldWithPath("beginEnrollmentDateTime").description("data time of begin of new event"),
                                fieldWithPath("closeEnrollmentDateTime").description("data time of close of new event"),
                                fieldWithPath("beginEventDateTime").description("data time of begin of new event"),
                                fieldWithPath("endEventDateTime").description("data time of close of new event"),
                                fieldWithPath("location").description("location of new event"),
                                fieldWithPath("basePrice").description("basePrice of new event"),
                                fieldWithPath("maxPrice").description("maxPrice of new event"),
                                fieldWithPath("limitOfEnrollment").description("limit of enrollment")
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location Header"),
                                headerWithName(HttpHeaders.CONTENT_TYPE).description("HAL JSON")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("id").description("identifier of new event"),
                                fieldWithPath("name").description("Name of new event"),
                                fieldWithPath("description").description("description of new event"),
                                fieldWithPath("beginEnrollmentDateTime").description("data time of begin of new event"),
                                fieldWithPath("closeEnrollmentDateTime").description("data time of close of new event"),
                                fieldWithPath("beginEventDateTime").description("data time of begin of new event"),
                                fieldWithPath("endEventDateTime").description("data time of close of new event"),
                                fieldWithPath("location").description("location of new event"),
                                fieldWithPath("basePrice").description("basePrice of new event"),
                                fieldWithPath("maxPrice").description("maxPrice of new event"),
                                fieldWithPath("limitOfEnrollment").description("limit of enrollment"),
                                fieldWithPath("free").description("it tells is this event is free or not"),
                                fieldWithPath("offLine").description("it tells is this event is offline meeting or not"),
                                fieldWithPath("eventStatus").description("eventStatus")

                        )
                ));
```



### relaxedResponseFields

이 `method` 는 모든 필드자체를 문서화 하지않고 일부만 출력할때 사용한다. 하지만 단점은 응답으로 돌아오는 Field를 이용하여 정확한 문서를 만들지 못한다.

특히 `HAL+JSON` 포맷을 같은 응답이라면 사용하기가 더까다롭다. `HAL` 은 직접 API 문서화 할 시 하나씩 작성해줘야한다.

```java
responseFields(
        fieldWithPath("id").description("identifier of new event"),
        fieldWithPath("name").description("Name of new event"),
        fieldWithPath("description").description("description of new event"),
        fieldWithPath("beginEnrollmentDateTime").description("data time of begin of new event"),
        fieldWithPath("closeEnrollmentDateTime").description("data time of close of new event"),
        fieldWithPath("beginEventDateTime").description("data time of begin of new event"),
        fieldWithPath("endEventDateTime").description("data time of close of new event"),
        fieldWithPath("location").description("location of new event"),
        fieldWithPath("basePrice").description("basePrice of new event"),
        fieldWithPath("maxPrice").description("maxPrice of new event"),
        fieldWithPath("limitOfEnrollment").description("limit of enrollment"),
        fieldWithPath("free").description("it tells is this event is free or not"),
        fieldWithPath("offLine").description("it tells is this event is offline meeting or not"),
        fieldWithPath("eventStatus").description("eventStatus"),
        fieldWithPath("_links.self.href").description("link to self"),
        fieldWithPath("_links.query-events.href").description("link to query events"),
        fieldWithPath("_links.update-event.href").description("link to update events")

)
```

위에서 `relaxedResponseFields` 로 작성했던것을 `HAL` 의 `_links` 까지 포함시키기위해 직접 작성하였다. 이렇게 작성해야한 기존 api가 변경되었을경우에도 선언되있지 않은 `field` 까지 감지할 수 있어서, 바로변경 된다.
