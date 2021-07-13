---
layout: post
title: -Spring- run (Execute Spring Boot App Method)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-07-12 11:47:00 +0900
thumbnail: "/assets/img/bloging/jenkins/jenkins-logo.png"
excerpt_separator: <!--more-->
hide: true
---
Spring Boot run method

<!--more-->


# SpringApplication.run()
#SpringBoot/run

스프링부트는 스프링개발자가 빠르고 쉽게 어플리케이션을 확장할 수 있도록 도와주는 프레임워크다. 스프링부트는 `run`으로 부터 시작하여 어플리케이션을 실행한다. 다음과 같이 구성되는 데 `@SpringBootApplication`은 오늘 기록하지 않기때문에 `run`부터 스프링부트가 어떻게 실행되는지 알아볼 것이다.
스프링부트앱을 생성한다면 항상 앱 실행 파일이 존재한다.

### Application.java

```java
public class TestApplication {
		public static void main(Sgtring[] args) {
			SpringApplication.run(TestApplication.class, args);
		}
}
```

일반 `Java Application`처럼 `main`메소드로 실행하며 매개변수를 받는다. 안으로 들어가보자.
```java

public static ConfigurableApplicationContext run(Class<?> primarySource, String... args) {
	return run(new Class<?>[] { primarySource }, args);
}

```

클래스를 배열로받는 매개변수가 존제한다.
