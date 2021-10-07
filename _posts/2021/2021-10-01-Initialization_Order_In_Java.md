---
layout: post
title: -Spring- 스프링 프레임워크 코어 (Spring Core)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-09-02 21:58:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_logo.png"
excerpt_separator: <!--more-->
hide: true
---
AbstractPlatformTransactionManager의 기능과 작업흐름

<!--more-->

## Initialization Order in Java



### The Reason for writen to this article

I wondered to Initialization order, when I had use a Spring's @ConfigurationProperties annotation. Using static block, instance block, constructor, setter (Injection field).

as consequence, I realized Which order, following definition below .

| order | applicable block | Initialization time                                      |
| ----- | ---------------- | -------------------------------------------------------- |
| 1     | static block     | befor allocate to memory in method area                  |
| 2     | instance block   | between allocate to memory and before create constructor |
| 3     | constructor      | allocate to memory on heap                               |
| 4     | setter method    | inject for field after constructor                       |



### Static Block

`static block` perform applicable code that, writen to block before Class be allocated to method area (JVM). which so that available initializing filed without set to value. therefore, static block is meaning that status for no memory address. because,



```java
public class Kimchi {
    static {
        System.out.println("Kimchi is traditional korean food")
