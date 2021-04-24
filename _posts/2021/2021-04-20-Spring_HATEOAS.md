---
layout: post
title: -Spring- HATEOAS (스프링 헤이테오스)
categories: [Development,Spring]
tags: [Spring,HATEOAS,스프링 헤이테오스]
date: 2021-04-20 17:10:00 +0900
excerpt_separator: <!--more-->
hide: true
#thumbnail: "/assets/img/bloging/git/git_thumnail.png"
---

Spring HATEOAS 에대해배우고 Restful 한 API를 만들어 보자

<!--more-->
## HATEOAS 란?  
**H**ypermedia **A**s **T**he **E**ngine **O**f **A**pplication **S**tate  
응용프로그램 상태의 Hypermedia로서 전이 시키는 것 입니다. 예를 들어 `POST /api/user/A`처럼 A라는 유저를 생성하라는 요청을 보냈는데 `A`라는 유저가 이미 있는 유저라면 응답으로서 그 유저를 조회하는방법 또는 현재 상태를 전이할 수있는 `URL`을 보낼 수 있습니다.
