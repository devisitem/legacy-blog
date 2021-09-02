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
# @Transactionald
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

이 어노테이션이 클래스 레벨에 선언되면, 해당 서브클래스와 선언된 클래스의 모든 메서드는 기본적으로 적용됩니다. 이 어노테이션은 클래스 계층의 조상 클래스에는 적용되지 않습니다. 상속된 메소드는 서브클래스 어노테이션 안에서 참여하기 위해 지역적으로 재선언될 필요가 있습니다. 메소드의 가시성 제약에대한 자세한 사항은 수동 참조의 [Transaction Management](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#transaction)를 참조하세요.

이 어노테이션 타입은 일반적으로 스프링의 [RuleBasedTransactionAttribute](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/interceptor/RuleBasedTransactionAttribute.html)클래스를 직접 비교할 수 있고, 실제로 [AnnotationTransactionAttributeSource](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/AnnotationTransactionAttributeSource.html)가 후자 클래스에 데이터를 바로 변환 하므로 스프링의 트랜잭션 지원 코드는 이 어노테이션에 대해 알 필요가 없어요. 사용자가 만든 롤백 룰이 적용되지 않는 다면, 트랜잭션은 예외를 체크하지 않지만, RuntimeException 과 Error에서 롤백 합니다. 어노테이션 속성 의미의 자세한 정보는
[TransactionDefinition](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/TransactionDefinition.html)와 [TransactionAttribute](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/interceptor/TransactionAttribute.html)를 참조하세요.

이 어노테이션은 일반적으로 현재 실행 쓰레드 내에서 모든 데이터 엑세스를 작업할 트랜잭션을 표시하여, [PlatformTransactionManager](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/PlatformTransactionManager.html)
에서 관리되는 쓰레드가 처리 해야하는 트랜잭션과 함께 작동합니다. **참고: 이 어노테이션은 메소드 내에서 새롭게 시작하는 쓰레드를 전파하지 않음.**

또는 이 어노테이션은 쓰레드로컬 변수 대신에 리액터 컨텍스트를 사용하는 [ReactiveTransactionManager](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/ReactiveTransactionManager.html)가 관리하는 리액티브 트랜잭션을 구분할 수 있어요. 결과적으로, 모든 참여 데이터 엑세스 작업은 동일한 리액티브 파이프라인의 동일한 리액터 컨텍스트 내에서 실행해야 합니다.


## 속성과 트랜잭션의 도우미들

### 시작하며

위의 문서에서 트랜잭션 어노테이션이 대충 어떤 역할을 하는지 알아봤어요. 이제는 각 속성과 구현체들이 어떤 역할을 하는지 알아보려 합니다. 먼저 트랜잭션을 대표하는 속성들이 내부적으로 어떻게 동작하는지 확인하고, 구현체들을 공부할 거에요.
