---
layout: post
title: -SpringBoot- 객체 관계 맵핑 (ORM)
categories: [Development,Spring]
tags: [Spring]
date: 2021-03-01 23:10:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 JPA 객체 관계 맵핑
<!--more-->  
## ORM  기본  
**O**bject **R**elational **M**apping  
은 `*데이터 베이스` 안에서 연관지어진 관계를 객체로 가져올 수 있도록 만들어진 프로그래밍 기법이다.  

### 상속 관계 맵핑  
부모객체에 `@Inheritance` Annotation을 추가한다.  
자식객체가 정의되는 기준을 이 Annotation의 매개변수로 정할 수가 있는데,  
그 `field`는 세 가지 종류로 나뉘어져 있다.  
1. SINGLE_TABLE  
 : 하위 객체들의 필드를 한테이블에 모두 넣어 만든다.  
2. TABLE_PER_CLASS  
 : 정규화 없이 하위객체를 각자 다른 테이블로 만든다.
3. JOINED  
 : 각 테이블을 정규화가 적용된 스타일로 만든다.  

위 세가지의 방법은 다음과 같이 적용할 수 있다.  

```java  

@Inheritance(stratege = InheritanceType.SINGLE_TABLE)
public class ParentClass{
  ...field
}

```  

`SINGLE_TABLE`은 저장될 때 구분값이 있어야 하므로, 부모 객체에는 `@DiscriminatorColumn` 으로 식별 컬럼을 정한다.  

```java  
/* 부모 객체 */
@DiscriminatorColumn(name = "childType")
@Inheritance(stratege = InheritanceType.SINGLE_TABLE)
public class ParentClass{
  ...field
}

...

/* 자식객체1 */
@DiscriminatorValue("child1")
public class FirstChildClass{
  ...field
}

...


/* 자식객체2 */
@DiscriminatorValue("child2")
public class SecondChildClass{
  ...field
}


```  
자식객체에도 `@DisciminatorValue`을 적용하여 시스템이 이해할 수 있는 객체의 구분을 준다면,  
위의 방식으로 해당하는 childType으로 객체를 맵핑한다.  

## 내장객체  
상속의 개념과 다르게 객체는 `field`로서 객체를 가질수 있다.  
다음의 `Annotation`을 적용한다면 `JPA`가 `ORM`으로 객체의 내장타입까지 `Mapping`한다.  

  1. 내장타입을 소유한 객체의 `Annotation`  

  ```java
  public class Delivery{

    ...other_field

    @Embedded
    private Address address;
  }
  ```  

  2. 내장타입이 되는 객체의 `Annotation`  

  ```java

  @Embeddable
  public class Address{

    ...field

  }

  ```
## Enum  
객체 맵핑에 있어서 `ENUM`값을 맵핑 할때는 상태값을 가질 객체에 필수적인 선언을 한다.  
해당 선언은 `Annotation`으로 할 수 있다.  

이 `@Enumerated`은 두 가지의 `EnumType`을 갖게 된다.  

### @Enumerated  
 1. **ORDINAL**
  - `ORDINAL`은 값들의 순서로 숫자를 넣는다. 예를 들어 다음과 같이 두가지의 상태값이 있다면,  

  ```java
  public enum OrderStatus{
    ORDER,COMPLETED
  }
  ```  
  첫번째 `Order`객체에 `OrderStatus`Column이 **ORDER** 면 데이터는 1 이라는 값으로 저장된다.
  그런데 만약 위에서 결제대기라는 값이 필요하다고 OrderStatus의 값으로 `Waiting` 이란 값도 넣어 달라고 했다면?
  해당 맵핑을 설계한 사람이라면, 그냥 X 된것이다.(욕아님 똥임)  

 2. **STRING**  
  - 그래서 우리는 다음과같이 해당값을 문자열로 저장할 수 있도록 `STRING`을 사용한다.  

```java  
public class Order{
  ...other_field

  @Enumerated(EnumType.STRING)
  private OrderStatus orderstatus;
}
```  
## 번외, 기본  
`@OneTomany`,`@ManyToOne`,`@OneToOne`,`@ManyToMany`과 같은 기본적인 객체관계맵핑 중에서,  
`@OneToOne`은 맵핑관계에 있어서 **Access**가 많이 발생하는 테이블을 기준으로 *FK를 정한다.  
