---
layout: post
title: -SpringBoot- jar파일 배포 (SpringBoot App Distribution)
categories: [Development,Spring]
tags: [Spring]
date: 2021-02-28 23:10:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 스프링 부트 프로젝트 일반 설정 변경
<!--more-->  
## gradlew build  

빌드를 하기전 배포를 진행할 프로젝트 파일로 이동
```terminal
$ ./gradlew clean build

```
`./gradlew clean build` 명령을 시작하게되면 바로 프로젝트를 jar 파일로 만듭니다.  

![배포 폴더 이동]({{ "/assets/img/bloging/spring/distribution01.png" | relative_url }})   

해당 폴더에서 `java -jar 조회된파일.jar` 입력시 서버가 실행된다.
