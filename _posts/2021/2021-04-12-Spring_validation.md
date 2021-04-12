---
layout: post
title: -Spring- Validation
categories: [Development,Docker]
tags: [Docker]
date: 2021-04-12 13:30:00 +0900
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/img/bloging/spring/validation_thumbnail.png"
---

Spring boot 객체 Dto 객체 설계와 유효성 검층을 편하게 사용할 수 있는 라이브러리

<!--more-->

## summary

 Spring boot 에서 지원하는 값 유효성 검증 라이브 러리이다. 손쉬운 사용으로 객체의 저장값을 컨트롤 할 수 있으며 에러또한 핸들링할 수 있다.



## install

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
    <version>2.4.4</version>
</dependency>

```

Spring boot 2.3이후부터 validation이 별도의 모듈로 분리되었다. 관련된 자동설정은 스프링부트 코어에서 제공하기 때문에 depedency만 추가해도 사용이 가능하다.



## usage

```java
 @PostMapping
    public ResponseEntity createEvent(@RequestBody @Valid EventDto eventDto, 		Errors errors){
        if(errors.hasErrors()){
            System.out.println("Bad Request !");
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.created(null).build();
    }
```

위와 같은 형식을 기준으로 사용할 때, @vaild를 사용하는 객체 바로 오른쪽 매개변수 자리에 Errors 클래스를 넣어서  에러를 핸들링할 수 있다.

```java
public class EventDto {

    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
    @NotNull
    private LocalDateTime beginEnrollmentDateTime;
    @NotNull
    private LocalDateTime closeEnrollmentDateTime;
    @NotNull
    private LocalDateTime beginEventDateTime;
    @NotNull
    private LocalDateTime endEventDateTime;
    private String location; // (optional)
    @Min(0)
    private int basePrice; // (optional)
    @Min(0)
    private int maxPrice; // (optional) private int
    @Min(0)
    private int limitOfEnrollment;
}
```

실제로 유효성이 검증되는 객체는 위와 같이 적용할 수 있다.
