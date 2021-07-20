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


`resourceLoader`는 사용할 리소스 로더입니다. `primaraySource`는 주요`Bean` 소스들 입니다.
새로운`SpringApplication` 인스턴스를 생성 합니다. `ApplicationContext`는 지정된 주요소스로 부터 `Bean`들을 로드 합니다. 인스턴스는 **1** 이 호출되기 전에 변경될 수 있습니다. 들어온 `primarySource`를 `LinkedHashSet`로 생성합니다.
순서는있지만 중복되지않도록 생성한다.. 뭔가 상상은 가지만 아직은 모르기때문에 넘어갑니다. `webApplicationType`은 `REACTIVE`인지 `NONE`인지 `SERVLET`인지를 정합니다.

### BootStrapper.class

여기서 부터 좀 중요한거같습니다. `getSpringFactoriesInstances(Class<T> type)` 메소드로 보낸 `Class` 인자에 BootStrap.class를 보냅니다. 다음은 `overloading` 된 `getSpringFactoriesInstances` 메소드입니다.
```java
/* SpringApplicagtion.java */
private <T> Collection<T> getSpringFactoriesInstances(Class<T> type, Class<?>[] parameterTypes, Object... args) {
	ClassLoader classLoader = getClassLoader();
	// Use names and ensure unique to protect against duplicates
	Set<String> names = new LinkedHashSet<>(SpringFactoriesLoader.loadFactoryNames(type, classLoader));
	List<T> instances = createSpringFactoriesInstances(type, parameterTypes, classLoader, args, names);
	AnnotationAwareOrderComparator.sort(instances);
	return instances;
}



/* SpringFactoriesLoader.java */
public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
	ClassLoader classLoaderToUse = classLoader;
	if (classLoaderToUse == null) {
		classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
	}
	String factoryTypeName = factoryType.getName();
	return loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}

private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
	Map<String, List<String>> result = cache.get(classLoader);
	if (result != null) {
		return result;
	}

	result = new HashMap<>();
	try {
		Enumeration<URL> urls = classLoader.getResources(FACTORIES_RESOURCE_LOCATION);
		while (urls.hasMoreElements()) {
			URL url = urls.nextElement();
			UrlResource resource = new UrlResource(url);
			Properties properties = PropertiesLoaderUtils.loadProperties(resource);
			for (Map.Entry<?, ?> entry : properties.entrySet()) {
				String factoryTypeName = ((String) entry.getKey()).trim();
				String[] factoryImplementationNames =
						StringUtils.commaDelimitedListToStringArray((String) entry.getValue());
				for (String factoryImplementationName : factoryImplementationNames) {
					result.computeIfAbsent(factoryTypeName, key -> new ArrayList<>())
							.add(factoryImplementationName.trim());
				}
			}
		}

		// Replace all lists with unmodifiable lists containing unique elements
		result.replaceAll((factoryType, implementations) -> implementations.stream().distinct()
				.collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList)));
		cache.put(classLoader, result);
	}
	catch (IOException ex) {
		throw new IllegalArgumentException("Unable to load factories from location [" +
				FACTORIES_RESOURCE_LOCATION + "]", ex);
	}
	return result;
}




```
이름에서부터 알수 있겠지만 SpringFactory 생성하는 메소드 입니다. 첫번째 메소드에서 names라는 `Set`객체에 담아주는 이유는 중복을 방지하고 고유한 이름이 보장되게 사용하기 위함입니다. `loadFactoryNames` 메소드는 주어진 클래스로더를 사용하여 `META-INF/spring.factories` 로부터 주어진 유형의 팩토리 구현체의 모든 조건에 부합되는 클래스명을 로드합니다. `Spring framework 5.3`부터 특정구현체 이름이 주어진 팩토리 타입에대해 두번이상 발견된다면 중복은 무시됩니다. 클래스로더로부터 로드하여 캐싱된 `Bean`들이 존재하지 않는다면 새로 생성합니다.

아래 이미지를 보면 알겠지만 각 `spring.factories`라는 파일에서 Bean 으로 띄울 구현체들이 작성되어있습니다. `loadSpringFactories` 메소드는 해당파일에서 리소스 정보를 읽어들여 순서대로 `LinkedHashset` 에 중복되지않는 Bean으로 컬렉트 하는 겁니다. 다시 생성자로 돌어가서 보면 `BootStrappers`, `ApplicationContextInitializer`, `ApplicatgionListener`를 각각 초기화시켜주면서 필요한 빈들을 읽어들여 생성합니다.

```java
@SuppressWarnings({ "unchecked", "rawtypes" })
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
	this.resourceLoader = resourceLoader;
	Assert.notNull(primarySources, "PrimarySources must not be null");
	this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
	this.webApplicationType = WebApplicationType.deduceFromClasspath();
	this.bootstrappers = new ArrayList<>(getSpringFactoriesInstances(Bootstrapper.class));
	setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
	setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
	this.mainApplicationClass = deduceMainApplicationClass();
}

```

`getSpringFactoriesInstance(Class<T> type)` 메소드 안을 보시면 `createSpringFactoriesInstances()` 메소드를 볼수있습니다. 여기서 각 `BootStrapper`, `ApplicationContextInitailizer`, `ApplicationListener` 클래스 들의 FactoryName 들을가지고 인스턴스를 생성하여 할당합니다. 그러므로 각 해당 생성자로 Bean들을 로드하고 `Initializer`와 `Listeners`들을 초기화시켜주고 `run()`메서드를 실행합니다. 
