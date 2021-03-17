---
layout: post
title: -Spring- JPA 동적쿼리  
categories: [Development,Spring]
tags: [Spring]
date: 2021-03-17 20:41:00 +0900
excerpt_separator: <!--more-->
hide: false
---
JPA에서 표준 스펙으로 제공하는 동적쿼리 작성 방식을 알아보자.
<!--more-->

## Criteria  
개발자들은 JPA를사용하면서 어떡하면 유지보수성도 뛰어나고 간결한 로직으로 동적쿼리를 생성할까 많은 고민을 해왔다.  
그 결과 JPA 에서 표준스펙으로 제공하는 Critertia가 나온다. 일단 사용법은.. 다음과 같다.

```java
public List<Order> findAllByCriteria(OrderSearch orderSearch){
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<Order> cq = cb.createQuery(Order.class);
    Root<Order> o = cq.from(Order.class);
    Join<Object,Object> m = o.join("member",JoinType.INNER);

    List<Predicate> criteria = new ArrayList<>();
    //주문 상태 검색
    if(orderSearch.getOrderStatus() != null){
        Predicate status = cb.equal(o.get("status"), orderSearch.getOrderStatus());
        criteria.add(status);
    }
    //회원 이름 검색
    if(StringUtils.hasText(orderSearch.getMemberName())){
        Predicate name = cb.like(m.get("name"), "%" + orderSearch.getMemberName() + "%");
        criteria.add(name);
    }

    cq.where(cb.and(criteria.toArray(new Predicate[criteria.size()])));
    TypedQuery<Order> query = em.createQuery(cq).setMaxResults(1000);
    return query.getResultList();

}
```  

상황은 이렇다. 먼저 주문목록을 가져오는 로직이다. 그중에서 주문상태 별로 가져오거나 등록된 회원이름으로 가져오는 것 또는 두가지 상황을 다 넣어서 결과를 가져오는 로직이다.  
너무 복잡해서 이해하기도 싫다. 하지만 혹시몰라 기록 하면서.. Querydsl을 쓰자.

## Logger  
```java

Logger logger = LoggerFactory.getLogger(getClass());

```  

위 처럼 사용하던것을 그냥 아래처럼 편리하게 사용할 수 있다.  

```java
@Controller
@Slf4j
public class KimchiController{
  ...
}
```
