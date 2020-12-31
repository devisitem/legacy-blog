---
layout: post
title: -Spring- lombok 설치
categories: [Development,Spring]
tags: [Spring]
date: 2020-12-09 21:10:00 +0900
excerpt_separator: <!--more-->
hide: false
---
Spring,Spring boot 에서 dependency 만 추가한다고 lombok 이 적용 되지는 않습니다.
<!--more-->
## lombok 의 필요성  
프로젝트를 수행하다보면 spring은 자바로 해야하기 때문에 명시적으로 사용할 것 이다 라고 해줘야 하는 경우가 많습니다.  
특히 `VO(dto)`같은 경우는 `getter`와 `setter` 가 거의 필수적으로 필요하기 때문이죠.  
하지만 프로젝트가 커지면서 필요한 데이터를 계속 만들면 만들수록 VO의 내용이 계속 추가 되기 때문에 사용하기,  
복잡할정도로 이 `Column`이 어떤 역할를 하는지 어디에 써야하는지 헷갈릴수도 있습니다.  

그래서 저희는 `lombok`을 사용합니다.  
`lombok`은 `@Anotation` 을 사용하여 `Getter` 와 `Setter`등 VO 사용에 필요한 요소들을 자동적으로,  
생성하여 유저입장에서 복잡함 없이 단순히 `field`만 정의하면 편하게 개발할 수 있습니다.  





## dependency 의존성 주입  

`pom.xml` 에 `dependency`를 추가 합니다.
```xml
	<dependency>
		<groupId>org.projectlombok</groupId>
		<artifactId>lombok</artifactId>
		<version>1.18.16</version>
		<scope>provided</scope>
	</dependency>
```  

추가를 했다면 아래에 화면처럼 실행합니다.  
프로젝트 우클릭 후  
![maven update]({{ "/assets/img/bloging/spring/lombok1.png" | relative_url }})  
실행한다면  
![maven update2]({{ "/assets/img/bloging/spring/lombok2.png" | relative_url }})  

## lombok 설치
update가 완료 되었다면,  
![lombok 설치]({{ "/assets/img/bloging/spring/lombok3.png" | relative_url }})  
![lombok 설치]({{ "/assets/img/bloging/spring/lombok4.png" | relative_url }})  
위경로를 복사하고 `Apply and Close` 합니다.  
![lombok 설치]({{ "/assets/img/bloging/spring/lombok5.png" | relative_url }})  
실행해줍니다.  
![lombok 설치]({{ "/assets/img/bloging/spring/lombok6.png" | relative_url }})  
![mlombok 설치]({{ "/assets/img/bloging/spring/lombok7.png" | relative_url }})  
![lombok 설치]({{ "/assets/img/bloging/spring/lombok8.png" | relative_url }})  
설치가 완료 되었다면 `본인이클립스.ini 파일에` 에 다음에 내용을 추가 합니다.  
```terminal
--add-modules=ALL-SYSTEM
-javaagent:E:\sts-4.8.1.RELEASE\lombok.jar

```  

이제 `Eclipse`를 재시작 한다면, vo에 적용 되있는걸 볼 수 있습니다.  
![maven update2]({{ "/assets/img/bloging/spring/lombok9.png" | relative_url }})  
