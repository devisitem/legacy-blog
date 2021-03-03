---
layout: post
title: -Flutter- 프로그래스바 (Progress bar widget)
categories: [Development,Flutter]
tags: [Flutter]
date: 2020-11-20 17:09:00 +0900
excerpt_separator: <!--more-->
hide: false
---

특정한 목록 및 프로젝트의 진행률을 표시할수 있는 프로그래스바 입니다.

  <!--more-->

![프로그래스바 이미지]({{ "/assets/img/bloging/flutter/progressbar.png" | relative_url }})

`Progressbar`는 각종 진행률을 시각화 해줄수있는 아주 기본적인 위젯입니다.
```
Column(
          children: <Widget>[
            Text(
              '깃 브랜치 작업',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            Container(
              margin: EdgeInsets.symmetric(vertical: 5),
              width: 300,
              height: 20,
              child: ClipRRect(
                borderRadius: BorderRadius.all(Radius.circular(10)),
                child: LinearProgressIndicator(
                  value: 0.4622,
                  backgroundColor: Colors.grey,
                ),
              ),
            ),
          ],
        ),
```
  개인적으로 위 `Widget`은 실제로 사용하셔도 좋지만 `Animation` 이 없기 때문에 다소 밋밋할수 있습니다.
  `Animation Progress Bar` 는 귀찮은게 좀 많기에 간단한 화면 설계 시에는 이 `Widget` 을 사용하시는 걸 추천합니다.


   다음 관련 Post엔 [LinearProgressIndicator](/posts/Flutter_progress_bar/#) 로 `Animation`이 가능한 Widget 포스트을 작성하겠습니다.
