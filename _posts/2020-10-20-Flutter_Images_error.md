---
layout: post
title: -Flutter- 이미지 등록 오류 (Unable to load asset)
categories: [Subjects,Flutter]
tags: [Flutter]
excerpt_separator: <!--more-->
hide: false
---
Flutter앱에 이미지를 적용 도중 Exception이 발생한다.  

========Unable to load asset,Exception========  

<!--more-->

오늘도 flutter앱 작성도중 이미지가필요하여 assets등록 하여 사용하다 Exception에 마주하였습니다.  

(문제) 해당 log 이미지  


![이미지 등록 에러]({{ "/assets/img/pexels/image error1.png" | relative_url }})  


이런식으로 Exception이 발생하여 적용이 되었습니다.




(해결)
해당문제는 puvspec.yaml 에 asset등록으로 해주어서 해결 할 수있습니다.  
먼저 파일 경로 입니다 아래 보시는 바와 같이 prototype_a 아래로 images Directory 가 위치해있습니다.  


![파일 경로]({{ "/assets/img/pexels/image error2.png" | relative_url }})  


pubspec.yaml 파일 내 asset 입니다. 아래 형식처럼 등록하면 생성한 images파일내 모든파일 을 사용하겠다는 겁니다.  


![파일 경로]({{ "/assets/img/pexels/image error3.png" | relative_url }})  



마지막으로 사용할 위젯에서서 아래 형식처럼 맨앞에 '/' (슬래시) 를 붙이지 않고 입력합니다.




![파일 경로]({{ "/assets/img/pexels/image error4.png" | relative_url }})  


만약 위 상황처럼 했는데도 정확이 적용이 안된다면 안드로이드 스튜디오를 재시작하시거나 에뮬레이터를 재시작 하시면 됩니다.
