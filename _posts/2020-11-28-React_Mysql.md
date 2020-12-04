---
layout: post
title: -React- Mysql 연동 -1/2-
categories: [Development,React]
tags: [React,SQL]
date: 2020-11-28 21:18:00 +0900
excerpt_separator: <!--more-->
hide: false
---
Mysql 에서 데이터를 받아와 서버에서 뷰로 전송합니다.

본글은 실제로 연동에 필요한 정보들만 입력하므로 테이블 **생성은 다루지않습니다**.
<!--more-->


![MySql 로고]({{ "/assets/img/bloging/react/mysqlLogo.png" | relative_url }})  

## MySQL Installation  













```terminal
my_react> npm install --save mysql
```


위의 명령어로 mysql 모듈을 설치합니다.  



## database.json 생성  







Database접속에 필요한 정보들을 가져올 json 형식의 파일을 작성합니다.  



```json
{
  "host" : "127.0.0.1",
  "user" : "userID",
  "password" : "userPassword",
  "port" : "3306",
  "database" : "DatabaseName"
}

```  





위의 정보를 입력했다면 거의 끝났습니다.  




## server.js 작성
```console
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: True }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = requir('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

app.get('/',(req,res) =>{
  connection.query(
    "select 1 + 1 as two from dual",
    (err,rows,field) => {
      res.send(rows);
    }
  )
});
app.listen(port,() => console.log(`Listening on port &{port}`));
```  









작성이 완료 됬다면 `yarn dev` 를 실행합니다.  






확인을 위해 `localhost:5000/`로 접속합니다.  

만약 `Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client` 이런 오류가 발생한다면,
**[오류해결](/post/node_mysql_error)**에서 해결 하실수 있습니다.  





해결이 완료 되었다면, 다음과 같이 확인할수있습니다.


![MySql 로고]({{ "/assets/img/bloging/react/mysql_first_data.png" | relative_url }})  
