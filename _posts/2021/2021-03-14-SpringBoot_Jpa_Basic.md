---
layout: post
title: -Spring- JPA 도메인 서비스 개발 (Domain Service)
categories: [Development,Spring]
tags: [Spring]
date: 2021-03-14 22:43:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 JPA는 인스턴스를 영속화할 수 있기 때문에 이를 잘 이용해야 한다.  
 JPA 도메인 서비스 개발 시 참고.  

<!--more-->  

## 파라미터 바인딩 (Parameter Binding)  

JPA를 사용하다보면 JPQL을 사용해야하는 상황이 있다. 이럴 때는 다음의 코드처럼 사용하자.  
다음의 상황은 같은 이름의 `Member`인스턴스를 조회하는 상황이다.  

```java

@PersistenceContext
private EntityManager em;

public List<Member> findByName(String name){
  return em.createQuery("select m from Member m where m.name = :name",Member.class)
          .setParameter("name",name)
          .getResultList();
}

```  

인스턴스를 조회하는 쿼리를 날리는데 `preparedStatement` 와 비슷한 형태로 `setParameter`에 의해 값을 넘기고, 해당 쿼리안에서 파라미터가 바인딩 된다.  

## @Transactional (트랜잭션 어노테이션)  

이 어노테이션은   
