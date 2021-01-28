---
layout: post
title: -Android- RelativeLayout(안드로이드 레이아웃)
categories: [Development,Android]
tags: [Android]
date: 2020-12-31 15:00:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 안드로이드를 시작하며 앱,웹 의 기본인 레이아웃을 알아봅니다.
<!--more-->
##RelativeLayout  
```terminal
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
</RelativeLayout>
```  
`RelativeLayout`은 말 그대로 관계를 정의하는 레이아웃 이라 생각하면 편합니다.  
기존 html과 비슷하게 안드로이드 화면도 `Tag`형태인 xml 작성할 수 있습니다.  

위의 코드는 기본 레이아웃을 잡아주는 태그이고 아직 아무것도 입력하지 않았습니다.  

그렇지만 `properties`는 입력이 되있죠.  
간단하게 width는 말그대로 넓이,  height은 높이 ,orientation 은 방향  
단어만 보고 이 레이아웃의 초기 설정을 유추할 수 있습니다.  
`match_parent`값은 부모의 크기로 맞추게 됩니다.  
`vertical`속성은 수직으로 라고 할 수 있겠죠?  

그럼 이제 이 레이아웃의 화면을 확인하면,  

![레이아웃 설정화면]({{ "/assets/img/bloging/android/basicLayout0.png" | relative_url }})   

아무것도 안나옵니다. 배치할 틀을 만든거지 배치를 하지않았어요.  

`Flutter`에서 **Text 위젯** 처럼 `TextView` 태그를 사용합니다.  


![텍스트 뷰 사용]({{ "/assets/img/bloging/android/basicLayout1.png" | relative_url }})   

이런식으로 `<Tex` 까지만 쳤는데도 똑똑한 안스는 바로 캐치해줍니다.  
엔터를 누르게되면,

![텍스트 뷰 사용]({{ "/assets/img/bloging/android/basicLayout2.png" | relative_url }})  
바로 위에서 봤듯이 크기를 설정해달라고 숟가락으로 밥떠먹여줘요.  
이클립스와 비슷한게 `ctrl + space`  (Mac은 `command + space`)로 보면 아래처럼 확인할 수있습니다.  

![텍스트 뷰 사용]({{ "/assets/img/bloging/android/basicLayout3.png" | relative_url }})  
뭐 다른것도 있지만 오늘은 두가지만 알아봅니다.  
`match_parent : `**부모의 크기만큼 차지합니다.**  
`wrap_content : `**해당 컴포넌트 만큼(본인크기) 차지합니다.**  

크기를 정하며 다음과같은 속성들도 사용할수있습니다.  
`text : `**입력할 문자열을 받습니다.**
`textSize : `**텍스트의 크기를 설정합니다.**  
`id : `**html로 치면 id 입니다. (너무 중요해요.)**  
`RelativeLayout` 은 아까도 말씀드렸다시피 관계를 정해줘야하는 Layout 인데요.  

선택자를 활용해서 기본적인 레이아웃을 아래처럼 짤수있습니다.
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="1"
    android:textSize="20sp"
    android:layout_above="@+id/TextView_2"
    android:layout_centerHorizontal="true"></TextView>
    <TextView
        android:id="@+id/TextView_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="2"
        android:textSize="20sp"
        android:layout_centerInParent="true"></TextView>
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="3"
        android:textSize="20sp"
        android:layout_below="@id/TextView_2"
        android:layout_centerHorizontal="true"></TextView>

</RelativeLayout>
```  

![레이아웃 활용 ]({{ "/assets/img/bloging/android/basicLayout4.png" | relative_url }})  
