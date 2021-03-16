---
layout: post
title: -Github- 깃 기본 명령어(Git Command)
categories: [Development,github]
tags: [github]
date: 2020-04-01 17:56:00 +0900
excerpt_separator: <!--more-->
hide: false
---
형상관리에 없어서는 안될 Github 그리고 그것들을 제어하는 Git 명령어를 살펴보자  


<!--more-->
## Git Basic Command  

1. git init  

```terminal

$ git init

```  
>현재 위치한 디렉토리 내에 로컬저장소를 생성한다. `.git`이란 이름의 디렉토리를 생성한다.
이 디렉토리는 `github`에 `remote repository`와 연결되며 변경된 파일을 받거나 보낼수있다.  

2. git status  
  
```terminal

$ git status

```
> 현재 local 또는 remote에서 일어나는 변경점 또는 현재상태를 확인할 수 있다.

2. git add  

```terminal

$ git add 파일명.확장  

```  
>변경된 파일을 stage area로 이동시킨다. 파일명 대신 . (dot)을 입력한다면 변경된 모든 파일을 이동시키겠다는 의미이다.

3. git commit  

```terminal

$ git commit -m "message"

```  

> stage area로 이동된 파일들을 저장한다.  

4. git remote add origin  

```terminal

$ git remote add origin

```  

>원격저장소와 현재 로컬저장소에 연결한다.


5. git push  

```terminal  

$ git push origin master

```  

> remote 저장소의 master 브랜치로  push 한다.
