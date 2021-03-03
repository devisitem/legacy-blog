---
layout: post
title: -SpringBoot- H2 DB Test
categories: [Development,Spring]
tags: [Spring]
date: 2021-02-22 22:20:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 스프링 부트 H2 Database Test 연동
<!--more-->  

## application.yml

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
  #org.hibernate.type: trace

```
`application.yml` 작성시에 username과 password 를 data-username,data-password로 작성해서 오류발생.  

이틀동안 이것떄문에 엄청 나게 고생했다.  

## Repository
```java
@Repository
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    public Long save(Member member){
        em.persist(member);
        return member.getId();
    }
    public Member find(Long id){
        return em.find(Member.class,id);
    }
}

```  
## RepositoryTest
```java
@SpringBootTest
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;

    @Test
    @Transactional
    public void testMember() throws Exception{
        //given
        Member member = new Member();
        member.setUsername("memberA");

        //when
        Long savedId = memberRepository.save(member);
        Member findMember = memberRepository.find(savedId);

        //then
        Assertions.assertThat(findMember.getId()).isEqualTo(member.getId());
        Assertions.assertThat(findMember.getUsername()).isEqualTo(member.getUsername());

    }
}
```
## Entity
```java
@Entity
@Getter @Setter
public class Member {
    @Id @GeneratedValue
    private Long id;
    private String username;
}

```
