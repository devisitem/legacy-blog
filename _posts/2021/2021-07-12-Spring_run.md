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
public class KimnchiApplication {
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

쭉 들어가다보면 `return new SpringApplication(prinmarySources).run(args));`  
1. 생성자를 통한 초기화를 진행합니다.
2. 초기화 된 객체의 `.run()` 을 실행합니다.


`run()` 메소드는 한가지가 아닙니다. `SpringBootApplication`을 실행할 수 있는 메소드가 여러 개 `overloading`되어 있어요.

공통점은  스프링 부트에서는 기본설정을 사용하는 지정된소스로부터 `SpringBootApplication` 을 실행 한다는거죠 쉽게말해서 이미 만들어진걸로 돌린다는 의미입니다.

### .run() Method

|순서|메소드명|static ?|리턴타입|매개변수|
|---|---|-----|-----|
|1|run| none | ConfigurableApplicationContext | String… args |
|2|^^| static | ConfigurableApplicationContext | Class<?> primarySource, String… args |
|3|^^| static |ConfigurableApplicationContext | Class<?>[] primarySources, String[] args |

**2**,**3** 의 경우 static이기 때문에 외부에서 기본설정으로 실행하는 방법으로 쓰일수도 있습니다. 하지만 내부적으로 보면, 순서가 **2** -> **3** -> **1** 의 순서를 가지고 있기때문에 **2** 에서 시작하든 **3** 에서 시작하던 넘겨주는 시점에 `Parameter`만 다른것이지 결국 **1** 로 이어 집니다.

위에서 언급했지만 결국 세가지 의 공통점은 실행중인`ApplicationContext`를 리턴 한다는 점입니다. 파라미터의 primarySource 는 어플리케이션을 실행할때 기본적으로 사용할 소스입니다. 이 포스트 기준으로는 `KimnchiApplication.class` 즉 클래스 정보예요.


`run()`메소드의 테이블 **3** 은 다음의 구성으로 작성되어있습니다.

```java

public static ConfigurableApplicationContext run(Class<?>[] primarySources, String[] args) {
	return new SpringApplication(primarySources).run(args);
}

```

여기에 선언된 `.run()` 메소드가 마지막 순서 **1** 입니다. 이걸보기전에 생성자로 무엇을 초기화 시켜주는지 볼까요? 아래에 다음의 코드가 나옵니다.

```java

public SpringApplication(Class<?>... primarySources) {
	this(null, primarySources);
}

```

`overloading` 된 생성자의 첫번째 인자로 null을 보내내요. 들어온 가변인자는 그대로 보내주고요.

```java



@SuppressWarnings({ "unchecked", "rawtypes" })
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
		this.resourceLoader = resourceLoader;
		Assert.notNull(primarySources, "PrimarySources must not be null");
		this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
		this.webApplicationType = WebApplicationType.deduceFromClasspath();
		thi	s.bootstrappers = new ArrayList<>(getSpringFactoriesInstances(Bootstrapper.class));
		setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
		setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
		this.mainApplicationClass = deduceMainApplicationClass();
}

```

새로운`SpringApplication` 인스턴스를 생성 합니다. `ApplicationContext`는 지정된 주요소스로 부터 `Bean`들을 로드 합니다. 인스턴스는 *1* 이 호출되기 전에 변경될 수 있습니다. `webApplicationType`은 `REACTIVE`인지 	`NONE`인지 `SERVLET`인지를 정합니다.
