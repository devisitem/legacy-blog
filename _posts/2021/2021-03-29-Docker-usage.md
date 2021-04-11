---
layout: post
title: -Docker- 도커 명령어 (docker)
categories: [Development,Docker]
tags: [Docker]
date: 2021-03-29 21:02:00 +0900
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/img/bloging/docker/dead-docker.png"
---

도커 명령어 정리

<!--more-->
# docker  

[docker_Image]({{ "/assets/img/bloging/docker/dead-docker.png" | relative_url }})  

---
<br>  
## run - 컨테이너 실행  

`docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] {ARG...}`  

| flag | for              |
|:---|:-----------------|
| -d | detached mode (백그라운드 모드)     |
| -p | 호스트포트와 컨테이너 포트를 연결    |
| -v | 호스트컨테이너의 디렉토리를 연결 |
| -e | 컨테이너 내에서 사용할 환경변수 설정|
| --name | 컨테이너 이름설정 |
| --rm | 프로세스 종료시 컨테이너 자동 제거 |
| --it | -i 와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션 |
| --network | 네트워크 연결 |

### ubuntu 컨테이너 생성 feat. shell  

`docker run rm -it ubuntu:20.04 /bin/bash`  

### for Redis  

`docker run --rm -p 1234:6379 redis`  

텔넷으로 접근  

```terminal

$ telnet localhost 1234

$ set hello world
+OK
$ get hello
$5
world
quit
```  

## ps 컨테이너 조회  
현재 실행중인 컨테이너 목록 조회  
`docker ps`  

모든 컨테이너 목록 에서 ubuntu만 조회  
`docker ps -a | grep ubuntu`  

## stop 컨테이너 중지  
`docker stop [OPTION] CONTAINER [CONTAINER...]`  

## logs  컨테이너 로그조회  
`docker logs [OPTION] CONTAINER`  

## images 이미지 조회  
`docker images [OPTIONS] [REPOSITORY[:TAG]]`  

## pull 이미지 다운로드  
`docker pull [OPTION] NAME[:TAG|@DIGEST]`  

## rmi 이미지 삭제  
`docker rmi [OPTIONS] IMAGE [IMAGE...]`  

## network  네트워크  

### create 네트워크 생성  
`docker network create [OPTIONS] NETWORK`  

### connect 명령어  
`docker network connect [OPTIONS] NETWORK CONTAINER`  

## volume mount (-v) 명령어  
`-v /my/own/datadir:/var/lib/mysql`  

## docker-compose (desktop 설치지 자동 설치)  
```yml
version: '2'
services:
  db:
    image: mysql:5.7
    volumes:
      - ./mysql:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: wordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      wordpress:
  image: wordpress:latest
  volumes:
    - ./wp:/var/www/html
  ports:
    - "8000:80"
  restart: always
  environment:
    WORDPRESS_DB_HOST: db:3306
    WORDPRESS_DB_PASSWORD: wordpress
```  
yml 파일 작성후 실행  
`도커 컴포즈 파일 경로> docker-compose up -d`  

## Image 생성  
`docker build -t name/imagename:tag .`  

| Keyword                      | for          |
|:-----------------------------|:-----------------|
| FROM | 베이스 이미지 |
| RUN  | 쉘 명령어 실행 |
| CMD  | 컨테이너 기본 실행 명령어 (Entrypoint의 인자로 사용) |
| EXPOSE  | 오픈되는 포트 정보 |
| ENV  | 환경변수 설정 |
| ADD  | 파일 또는 디렉토리 추가. URL/ZIP 사용가능 |
| COPY  | 파일 또는 디렉토리 추가 |
| ENTRYPOINT | 컨테이너 기본 실행 명령어 |
| VOLUME | 외부 마운트 포인트 생성 |
| USER | RUN,CMD,ENTRYPOINT를 실행하는 사용자 |
| WORKDIR | 작업 디렉토리 설정 |
| ARGS | 빌드타임 환경변수 설정 |
| LABEL | key - value 데이터 |
| ONBUILD | 다른 빌드의 베이스로 사용될때 사용하는 명령어 |

## Git을 설치한 ubuntu 이미지  
1. dockerfile 생성  
```
FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y git
```  

2. dockerfile build  
```terminal
$ docker build -t ubuntu:git-dockerfile .
$ docker images | grep ubuntu
```  

## webapp dockerfile  

```
# 1. node 이미지 사용
FROM node:12-alpine

#2.패키지 우선 복사
COPY ./package* /usr/src/app/
WORKDIR /usr/src/app
RUN     npm install

# 3. 소스 복사
COPY . /usr/src/app

# 4. WEB 서버 실행 (Listen 포트 정의) EXPOSE 3000
CMD node app.js
```  
## 도커 허브에 이미지 저장  
```
docker login
docker push {ID}/example
```  
