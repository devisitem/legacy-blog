---
layout: post
title: -React- 프로젝트 시작하기
categories: [Subjects,React]
tags: [React]
date: 2020-11-21 20:24:00 +0900
excerpt_separator: <!--more-->
hide: false
---

`MissionFamily`의 미션들을 관리할 수 있는 WebSite가 필요했는데 마침 공부도할겸  

React 프로젝트로 진행하기로 하였습니다.

<!--more-->

![리액트 로고]({{ "/assets/img/bloging/react/reactLogo.png" | relative_url }})

## Node Installation

리액트를 시작하기 이전에 몇가지 환경을 쉽게 구축할수있도록 `Node`를 깔아주도록 합시다.  
먼저 [**Node.js**](https://nodejs.org/ko/)로 가서 다운로드 해주도록합시다.  

  ![Nodejs페이지]({{ "/assets/img/bloging/react/nodePage.png" | relative_url }})


다운로드가 완료되면 `version` 을 확인 해봐야겠죠?  

```terminal
Administrator> npm --version
6.14.8
```

version을 확인 했다면 설치가 완료 된 것 입니다.  
**N**ode**P**ackage**M**anager 은 Node에서 사용할수있는 Package를 쉽게 사용할 수 있게 만들어주는 좋은 Manager입니다.  

### Create-react-app


```terminal
Administrator> npm install -g create-react-app
```

이후 설치가 완료된다면 원하는 폴더로 이동하여 리액트 앱을 설치 해주도록 합시다.


```terminal
Administrator> cd c:/my_react  
my_react> create-react-app . // 1번
my_react> create-react-app my_first_reactApp // 2번
```
```
1번
C:드라이브
└ my_react
  └ src ...
    이하 리액트앱의 뼈대
```  
해당경로에 뼈대 바로 설치  
```
2번
C:드라이브
└ my_react
   └ my_first_reactApp
      └ src ...
      이하 리액트앱의 뼈대
```  
해당경로 아래에 입력한이름의 폴더를생성하고 그안에 뼈대 설치

이제 리액트 앱을 실행할 준비가 되었습니다.

## Start React

```
my_react> npm run start
```  
리액트 앱을 시작하게 되면
  ![리액트페이지]({{ "assets/img/bloging/react/startReact.png" | relative_url }})

만약 브라우저가 자동으로 실행되지않는다면 **<http://localhost:3000>** 으로 접속하시면 확인가능합니다.
