---
layout: post
title: -Spring- ORM 객체 분석설계 2편 (Entity Design)
categories: [Development,Spring]
tags: [Spring]
date: 2021-03-05 22:18:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 JPA를 올바르게 사용하기 위해서는 Entity 설계를 정확하게 해야한다.  
 좀 더 정확한 설계를 위해 알아보자.
<!--more-->

## 연관관계, 지연로딩  

즉시로딩은 인스턴스가 생성될때 인스턴스 안에있는 요소( field )를 같이 가져오거나 영속화하는 방식이다.  
다음의 코드를 보자.

```java

public class Kimchi{

  @ManyToOne
  private List<Source> sources = new ArrayList<>();

}
```  

최초의 `@XToOne`은 `fetch` 타입이 `**EAGER**`이다. 이건 즉시로딩을 의미하는데, 즉시로딩 ( EAGER )는 예측이어렵고 어떤 SQL이 실행될지 추적하기 어렵다. 특히 JPQL을 실행할 때 N+1 문제가 자주발생한다. 그러므로 실무에선 모든 연관관계를 지연로딩 `( LAZY )`로 설정해야한다.  

다음은 지연로딩으로 설정하는방법이다.  
```java

public class Kimchi{

  @ManyToOne(fetch = FetchType.LAZY) // or @ManyToOne(FetchType.LAZY)
  private List<Source> sources = new ArrayList<>();

}
```  

컬렉션을 소유한 객체를 영속화 시키게 되면, 컬렉션을 감싸서 하이버네이트가 제공하는 내장 컬렉션으로 변경한다. 내장 컬렉션으로 변경하는 이유는 영속화가 될시 하이버네이트는 요소를 추적해야하기 위해서이다. 컬렉션은 field 레벨에서 생성 하는것이 가장 안전하고, 코드도 간결하다.  

## DB테이블 네이밍  

`@Table` 키워드에 name을 설정하지 않았을 경우 `SpringPhysicalNamingStrategy`클래스가 자동으로 다음과 같이 변경한다.  

1. camelCase -> underscore(memberName = member_name)  
2. .(dot) -> _(underscore)  
3. UpperCase -> lowercase  

논리명 생성 : 명시적으로 컬럼, 테이블명을 직접 적지않으면 ImplicitNamingStrategy 클래스를 사용한다.  
물리명 적용 spring.jpa.hibernate.naming.phygical-strategy: 모든 논리명에 적용됨, 실제 테이블에 적용  
(Username -> usernm 등으로 회사 룰로 바꿀수 있음)  

## Cascade Persistance  

cascade = CascadeType.ALL을 적용시 연관관계의 주인만 영속화를 시켜도 cascade가 등록된 인스턴스 까지 한번에 영속화를 진행한다.  
delete할때도 같다.  

```java

public class KimchiOrder{

  @OneToMany(mappedBy = "kimchiOrder", cascade = CascadeType.ALL)
  private List<Kimchi> kimchies =  new ArrayList<>();

}

```  
연관관계의 주인만 영속화 시켜도 `cascade`가 등록된 인스턴스까지 한번에 영속화를 진행한다.  
`delete`할때도 같다.  

## 양방향 연관관계 편의 메서드  
양방향 연관관계에 있어서 객체를 `setting`할 떄는 `setter`를 만들기보다는 `Business Method`를 만든다.  
상대 객체의 프로퍼티를 세팅함과 동시에 해당 객체의 프로퍼티에도 상대객체의 프로퍼티를 등록하는 다음의 코드를 보자.  

```java

public class Order{


  Fields...


  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @OneToOne(fetch = LAZY)
  @JoinColumn(name = "delivery_id")
  private Delivery delivery;

  public void setMember(Memeber member){
    this.member = member;
    member.getOrders().add(this);
  }
  /* JPQL을 보낼때 값세팅을 쉽게할 수 있도록 작성 */

  public void setDelivery(Delivery delivery){
    this.delivery = delivery;
    delivery.setOrder(this);
  }

}

```
