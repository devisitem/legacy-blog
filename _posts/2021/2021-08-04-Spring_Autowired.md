---
layout: post
title: -Spring- @Autowired javaDoc 번역 (@Autowired)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-08-04 11:44:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_boot_logo.png"
excerpt_separator: <!--more-->
hide: true
---
Spring Framework 5.3.9 @Autowired

<!--more-->
# @Autowired
`Spring framework`을 사용하면, 당연스레 쓸수 밖에 없는게 `@Autowired` Annotation 이에요.  이번에는 `docs.spring.io`에 정의 되어있는 글을 번역하여, 어떠한 내용이 제공되는지 확인 해볼 예정이에요.

[원문 Spring Framework 5.3.9 @Autowired](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html)

```java
@Target(value={CONSTRUCTOR,METHOD,PARAMETER,FIELD,ANNOTATION_TYPE})
@Retention(value=RUNTIME)
@Documented
public @interface Autowired
```

*Spring의 의존성 자동주입 기능에 의해  자동연결되도록 생성자, 필드, 세터 메소드 설정 메소드를 표시합니다. 이 Annotation은 JSR-330 [@Inject](https://docs.oracle.com/javaee/7/api/javax/inject/Inject.html?is-external=true) Annotation을 대안으로, 필요 대 선택의 의미를 더합니다.*

## 자동연결 생성자
주어진 bean class 중 단 한개의 생성자만이 required() true로 이 annotation을 선언할 수 있고, 이는 Spring bean으로 사용될때 자동연결할 생성자를 나타냅니다. 게다가, required 속성이 `true`로 설정된다면, 단일 생성자 만이 `@Autowired`로 Annotation을 달 수 있어요.

만약 필요하지 않은 여러 생성자가 Annotation을 선언한다면, 자동 연결할 후보로 간주됩니다. Spring Container 안에서 bean을 일치시켜  만족할 수 있는 의존성이 가장 많은 생성자가 선택 됩니다. 만약 후보중 어느것도 만족되는 생성자가 없다면, 주요 또는 기본 생성자가(있는 경우) 사용됩니다.
마찬가지로, 한 클래스가 여러 생성자를 선언 했지만, `@Autowired`로 주석이 달린 것이 어느것도 없다면, 주요 또는 기본 생성자가(있는 경우) 사용 됩니다. 처음에 한 클래스가 단일 생성자만 선언 한다면, 이는  Annoation이 달리지 않은 것 까지도 항상 사용 됩니다.
