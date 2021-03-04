---
layout: post
title: -Spring- ORM 객체 분석설계 2편 (Entity Design)
categories: [Development,Spring]
tags: [Spring]
date: 2021-03-04 22:18:00 +0900
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

public class KimchiProject{

  @Id @GeneratedValue
  @Column(name = "kimchi_pj_id")
  private Long id;

  @OneToMay(mappedBy = "kimchiProject")
  private List<Person> maker = new ArrayList<>();

}

```
