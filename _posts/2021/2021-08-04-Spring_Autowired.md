---
layout: post
title: -Spring- @Autowired javaDoc 번역 (@Autowired)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-08-04 11:44:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_logo.png"
excerpt_separator: <!--more-->
hide: false
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
public @interface Autowired+
```

*Spring의 의존성 자동주입 기능에 의해  자동연결되도록 생성자, 필드, 세터 메소드 설정 메소드를 표시합니다. 이 Annotation은 JSR-330 [@Inject](https://docs.oracle.com/javaee/7/api/javax/inject/Inject.html?is-external=true) Annotation을 대안으로, 필요 대 선택의 의미를 더합니다.*


## 생성자 자동연결

주어진 bean class 중 단 한개의 생성자만이 required() true로 이 annotation을 선언할 수 있고, 이는 Spring bean으로 사용될때 자동연결할 생성자를 나타냅니다. 게다가, required 속성이 `true(default)`로 설정 된다면, 단일 생성자 만이 `@Autowired`로 Annotation을 달 수 있어요.

만약 필요하지 않은 여러 생성자가 Annotation을 선언한다면, 자동 연결할 후보로 간주됩니다. Spring Container 안에서 bean을 일치시켜  만족할 수 있는 의존성이 가장 많은 생성자가 선택 됩니다. 만약 후보중 어느것도 만족되는 생성자가 없다면, 주요 또는 기본 생성자가(있는 경우) 사용됩니다.
마찬가지로, 클래스가 여러 생성자를 선언 했지만, `@Autowired`가 달린 것이 어느것도 없다면, 주요 또는 기본 생성자가(있는 경우) 사용 됩니다. 클래스가 시작할 단일 생성자만 선언 한다면,  이는 Annotation이 없어도 항상 사용됩니다. Annotation이 선언된 생성자는 publc일 필요 없습니다.


## 필드 자동연결

필드는 bean이 생성된 직후 바로 주입되며, 모든 설정 메소드가 호출되기 전입니다. 설정 필드는 publc일 필요 없습니다.


## 메소드 자동연결
임의의 이름과 많은 매개변수를 가진 메소드를 설정합니다. 각 매개변수는 Spring Contgainer 안에서 빈을 일치시켜 자동연결 됩니다. 설정 메소드는 public일 필요 없습니다. Bean 구성의 Setter 메소드는 일반 설정 메소드 중애서 특별한 케이스일 뿐이에요.


## 매개변수 자동연결
Spring Framework 5.0 부터 @Autowired는 기술적으로, 별개의 메소드나 생성자의 파라미터에 선언될 수 있지만, framework의 대부분은 이런 선언들을 무시합니다. 사실상 매개변수 자동연결은 Spring Framework 코어중 하나만 지원하는데 spring-test안에 있는 JUnit Jupiter 입니다. [TestContext framework 참조 문서를 보세요.](https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#testcontext-junit-jupiter-di)


## 여러 인자와 ‘	required’ 의미
여러개의 인자를 가진 생성자의 경우. [required()](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html#required--) 속성이 모든 인자에 적용됩니다. 개별 파라미터는 Spring framework 5.0 부터 java-8 스타일 [Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html?is-external=true)로나, 코틀린의 not-null 파라미터타입 또는 @Nullable로도 기본 'required’ 의미적으로 overriding하여 선언될 수 있어요.


## 배열, 컬렉션 및 맵 자동연결
배열,[컬렉션](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html?is-external=true) 또는 [맵](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html?is-external=true) 의존성 타입의 경우, 컨테이너는 선언된 값 타입을 일치시켜 모든 Bean을 자동연결 합니다. 이런 목적을 위해 맵 키는 해당 Bean의 이름으로 해석될 String 타입으로 선언되야합니다. 이런 컨테이너 제공 Callection은 대상 구성요소 중에서 [Ordered](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/Ordered.html)와 [@Order](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/annotation/Order.html) 값을 고려하여 정렬하고, 아니면 컨테이너안에서 등록된 순서에 따라 정렬됩니다. 그렇지않으면, 일치하는 단일대상 Bean은 이러한 것으로 주입되어, 일반적으로 지정된 타입 Collection이나 Map 자체가 되기도 합니다.


## BeanPostProcessor 또는 BeanFactoryPostProcessor 내 미지원

실제 주입은 [BeanPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanPostProcessor.html) 를 통해 수행되므로 이는 결국 @Autowired를 사용하여 [BeanPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanPostProcessor.html) 또는 [BeanFactoryPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/config/BeanFactoryPostProcessor.html) 타입에 참조를 주입할 수 없음을 의미합니다. [AutowiredAnnotationBeanPostProcessor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/AutowiredAnnotationBeanPostProcessor.html) 클래스에 대한 자바독스를 참조하세요. (기본적으로 이 어노테이션이 있는지 확인 합니다.)


## 요약
filed에서 @Autowired를 사용하지 않는다면, Bean은 주입되지 않는다. 위의 내용을 따르면 `@AutowiredAnnotationBeanPostProcessor`가 @Autowired 어노테이션이 있는지 확인을 하고 `BeanPostProcessor`가 주입을 한다는 이야기이다.
