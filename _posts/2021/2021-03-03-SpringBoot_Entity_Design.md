---
layout: post
title: -Spring- ORM 객체 분석설계 (Entity Design)
categories: [Development,Spring]
tags: [Spring]
date: 2021-03-03 23:14:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 JPA를 올바르게 사용하기 위해서는 Entity 설계를 정확하게 해야한다.  
 좀 더 정확한 설계를 위해 알아보자.
<!--more-->

## @Annotation  
먼저 ORM설계는 연관관계가 가장중요하다.  
JPA는 잘알고 사용하면 편하지만 설계부터가 잘못되면 아무 쓸모없는 스택이 되는것이다.  
객체를 설계할때는 연관관계는 어떻게 정할것 이며, 연관관계의 주인은 어떤 객체로 할 것인지 정해야한다.  

### @OneToOne  

이 `Annotation`은 1 : 1 관계 맵핑을 할때 사용된다. 예를 들어 한개의 주문에 한개의 배달이 할당된다면 연관관계의 주인은 거울이된 인스턴스의 Key를 알아야한다.  
```java
@Entity
public class Order{

  @OneToOne
  @JoinColumn(name = "delivery_id")
  private Delivery delivery;

}

@Entity
public class Delivery{

    @OneToOne(mappedBy = "delivery")
    private Order order;
}
```  

위관계에서는 `*Access`가 많이 일어나는 Order가 연관관계의 주인이 되므로 위의 코드처럼 볼 수 있다.  

### @OneToMany
이 `Annotation`은 1 : * 관계를 맵핑할때 사용된다.  

아래의 코드처럼 많은 `Order`를 가지는 `Member`는 연관관계의 주인이 될 수 없다.  
연관관계의 주인이 되려면 Order로서 Member의 키를 가지고 있어야한다. 다음의 코드를보자.  

```java
@Entity
public class Member{

  @OneToMany(mappedBy = "member")
  private List<Order> orders = new ArrayList<>();

}

@Entity
public class Order{

  @ManyToOne
  @JoinColumn(name = "member_id")
  private Member member;

}

```  
연관관계의 주인이 되려면 가지는 객체를 Key로서 찾을수 있어야한다.  
`Order`는 `member_id`로 Member를 찾을 수 있지만, Member로는 해당 주문만 찾을 수 없기에 연관관계의 주인은 `Order`가 되야한다.  

### @ManyToMany  

이 * : * 관계는 중간에 맵핑해줄 테이블이 필요하다. 객체는 자신의 요소로서 컬렉션을 소유할 수 있지만 RDBS로는 불가능 하기때문에 * : * 관계에 연관관계 주인이 필요하다.
