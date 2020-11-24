---
layout: post
title: -Flutter- 당겨지는 리스트 (AlwaysScrollableScrollPhysics property)
categories: [Subjects,Flutter]
tags: [Flutter]
date: 2020-11-24 17:20:00 +0900
excerpt_separator: <!--more-->
hide: false
---
IOS에서 리스트를 당기면 고무줄 처럼 다시돌아오는 기능을 플러터에서 구현합니다.  
<!--more-->
먼저 적용 이미지 입니다.  


![프로그래스바 이미지]({{ "/assets/img/bloging/flutter/bouncingList.gif" | relative_url }})  


다음의 코드입니다.  
```
            Container(
              color: Colors.white,
              height: double.infinity,
              child: SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(
                  parent: BouncingScrollPhysics(),
                ),
                child:  ListBody(
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.symmetric(horizontal:  16.0, vertical: 8.0),
                      margin: EdgeInsets.symmetric(horizontal: 20.0,vertical :16.0),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30.0),
                        color: HexColor("#e1e4ea"),
                      ),
                      child: Text('제목'),
                    ),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal:  16.0, vertical: 8.0),
                      margin: EdgeInsets.symmetric(horizontal: 20.0,vertical :8.0),
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(30.0),
                        color: HexColor("#e1e4ea"),
                      ),
                      child: SingleChildScrollView(
                        child: Container(
                          child: Text('내용 내용 내용 내용 '
                              '내용 내용 내용 내용 내용 내용 내용 '
                              '내용 내용 내용 내용 내용 내용 내용 '
                              '내용 내용 내용 내용 내용 내용 내용 '
                              '내용 내용 내용 내용 내용 내용 내용 '
                          ),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            )

```
