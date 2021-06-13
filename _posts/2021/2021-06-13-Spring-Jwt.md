---
layout: post
title: -Spring- JWT 토큰을 이요한 인증 (feat.ASCII Doctor)
categories: [Development,Spring]
tags: [JWT,Spring Security,Token]
date: 2021-05-14 20:50:00 +0900
thumbnail: "/assets/img/bloging/spring/rest_docs.png"
excerpt_separator: <!--more-->
hide: true
---
ASCII Doctor를 이용한 API 문서화

<!--more-->

## JWT 란?

**J**son **W**eb **T**oken의 줄임말이다. 그렇다면 JWT는?

RFC 7519 웹표준으로 지정되어있고 `JSON` 객체를 사용해서 토큰 자체에 정보들을 저장하고있는 `Web Token`이다. 사용방식도 매우 간편하고 쉽게 적용할 수 있어서 사이드 프로젝트 진행시에 정말 유용하게 사용할 수 있다.

JWT는 <span style="color: #fb015b;">Header</span>, <span style="color:#d63aff;">Payload</span>, <span style="color: #00b9f1;">Signature</span> 3가지의 부분으로 구성되어있다. 각 부분은 . (The period) 로 구분되는데, 아래와 같은 형식이다.

<span style="color: #fb015b;">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.<span style="color:#d63aff;">JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>.<span style="color: #00b9f1;">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>

<span style="color: #fb015b;">Header</span>는 `Signature` 를 해싱하기 위한 알고리즘 정보들이 담겨있다.  

<span style="color:#d63aff;">Payload</span>는 서버와 클라이언트가 주고받는, 시스템에서 실제로 사용될 정보에 대한 내용들을 담고있다.  

<span style="color: #00b9f1;">Signature</span>는 토큰의 유효성 검증을 위한 문자열이다. 이 문자열을 통해 서버에서 이 토큰이 유효한 검증할 수 있다.  



`JWT`의 장점은 중앙의 인증서버, 데이터 스토어에 대한 의존성이 없고 시스템 수평 확장에 유리하다는 점이있다.
