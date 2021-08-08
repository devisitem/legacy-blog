---
layout: post
title: -Spring- @Transactional javaDoc 번역 (트랜잭션)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-08-09 11:44:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_logo.png"
excerpt_separator: <!--more-->
hide: true
---
Spring Framework 5.3.9 @Transactional

<!--more-->
# @Transactional
스프링에서 지원하는 트랜잭션은 어떤 방식으로 동작하고 어떤순서로 어떤 구성을 갖는지를 알아봅니다.
지원되는 트랜잭션 방식은 여러가지 지만 이번엔 어노테이션 타입의 트랜잭션을 공부합니다.
먼저 공식문서를 통해 어떻게 정의 되어있는지 확인할게요.

## Opficial Docs
[원문 Transactional (Spring Framework 5.3.9 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html)

### 어노테이션 타입

```java
@Target(value={TYPE,METHOD})
@Retention(value=RUNTIME)
@Inherited
@Documented
public @interface Transactional
```

개별 메소드 또는 클래스에 트랜잭션 속성을 표시하는 어노테이션 입니다.

이 어노테이션이 클래스 레벨에 선언되면, 해당 서브클래스와 선언된 클래스의 모든 메서드는 기본적으로 적용됩니다. 이 어노테이션은 클래스 계층의 조상 클래스에는 적용되지 않습니다. 상속된메소드는
