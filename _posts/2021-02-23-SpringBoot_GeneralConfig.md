---
layout: post
title: -SpringBoot- General Configuration (스프링부트 프로젝트 설정)
categories: [Development,Spring]
tags: [Spring]
date: 2021-02-23 21:45:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 스프링 부트 프로젝트 일반 설정
<!--more-->  
## spring.io

`spring.io`에서 `spring initializr`를 이용, 일반 라이브러리를 추가하여 프로젝트를 생성한다.  
1. Spring Web - mvc 및 was 등 웹앱 구성에필요한 기본적인 요소들을 지원해준다.  
2. Thymeleaf - `spring`에서 밀어주는 템플릿 엔진  
3. Spring Data JPA - JPA 지원 이하 생략.  
4. Lombok - 편리한 객체관리  
5. H2 or MySql - 데이터베이스 jdbc 등 편리한 db유틸 지원  

## applycation.yml  
```yml
spring:
  datasource:
    url: jdbc:h2:tcp://localhost/~/jpashop
    username: sa
    password:
    driver-class-name: org.h2.Driver

  jpa:
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
        #show_sql: true
        format_sql: true

logging.level:
  org.hibernate.SQL: debug
  org.hibernate.type: trace
```  
database 및 jpa ,logger 설정  
## 외부 라이브러리  
[P6spy 설정](gavlyukovskiy/spring-boot-data-source-decorator)  

```python
implementation 'org.springframework.boot:spring-boot-devtools'
```  
데브 툴즈 등록

```java
/*Repository*/
@Repository /* jpa Repository 등록 */
@PersistenceContext  /* 스프링 컨테이너 위에서 동작하므로 EntityManager 자동주입  */

/* Entity */
@Entity /* 데이터베이스와 1:1 Mapping entity */

@Id /* primary key 등록 */
@GeneratedValue /* index AutoIncrement 추가 */

```
