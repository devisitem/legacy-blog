현재 작성중인 글입니다.


# SpringApplication.run()
#SpringBoot/run

스프링부트는 스프링개발자가 빠르고 쉽게 어플리케이션을 확장할 수 있도록 도와주는 프레임워크 입니다.. 스프링부트는 `run`으로 부터 시작하여  다음과 같이 구성되는데 `run`부터 스프링부트가 어떻게 실행되는지 알아볼 것이에요. (제일궁금한 Bean을 추가 하는 과정)


스프링부트앱을 생성한다면 항상 앱 실행 파일이 존재해요.

### Application.java

```java
public class KimnchiApplication {
		public static void main(Sgtring[] args) {
			SpringApplication.run(TestApplication.class, args);
		}
}
```

일반 `Java Application`처럼 `main`메소드로 실행하며 매개변수를 받아요.
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
|——|———|———|—-——|———————-|
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

아래 이미지를 보면 알겠지만 각 `spring.factories`라는 파일에서 Bean 으로 띄울 구현체들이 작성되어있습니다. `getSpringFactoriesInstances` 메소드를 안을 보시면 `SpringFactoryLoader.loadSpringFactories` 가 작성 되어있습니다. classLoader 는 `spring.factories` 파일에서 리소스 정보를 읽어들여 순서대로 factory 이름에 있는 Bean들을 인스턴스화하여 Application Context에 추가합니다.

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

`getSpringFactoriesInstance(Class<T> type)` 메소드 안을 보시면 `createSpringFactoriesInstances()` 메소드를 볼수있습니다. 여기서 각 `BootStrapper`, `ApplicationContextInitailizer`, `ApplicationListener` 클래스 들의 FactoryName 들을가지고 인스턴스를 생성하여 할당합니다. ClassLoader는 `resourceLoader` 가 Null 이 아니라면, 설정된 클래스로더를 사용하고 만약 없다면 Spring ClassUtils class의 기본 classLoader를 사용하게 됩니다.

정리하자면, Spring이 Bean을 추가하는과정은 META-INF/spring.factories의 파일들을 읽어 Bean들의 이름을 가진 LinkedHashSet을 가지고, classLoader를 이용해 instanceClass를 생성한 뒤 BeanUtils 의 instantiateClass 메소드를 이용하여 각 Bean을 추가해요.

그렇다면 `BootStrapper`, `ApplicationContextInitailizer`, `ApplicationListener` 는 각각 무슨역할을 하는 걸까요?

### Bootstrapper.class
Spring Boot 2.4.0 부터 생겨났으며 `BootstrapRegistry` 가 사용되기 전에 초기화 될 수 있는 `Callback Interface`이에요.
그렇다면 `BootstrapRegistry` 는 뭘까요. 공식 문서에보면 다음과 같이 나와 있어요. `ApplicationContext` 가 준비된 시점까지 시작 이후 그리고, 일련의 처리과정을 거친 후에 사용가능한 간단한 객체 레지스트리 입니다.
생성하는데 많은 비용이 들어 갈 수 있거나, `ApplicationContext` 가 이용가능한 상태가 되기전에 공유될 필요로 레지스트리 인스턴스 등록에 사용될 수있습니다. **(ApplicationContext 준비되기 전 `Bean`을 사용할 수 없을때 `BootsrapRegistry`로 Bean 을 등록하는데 사용할 수있다는 얘기입니다.)**
레지스트리는 클래스를 key로 사용합니다. 즉, 주어진 유형의 단일 인스턴스만 저장될 수 있습니다. `addCloseListener(ApplicationListener)` 메소드는 `ApplicationContext`가 완전히 준비되고 `BootstrapContext`닫혔을때 액션을 수행할 수 있는 리스너 추가에 사용될 수 있습니다. 한 가지 예로, 인스턴스는 어플리케이션이 사용할 수 있도록 `Spring Bean` 그 자체로 등록하도록 선택 할 수도 있습니다.

### ApplicationContextInitailizer.class

스프링 `ConfigurableApplicationContext` 가 리프레쉬 되기 전에 초기화하는 Callback 인터 페이스 입니다.
일반적으로 프로그래밍적인 `Application Context`의 초기화를 필요로하는 웹 어플리케이션 안에서 사용됩니다. 예를 들어, 속성 소스를 등록하거나 context 의 환경에 반대되는 profiles 를 활성화 합니다. contextInitializerClasses 의 context-param 과 init-param선언에 대한 `ContextLoader` 와 `FrameworkServlet`의 지원을 각각 참조하세요. `ApplicationContextInitializer` 의 프로세서들은 스프링의 `Ordered` 인터페이스가 구현된게 되거나 만약 `@Order` 어노테이션이 제공되고
