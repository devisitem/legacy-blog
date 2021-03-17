---
layout: post
title: -Intellij- General Configuration (인텔리제이 설정)
categories: [Development,Intellij]
tags: [Intellij]
date: 2021-02-23 21:58:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 인텔리제이 기본설정 변경
<!--more-->

##  Live Template
Setting > Live Template 검색  
custom 으로 등록  
![Live Template 설정]({{ "/assets/img/bloging/intellij/intellij1.png" | relative_url }})  

## Build 환경 설정  
Setting > Gradle 검색  
![Gradle 빌드 설정]({{ "/assets/img/bloging/intellij/intellij2.png" | relative_url }})

위 `build` 설정은 testCase를 만들시 gradle에서 빌드하던것을 intellij 로 빌드 하도록 바꿔준 것이다.

testCase 빌드 안될시 체크.

## Annotation Error  
![AnnotationError]({{ "/assets/img/bloging/intellij/tableAnnotationError.png" | relative_url }})

## Intellij ShortCuts  

  - ⌘ : command  
  - ⇧ : Shift  
  - ⌃ : control  
  - ↩ : return  
  - ⌥ : option

### 테스트 인스턴스를 Method로 생성(Extract Method)

```java

//Before

Member member =  new Member();
member.setName("회원1");
member.setAddress(new Address("서울","강가","123-123"));
em.persist(member);

//After as Drag and ShortCuts
⌥ + ⌘ + M

private Member createMember() {
        Member member = new Member();
        member.setName("회원1");
        member.setAddress(new Address("서울", "강가", "123-123"));
        em.persist(member);
        return member;
    }
```  

### 메소드내 파라미터 생성 (Extract Parmeter)  

```java

private Member createMember() {
        Member member = new Member();
        member.setName(Here);
        member.setAddress(new Address("서울", "강가", "123-123"));
        em.persist(member);
        return member;
    }
// Here의 위치에 변수명을 입력하고 아래 단축키입력시 자동 파라미터 등록
⌥ + ⌘ + P

```
### 이전 또는 이후 커서의 위치로 이동  

`⌥` + `⌘` + `Left`  

### 라인 북마크 등록 및 이동  

  - 등록  : `⌃` + `⇧` + `원하는 번호`  
  - 이동  : `⇧` + `등록한 번호`  
