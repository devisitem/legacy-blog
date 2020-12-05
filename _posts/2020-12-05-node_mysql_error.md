---
layout: post
title: -Mysql- NodeJS 연동 에러
categories: [Development,Mysql]
tags: [Mysql,NodeJS]
date: 2020-12-05 11:48:00 +0900
excerpt_separator: <!--more-->
hide: false
---
`Node`에서 `Mysql`모듈 사용 시 `Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client` 에러가 발생합니다.  
<!--more-->

현재 `Mysql` version이 8.x 일때 이런 오류가 발생하는것 같습니다.  

완벽한 오류 해결 법은 아니지만 해결은 할수있습니다.  
`window` 버튼을 눌러 `MySQL Installer - Comumnity` 를 찾아 실행합니다.  

![MySQL Installer - Comumnity 실행]({{ "/assets/img/bloging/node/mysql_error1.png" | relative_url }})  

위화면처럼 실행이되었다면 `MySQL Server` 옆에있는 `Reconfigure` 을 클릭  
그리고 다음의 순서대로 진행합니다.   
![MySQL Installer - Comumnity 실행]({{ "/assets/img/bloging/node/mysql_error2.png" | relative_url }})  
![MySQL Installer - Comumnity 실행]({{ "/assets/img/bloging/node/mysql_error3.png" | relative_url }})  
![MySQL Installer - Comumnity 실행]({{ "/assets/img/bloging/node/mysql_error4.png" | relative_url }})  

 선택이 모두 끝났다면 `Next` 를 눌러 진행하며 `excute` 로 필요한 파일 들을 다운 받고 `finish` 합니다.  

이상입니다.
