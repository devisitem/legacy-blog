---
layout: post
title: -SpringBoot- 앱 기반 작성 01
categories: [Development,Spring]
tags: [Spring]
date: 2021-01-31 15:15:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 스프링 부트 기본 설계지식
<!--more-->  

## pom.xml  

`boot` 에서는 groupId를 `org.springframework.boot`로 통용한다.  

`pom.xml`에서도 상속 관계를 가질수 있는데 기본적으로 `<parent>`태그에 존재하는 상위프로젝트의 `pom.xml`의 파일을 상속 받는다.  
쉽게 얘기해서 부모 파일의 `dependency` 정보나 `plug-in` 정보를 상속 받는다.  
대부분의 의존성 대한 버전이 저장되어있다.  
`dependendies`태그에 정의 되어있는 `dependency` 들중 version이 등록 되어있지않다면, 상위 부모 pom에 등록이 되어있다.  
