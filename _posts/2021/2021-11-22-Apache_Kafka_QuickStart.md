---
layout: post
title: -Kafka- Introduction (번역)
categories: [Development,Kafka]
tags: [Kafka,Apache Kafka]
date: 2021-11-17 20:39:00 +0900
thumbnail: "/assets/img/bloging/kafka/kafka_logo.png"
excerpt_separator: <!--more-->
hide: true
---
강력한 메세지큐 카프카

<!--more-->
# Apache Kafka Quick Start

### 1 단계: 카프카 설치

카프카 최신 릴리즈를 [다운로드](https://www.apache.org/dyn/closer.cgi?path=/kafka/3.0.0/kafka_2.13-3.0.0.tgz) 받고 압축해제 하세요.
```terminal
$ tar -xzf kafka_2.13-3.0.0.tgz
$ cd kafka_2.13-3.0.0
```


### 2 단계: 카프카 환경 시작

참고: 로컬 환경은 자바 8 이상이 설치 되있어야해요.

정확한 명령으로 모든 서비스를 시작하기 위해 다음의 명령을 실행하세요.

```terminal
# Zookeeper 서비스 시작
# 참고: 곧 Zookeeper는 Apache Kafka에서 필요하지 않아요.
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```


다른 터미널을 열고 아래를 실행하세요.

```terminal
# Kafka 브로커 서비스 시작
$ bin/kafka-server-start.sh config/server.properties
```

한번에 모든서비스가 성공적으로 실행됐고, 기본적인 카프카 환경을 실행하고 사용할 준비가 됩니다.


### 3 단계: 이벤트를 저장할 토픽생성

카프카는 이벤트를 읽기, 쓰기, 저장, 처리하도록 해주는 분산 이벤트 스트리밍 플랫폼 입니다.
