---
layout: post
title: -DataBase- 간단한 ERD 생성 및 사용 (With dbdiagram.io)
categories: [Development,DataBase]
tags: [DataBase]
date: 2021-03-01 17:17:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 간단한코드로 ERD 생성
<!--more-->  

[**dbdiagram.io**](https://dbdiagram.io/d)를 이용한 ERD 생성  

간단한 코드작성으로 ERD 및 테이블 생성 까지가능한 무료 사이트 `dbdiagram.io`를 이용하여 생성 합니다.  
## 코드작성  

```java
Table Member as member{
  member_id bigint [pk, increment,not null]
  username varchar
  city varchar
  street varchar
  zipcode varchar
  delete_yn char [default:'N']
}

Table Orders as order{
  order_id bigint [pk, increment,not null]
  member_id bigint [ref: > member.member_id]
  delivery_id bigint [ref: - delivery.delivery_id]
  orderdate datetime [default: `now()`]
  status OrderStatus
  indexes{
    (status) [name:'OrderStatus']
    order_id [unique]
  }
}

Table Delivery as delivery{
  delivery_id bigint [pk, increment]
  status DeliveryStatus
  city varchar
  street varchar
  zipcode varchar
}

Table Order_Item as order_item{
  order_item_id bigint [pk, increment]
  order_id bigint [ref: < order.order_id]
  item_id bigint [ref: > item.item_id]
}

Table Item as item{
  item_id bigint [pk,increment]
  name varchar
  price integer
  stockquantity integer
  dtype varchar
  artist varchar
  ect varchar
  author varchar
  isbn varchar
  diretor varchar
  actor varchar

}

Table Category_Item as category_item {
  cartegory_id bigint [ref: < category.category_id]
  item_id bigint [ref: > item.item_id]
}

Table Category as category{
  category_id bigint [pk,increment,not null]
  parent_id bigint [ref: > category.category_id]
  name varchar [not null]
}

Enum OrderStatus{
  ORDER
  CANCEL
}
Enum DeliveryStatus{
  READY
  COMP
}

```  


## 생성된 테이블 확인
![생성된 테이블 이미지]({{ "/assets/img/bloging/database/JPASHOP_ERD.png" | relative_url }})  

생성된 `ERD`는 이미지로 내보낼수있고 데이터베이스 테이블을 가져와서 `ERD`를 만들수도 있습니다.
