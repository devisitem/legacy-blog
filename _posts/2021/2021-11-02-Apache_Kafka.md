---
layout: post
title: -Spring- TransactionManager (트랜잭션 관리자)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-11-01 18:58:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_logo.png"
excerpt_separator: <!--more-->
hide: true
---
강력한 메세지큐 카프카

<!--more-->

`Apache kafka`는 데이터 통합, 스트리밍 분석, 고성능 데이터 파이프라인 그리고 미션 크리티컬한 어플리케이션을 위해 수많은 회사가 사용한 분산 이벤트 스트리밍 플랫폼 오픈소스 입니다.

## 소개

[원문](https://kafka.apache.org/intro)

**이벤트 스트림이 뭔가요?**

이벤트 스트림은 사람으로 치면, 인체의 중추신경계의 디지털 버전이에요. 이는 비즈니스가 점점 더 소프트웨어 정의 및 자동화되고 소프트웨어 사용자가 더 많은 소프트웨어인 '상시 가동' 세계를 위한 기술 기반입니다. 기술적인 표현으로 이벤트 스트림은 데이터 베이스, 센서, 모바일 기기, 클라우드 서비스같은 이벤트소스로부터 실시간 데이터 캡쳐 연습이고, 이벤트 스트림 형식의 소프트웨어 어플리케이션은 이러한 이벤트 스트림을 안전하게 저장합니다.
