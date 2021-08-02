---
layout: post
title: -Spring- 스프링부트로 어플리케이션 설계하기 번역 (Building an Application With Spring Boot)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-07-29 11:12:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_boot_logo.png"
excerpt_separator: <!--more-->
hide: false
---
스프링부트로 어플리케이션 설계하기

<!--more-->
# 스프링부트로 어플리케이션 설계하기

[원문](https://spring.io/guides/gs/spring-boot/)


이 가이드는 스프링부트가 당신의 빠른 어플 개발을 어떻게 돕는지 샘플을 제공해요. 스프링 시작하기 가이드를 읽을 수록 스프링부트 유즈케이스를 더 볼거 에요. 이 가이드는 스프링부트의 빠른 맛보기에요. 직접 스프링부트로 기반된 프로젝트를 만들고 싶다면 [Spring initializr](https://start.spring.io) 에 방문하여 옵션을 고르고 세부사항을 입력한 것을 `zip file` 로 묶어 다운로드 할 수 있습니다.

## 뭘 만드나요?
`SpringBoot`로 간단한`Application`을 설계하고 여기에 몇가지 유용한 서비스를 추가할 거에요.

## 뭐가 필요한가요?
   - 여기에 쓸 15분
   - 텍스트 에디터 또는 IDE
   - JDK 1.8 또는 이후 버젼
   - [Gradle 4+](http://www.gradle.org/downloads)버전 또는  [Maven 3.2+] 버전 (https://maven.apache.org/download.cgi)  
   - 코드를 IDE로 바로 가져올 수도 있어요
 	   - [Spring Tool Suite (STS)](https://spring.io/guides/gs/sts)
 	   - [IntelliJ IDEA](https://spring.io/guides/gs/intellij-idea/)

## 가이드를 끝내는 방법
대부분의 [스프링 가이드](https://spring.io/guides) 처럼 처음부터 시작해서 각단계를 완료하거나 이미 선생님한테 익숙하다면 기본단계를 건너뛸 수 있어요.
처음부터 시작해서 Spring Initializr 로 시작하기 까지 건너뛸 수 있어요.


아래 적힌대로 해서 기본단계를 넘어갈 수 있어요.
	- 이 가이드의 소스 저장소에서 [다운로드](https://github.com/spring-guides/gs-spring-boot/archive/main.zip) 해서 풀거나 [깃](https://spring.io/understanding/Git)을 써서 클론하세요. `$ git clone https://github.com/spring-guides/gs-spring-boot`.

[https://github.com/spring-guides/gs-spring-boot.git](https://github.com/spring-guides/gs-spring-boot.git)

	- `cd` 명령어를 사용해 `gs-spring-boot/initial` 의 경로를 이동합니다.
  - Create simple Web Application 으로 넘어 가세요.
*다 끝났다면*, `gs-spring-boot/complete` 안에 붙은 코드를 확인할수 있어요.

## SpringBoot로 뭘 할 수 있는지 배워요
Spring Boot 는 어플리케이션을 빌드하는 빠른 방법을 권장해요. 선생님의 `classPath`와 설정된`bean` 들을보고 무엇을 놓쳤는지에 대해 근거있는 추정을 만들어 그것들을 추가합니다. SpringBoot를 사용하면 비즈니스 기능에 집중하고 인프라에 신경을 덜 쓸 수 있어요.

다음은 Spring Boot 가 선생님을 위해 뭘 할수 있는지에대한 예) 입니다.
	- Spring MVC 를 사용하나요? 대부분, 항상 필요로 하는 빈들이 몇 가지 있고 Spring Boot 가 자동으로 추가해줘요. Spring MVC 도 `servlet container` 를 필요로 하는데, 이것 또한 Spring Boot가 내장 톰캣을 설정해줘요.
	- Jetty 를 사용하시나요? 그렇다면 선생님은 아마도 톰캣을 안쓰고 대신에 내장 제티를 원하겠군요. Spring Boot 가 처리 해줄거에요.
	- 타임 리프를 사용 하시나요? 그렇다면, 선생님 앱에 항상 추가되어야만 하는 많은 빈들이 있어요. Spring Boot 가 그걸 추가 해줄거에요.

위 내용은 Spring Boot가 제공하는 자동 설정의 몇가지 예일 뿐이에요. 동시에 스프링 부트는 방해되지 않아요. 예를 들어 `Thymeleaf` 가 있을때 Spring Boot 는 자동으로 선생님의  `ApplicationContext`에 `SpringTemplateEngine` 을 추가 하지만 선생님이 `SpringTemplateEngine` 를 직접 추가한다면  Spring Boot 는 이걸 추가하지 않아요. 이렇게 선생님이 조금만 설정해도 제어할 수 있어요.


> Spring Boot가 코드를 만든다던가 선생님의 파일을 수정하진 않아요. 대신에 선생님이 앱을 시작할때, 설정정보와 `Bean` 들을 동적으로 연결해서 선생님의 `Application Context` 에 적용해주지요.

### Spring Initializr 로 시작하기

메이븐 쓰시면 [Spring Initializr](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.5.0&packaging=jar&jvmVersion=1.8&groupId=com.example&artifactId=spring-boot&name=spring-boot&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.spring-boot&dependencies=web)에 방문하여 필요한 의존성(Spring Web)과 새로운 프로젝트를 생성할수 있어요.
다음의 표시된 `pom.xml` 파일은 메이븐을 선택하여 생성했을때 입니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.5.0</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>spring-boot</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>spring-boot</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>1.8</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

그레이들 쓰시면 똑같이  [Spring Initializr](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.5.0&packaging=jar&jvmVersion=1.8&groupId=com.example&artifactId=spring-boot&name=spring-boot&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.spring-boot&dependencies=web)  프로젝트를 생성 해서 그레이들로만 선택하면 됩니다.

그레이들로 생성했을때 `build.gradle` 파일:
```gradle
plugins {
	id 'org.springframework.boot' version '2.5.0'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
	useJUnitPlatform()
}
```

### Manual Initialization (optional)
If you want to initialize the project manually rather than use the links shown earlier, follow the steps given below:
	1	Navigate to  [https://start.spring.io](https://start.spring.io/) . This service pulls in all the dependencies you need for an application and does most of the setup for you.
	2	Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
	3	Click Dependencies and select Spring Web.
	4	Click Generate.
	5	Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.

> If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

### 수동으로 만들기 (선택)

이전에 본 링크를 사용하지 않고 직접 초기 세팅 해서 만들고 싶으시면 다음과 같이 하시면 돼요.

1.  [https://start.spring.io](https://start.spring.io/) 에 들어 가세요.
이 서비스는 선생님이 어플리케이션에 필요한 모든 의존성을 가져오고 대부분 설정해줍니다.
2. `Maven` 이랑 `Gradle` 중에 하나고르고  
사용할 언어를 선택하세요.  여기서는 `Java` 를 골랐다고 가정할게요.
3. `Dependencies` 를 누르고 Spring Web을 선택하세요.
4. `Generate` 클릭
5. 5. 선생님에 선택에따라 `war` 또는 `zip` 으로 다운로드 돼요.

> 사용하시는 IDE에  **Spring Initializr integration** 가 있다면 위의 순서를 IDE에서도 할 수 있습니다.

### Create a Simple Web Application

Now you can create a web controller for a simple web application, as the following listing (`from  src/main/java/com/example/springboot/HelloController.java`
) shows:

```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
```

The class is flagged as a`@RestController`
, meaning it is ready for use by Spring MVC to handle web requests. `@RequestMapping`
 maps `/`
 to the  `index()`
 method. When invoked from a browser or by using curl on the command line, the method returns pure text. That is because  `@RestController`
 combines `@Controller`
 and `@ResponseBody`
, two annotations that results in web requests returning data rather than a view

### 간단한 웹 어플리케이션 생성하기

다음의 목록(`src/main/java/com/example/springboot/HelloController.java`)을 보고 선생님은 간단한 웹 어플리케이션 의  `Web controller` 를 만들수 있어요.
**소스**:

```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
```

`@RestController` 로 표시된 클래스는 Spring MVC를 사용하여 웹요청을 처리하겠다는 뜻 이에요. `@RequestMapping` 는 `/`으로 `index()`메소드를 찾아요. 브라우저 또는 커멘드 라인에서 curl 사용으로부터 호출 되었을때, 메소드는 순수 문자열을 반환해요. `RestController` 는 `ResponseBody`와 `Controller`로 결합되기 때문에, 두 어노테이션의  결과는  `view` (화면명) 보다 웹에서 요청하는 데이터를 우선적으로 리턴해요.


### Create an Application class
The Spring Initializr creates a simple application class for you. However, in this case, it is too simple. You need to modify the application class to match the following listing (from `src/main/java/com/example/springboot/Application.java`
)

```java
package com.example.springboot;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {

			System.out.println("Let's inspect the beans provided by Spring Boot:");

			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}

		};
	}

}
```


`@SpringBootApplication`
 is a convenience annotation that adds all of the following:
* `@Configuration`
: Tags the class as a source of bean definitions for the application context.
* 	`@EnableAutoConfiguration`
: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if  `spring-webmvc`
 is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a  `DispatcherServlet`
.
* `@ComponentScan`
: Tells Spring to look for other components, configurations, and services in the  `com/example`
 package, letting it find the controllers.

The  `main()`
 method uses Spring Boot’s `SpringApplication.run()`
 method to launch an application. Did you notice that there was not a single line of XML? There is no  `web.xml`
 file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.
There is also a  `CommandLineRunner`
 method marked as a  `@Bean`
, and this runs on start up. It retrieves all the beans that were created by your application or that were automatically added by Spring Boot. It sorts them and prints them out.


### Application class 생성하기
Spring Initializr 는 간단한 어플리케이션 클래스를 생성 해주는데요, 이번건 정말 쉽습니다. 다음경로 `src/main/java/com/example/springboot/Application.java` 에 있는 파일을 다음과 같이 수정해주기만 하면 됩니다.

```java
package com.example.springboot;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {

			System.out.println("Let's inspect the beans provided by Spring Boot:");

			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}

		};
	}

}
```

`@SpringBootApplication` 은 다음의 어노테이션을 모두 추가해주는 편한 어노테이션 입니다.
* `@Configuration`
: 이 태그를 사용하면 정의된 클래스 소스로 ApplicationContext에 Bean을 생성할 수 있습니다.
* `@EnableAutoConfiguration`
: classPath 설정들, 다른 빈들 그리고 다양한 프로퍼티 설정들을 기반으로 Bean이 추가를 시작하도록 Spring Boot 에게 알려줍니다. 예를 들어,  `spring-mvc` 가 의존성으로 등록되어 있다면, 이 어노테이션이 application 을 web application 으로 지정하고 `DispatcherServlet` 설정과 같은 주요 동작을 활성화 합니다.
* `@ComponentScan`
:`com/example` (프로젝트 생성시 그룹명으로 작성했던 디렉토리 경로) 패키지안에 다른 `Component`, `Configuration` 그리고 `Service` 들이 있는지 Spring Boot 에게 찾게하여 컨트롤러를 찾습니다.

: Tells Spring to look for other components, configurations, and services in the  `com/example`
 package, letting it find the controllers.

`main()`  메소드는 어플리케이션 실행을 위해 Spring Boot 의 `SpringApplicstion.run()` 메소드를 사용합니다. 여기엔 XML이 단 한줄도 없고 web.xml 파일도 없다는걸 둘중 하나라도 눈치 채셨나요? 이 웹 어플리케이션은 순수 100% 자바인데 어떠한 연결 작업을 하거나 인프라 설정을 처리할 필요가 없었을거에요.
 `@Bean` 으로 표시된 `CommandLineRunner` 메소드도 있는데, 시작할때 동작합니다. 이건 Spring Boot 로 부터 자동으로 추가되거나, 선생님의 어플리케이션 으로부터 생성된 모든 bean 을 가져옵니다. 그 bean 들을 순서대로 출력해 줍니다.

## Run the Application
To run the application, run the following command in a terminal window (in the `complete`
) directory:
### ./gradlew bootRun
If you use Maven, run the following command in a terminal window (in the `complete`
) directory:
### ./mvnw spring-boot:run
You should see output similar to the following:
```
Let's inspect the beans provided by Spring Boot:
application
beanNameHandlerMapping
defaultServletHandlerMapping
dispatcherServlet
embeddedServletContainerCustomizerBeanPostProcessor
handlerExceptionResolver
helloController
httpRequestHandlerAdapter
messageSource
mvcContentNegotiationManager
mvcConversionService
mvcValidator
org.springframework.boot.autoconfigure.MessageSourceAutoConfiguration
org.springframework.boot.autoconfigure.PropertyPlaceholderAutoConfiguration
org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration
org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration$DispatcherServletConfiguration
org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration$EmbeddedTomcat
org.springframework.boot.autoconfigure.web.ServerPropertiesAutoConfiguration
org.springframework.boot.context.embedded.properties.ServerProperties
org.springframework.context.annotation.ConfigurationClassPostProcessor.enhancedConfigurationProcessor
org.springframework.context.annotation.ConfigurationClassPostProcessor.importAwareProcessor
org.springframework.context.annotation.internalAutowiredAnnotationProcessor
org.springframework.context.annotation.internalCommonAnnotationProcessor
org.springframework.context.annotation.internalConfigurationAnnotationProcessor
org.springframework.context.annotation.internalRequiredAnnotationProcessor
org.springframework.web.servlet.config.annotation.DelegatingWebMvcConfiguration
propertySourcesPlaceholderConfigurer
requestMappingHandlerAdapter
requestMappingHandlerMapping
resourceHandlerMapping
simpleControllerHandlerAdapter
tomcatEmbeddedServletContainerFactory
viewControllerHandlerMapping
```
You can clearly see `org.springframework.boot.autoconfigure`beans. There is also a `tomcatEmbeddedServletContainerFactory.`
Now run the service with curl (in a separate terminal window), by running the following command (shown with its output):
```terminal
$ curl localhost:8080
Greetings from Spring Boot!
```


## 어플리케이션 실행하기
다음의 명령을 터미널 (`complete` 디렉토리)에서 실행해봐요.
### ./gradlew bootRun
메이븐을 사용 한다면 다음의 명령을 실행해봐요.
### ./mvnw spring-boot:run
다음의 내용처럼 출력될거에요.
```
Let's inspect the beans provided by Spring Boot:
application
beanNameHandlerMapping
defaultServletHandlerMapping
dispatcherServlet
embeddedServletContainerCustomizerBeanPostProcessor
handlerExceptionResolver
helloController
httpRequestHandlerAdapter
messageSource
mvcContentNegotiationManager
mvcConversionService
mvcValidator
org.springframework.boot.autoconfigure.MessageSourceAutoConfiguration
org.springframework.boot.autoconfigure.PropertyPlaceholderAutoConfiguration
org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration
org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration$DispatcherServletConfiguration
org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration$EmbeddedTomcat
org.springframework.boot.autoconfigure.web.ServerPropertiesAutoConfiguration
org.springframework.boot.context.embedded.properties.ServerProperties
org.springframework.context.annotation.ConfigurationClassPostProcessor.enhancedConfigurationProcessor
org.springframework.context.annotation.ConfigurationClassPostProcessor.importAwareProcessor
org.springframework.context.annotation.internalAutowiredAnnotationProcessor
org.springframework.context.annotation.internalCommonAnnotationProcessor
org.springframework.context.annotation.internalConfigurationAnnotationProcessor
org.springframework.context.annotation.internalRequiredAnnotationProcessor
org.springframework.web.servlet.config.annotation.DelegatingWebMvcConfiguration
propertySourcesBinder
propertySourcesPlaceholderConfigurer
requestMappingHandlerAdapter
requestMappingHandlerMapping
resourceHandlerMapping
simpleControllerHandlerAdapter
tomcatEmbeddedServletContainerFactory
viewControllerHandlerMapping
```

정리된 `org.springframework.boot.autoconfigure` bean 들을 볼수 있을거에요. `tomcatEmbeddedServletContainerFactory` 도 있어요.
이제 서비스를 실행하고 curl (다른 터미널 창) 로 다음의 명령을 실행하세요. (출력된 내용)
```terminal
$ curl localhost:8080
Greetings from Spring Boot!
```

## Add Unit Tests
You will want to add a test for the endpoint you added, and Spring Test provides some machinery for that.
If you use Gradle, add the following dependency to your `build.gradle` file:
```gradle
testImplementation('org.springframework.boot:spring-boot-starter-test')
```
If you use Maven, add the following to your `pom.xml` file:
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-test</artifactId>
	<scope>test</scope>
</dependency>
```
Now write a simple unit test that mocks the servlet request and response through your endpoint, as the following listing (from `src/test/java/com/example/springboot/HelloControllerTest.java`) shows:
```java
package com.example.springboot;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {

	@Autowired
	private MockMvc mvc;

	@Test
	public void getHello() throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(equalTo("Greetings from Spring Boot!")));
	}
}
```
`MockMvc` comes from Spring Test and lets you, through a set of convenient builder classes, send HTTP requests into the `DispatcherServlet` and make assertions about the result. Note the use of `@AutoConfigureMockMvc` and `@SpringBootTest` to inject a `MockMvc` instance. Having used `@SpringBootTest`, we are asking for the whole application context to be created. An alternative would be to ask Spring Boot to create only the web layers of the context by using `@WebMvcTest`. In either case, Spring Boot automatically tries to locate the main application class of your application, but you can override it or narrow it down if you want to build something different.

As well as mocking the HTTP request cycle, you can also use Spring Boot to write a simple full-stack integration test. For example, instead of (or as well as) the mock test shown earlier, we could create the following test (from `src/test/java/com/example/springboot/HelloControllerIT.java`):
```java
package com.example.springboot;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerIT {

	@Autowired
	private TestRestTemplate template;

    @Test
    public void getHello() throws Exception {
        ResponseEntity<String> response = template.getForEntity("/", String.class);
        assertThat(response.getBody()).isEqualTo("Greetings from Spring Boot!");
    }
}
```
The embedded server starts on a random port because of `webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT`, and the actual port is configured automatically in the base URL for the `TestRestTemplate`.

## 단위테스트 추가하기
선생님이 추가 하였던 엔드 포인트 `@GetMapping("/")` 에 대해서 테스트를 만들고 싶으실텐데요, 스프링부트가 테스트를 위한 시스템을 제공해요.  gralde을 사용하시면 다음의 파일에 의존성을 추가해줘요. `build.gradle` :
```gradle
testImplementation('org.springframework.boot:spring-boot-starter-test')
```
maven을 사용 하신다면, 다음의파일에 의존성을 추가해줘요. `pom.xml`:
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-test</artifactId>
	<scope>test</scope>
</dependency>
```

이제 선생님이 만든 엔드포인트를 통해 서블렛요청과 응답을 가장한 테스트를 다음의 목록에 작성해요.  `src/test/java/com/example/springboot/HelloControllerTest.java`  :
```java
package com.example.springboot;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class HelloControllerTest {

	@Autowired
	private MockMvc mvc;

	@Test
	public void getHello() throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().string(equalTo("Greetings from Spring Boot!")));
	}
}
```
`MockMvc` 는 Spring Boot 에서 제공되고,
편리한 빌더 클래스들의 설정을 통해, `DispatcherServlet` 으로 HTTP요청을 전송하고 그 결과에대한 `Assertion` 을 만들 수 있습니다. `@AutoConfigureMockMvc`와 `@SpringBootTest`가 `@MockMvc` 인스턴스를 주입하여 사용하는것을 참고하세요.
`@SpringBootTest` 를 사용하면, 생성된 전체 application context 를 요청할 수있어요.
대안은 Spring Boot 에게 `@WebMvcTest`를 사용하는 context 의 웹 계층만  생성하도록 요청하는 거에요. 다른경우는 Spring Boot 가 선생님의 application 의 main method 위치를 자동으로 찾게하는 것이지만, 조금 다르게 설계 하고 싶으시다면 override 하거나 줄일 수 있어요. 게다가 HTTP 요청 싸이클을 가상으로 만들고,  Spring Boot를 사용하여 간단한 풀스택 통합 테스트를 작성할 수 있어요. 예를 들어, 앞에서 나온 가상 테스트 대신에 (또는 뿐만 아니라), 다음의 테스트를 만들수 있어요. (`src/test/java/com/example/springboot/HelloControllerIT.java` ) :

```java
java
package com.example.springboot;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerIT {

	@Autowired
	private TestRestTemplate template;

    @Test
    public void getHello() throws Exception {
        ResponseEntity<String> response = template.getForEntity("/", String.class);
        assertThat(response.getBody()).isEqualTo("Greetings from Spring Boot!");
    }
}
```
`webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT`속성 때문에 내장서버는 포트를 랜덤으로  시작합니다. 실제포트는 `TestRestTemplate` 의 기본포트로 설정됩니다.

## Add Production-grade Services
If you are building a web site for your business, you probably need to add some management services. Spring Boot provides several such services (such as health, audits, beans, and more) with its  [actuator module](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#production-ready) .
If you use Gradle, add the following dependency to your `build.gradle` file:
`implementation 'org.springframework.boot:spring-boot-starter-actuator'`
If you use Maven, add the following dependency to your `pom.xml` file:
```
<dependency>
<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
Then restart the application. If you use Gradle, run the following command in a terminal window (in the `complete` directory):
`./gradlew bootRun`
If you use Maven, run the following command in a terminal window (in the `complete` directory):
`./mvnw spring-boot:run`
You should see that a new set of RESTful end points have been added to the application. These are management services provided by Spring Boot. The following listing shows typical output:
```
management.endpoint.configprops-org.springframework.boot.actuate.autoconfigure.context.properties.ConfigurationPropertiesReportEndpointProperties
management.endpoint.env-org.springframework.boot.actuate.autoconfigure.env.EnvironmentEndpointProperties
management.endpoint.health-org.springframework.boot.actuate.autoconfigure.health.HealthEndpointProperties
management.endpoint.logfile-org.springframework.boot.actuate.autoconfigure.logging.LogFileWebEndpointProperties
management.endpoints.jmx-org.springframework.boot.actuate.autoconfigure.endpoint.jmx.JmxEndpointProperties
management.endpoints.web-org.springframework.boot.actuate.autoconfigure.endpoint.web.WebEndpointProperties
management.endpoints.web.cors-org.springframework.boot.actuate.autoconfigure.endpoint.web.CorsEndpointProperties
management.health.diskspace-org.springframework.boot.actuate.autoconfigure.system.DiskSpaceHealthIndicatorProperties
management.info-org.springframework.boot.actuate.autoconfigure.info.InfoContributorProperties
management.metrics-org.springframework.boot.actuate.autoconfigure.metrics.MetricsProperties
management.metrics.export.simple-org.springframework.boot.actuate.autoconfigure.metrics.export.simple.SimpleProperties
management.server-org.springframework.boot.actuate.autoconfigure.web.server.ManagementServerProperties
```
The actuator exposes the following:
	* 	 [actuator/health](http://localhost:8080/actuator/health)
	* 	 [actuator](http://localhost:8080/actuator)


```
# There is also an `/actuator/shutdown`
# endpoint, but, by default, it is visible only through JMX. To
 [enable it as an HTTP endpoint](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#production-ready-endpoints-enabling-endpoints) # , add
# management.endpoint.shutdown.enabled=true
# to your
# application.properties
# file and expose it with
# management.endpoints.web.exposure.include=health,info,shutdown
# . However, you probably should not enable the shutdown endpoint for a publicly available application.
```

You can check the health of the application by running the following command:
```terminal
$ curl localhost:8080/actuator/health
{"status":"UP"}
```
You can try also to invoke shutdown through curl, to see what happens when you have not added the necessary line (shown in the preceding note) to `application.properties`:
```terminal
$ curl -X POST localhost:8080/actuator/shutdown
{"timestamp":1401820343710,"error":"Not Found","status":404,"message":"","path":"/actuator/shutdown"}
```

Because we did not enable it, the requested endpoint is not available (because the endpoint does not exist).

For more details about each of these REST endpoints and how you can tune their settings with an `application.properties` file (in `src/main/resources`), see the the  [documentation about the endpoints](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#production-ready-endpoints) .

## 제품 등급 서비스 추가하기
사업을 목적으로 어플리케이션을 설계한다면, 어떤 관리 서비스가 필요할 거에요. 몇몇의 서비스 같은 [actuator module](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#production-ready)을 제공합니다.
Gradle을 사용하시면 다음의 파일에 의존성을 추가 합니다. `build.gradle` 파일:
```
implementation 'org.springframework.boot:spring-boot-starter-actuator
```
Maven을 사용하시면 다음의 파일에 의존성을 추가 합니다. `pom.xml` 파일:
```
<dependency>
<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```
재시작 하고 난 다음,  `complete`  디렉토리안으로 이동하여 다음의 명령어를 실행하세요.
Gradle:
```
./gradlew bootRun
```
Maven:
```
./mvnw spring-boot:run
```
어플리케이션에 추가된 새로운 RESTful 세트를 확인 하셔야 해요.Spring Boot 에서 제공된 관리 서비스가 있어요. 다음은 일반적인 출력 목록 입니다.
```
management.endpoint.configprops-org.springframework.boot.actuate.autoconfigure.context.properties.ConfigurationPropertiesReportEndpointProperties
management.endpoint.env-org.springframework.boot.actuate.autoconfigure.env.EnvironmentEndpointProperties
management.endpoint.health-org.springframework.boot.actuate.autoconfigure.health.HealthEndpointProperties
management.endpoint.logfile-org.springframework.boot.actuate.autoconfigure.logging.LogFileWebEndpointProperties
management.endpoints.jmx-org.springframework.boot.actuate.autoconfigure.endpoint.jmx.JmxEndpointProperties
management.endpoints.web-org.springframework.boot.actuate.autoconfigure.endpoint.web.WebEndpointProperties
management.endpoints.web.cors-org.springframework.boot.actuate.autoconfigure.endpoint.web.CorsEndpointProperties
management.health.diskspace-org.springframework.boot.actuate.autoconfigure.system.DiskSpaceHealthIndicatorProperties
management.info-org.springframework.boot.actuate.autoconfigure.info.InfoContributorProperties
management.metrics-org.springframework.boot.actuate.autoconfigure.metrics.MetricsProperties
management.metrics.export.simple-org.springframework.boot.actuate.autoconfigure.metrics.export.simple.SimpleProperties
management.server-org.springframework.boot.actuate.autoconfigure.web.server.ManagementServerProperties
```
actuator 는 다음을 구성합니다.
* [actuator/health](http://localhost:8080/actuator/health)
* [actuator](http://localhost:8080/actuator)

```
`/actuator/shutdown` 엔드포인트도 있어요. 하지만, 기본적으로, 이건 JMX를 통해서만 보여요. HTTP 엔드포인트로 가능하게 하려면, `application.properties`파일에 `management.endpoint.shutdown.enabled=true` 를 추가해 주시고, `management.endpoints.web.exposure.include=health,info,shutdown` 와 같이 구성해주세요. 하지만, 공개적인 어플리케이션에  shutdown 엔드포인트를 활성화 하면 안돼요.
```

다음의 명령어는 어플리케이션의 상태를 실행중에 체크할 수 있어요.
```
$ curl localhost:8080/actuator/health
{"status":"UP"}
```

또한 curl을 통해 종료를 호출하여, `application.properties`에 필요한 행(이전 참고사항에 표시)이 추가되지 않았을때 무슨일이 일어나는지 확인 해야해요.
```
$ curl -X POST localhost:8080/actuator/shutdown
{"timestamp":1401820343710,"error":"Not Found","status":404,"message":"","path":"/actuator/shutdown"}
```
shutdown을 활성화 하지 않았기 때문에 요청된 엔드포인트는 사용할 수 없습니다.(엔드포인트가 존재하지 않기 때문)

REST 엔드포인트와 `application.properties`  파일(`/src/main/resources`)로 세팅된 내용을 튜닝하는 방법에 대한 상세는 [엔드포인트에 대한 문서](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#actuator.endpoints) 를 보시면 됩니다.

## View Spring Boot’s Starters
You have seen some of  [Spring Boot’s “starters”](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#using-boot-starter) . You can see them all  [here in source code](https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project/spring-boot-starters) .

## JAR Support and Groovy Support
The last example showed how Spring Boot lets you wire beans that you may not be aware you need. It also showed how to turn on convenient management services.
However, Spring Boot does more than that. It supports not only traditional WAR file deployments but also lets you put together executable JARs, thanks to Spring Boot’s loader module. The various guides demonstrate this dual support through the  `spring-boot-gradle-plugin`
 and  `spring-boot-maven-plugin`
.
On top of that, Spring Boot also has Groovy support, letting you build Spring MVC web applications with as little as a single file.
Create a new file called  `app.groovy`
 and put the following code in it:
```java
@RestController
class ThisWillActuallyRun {
     @GetMapping("/")
     String home() {
         return "Hello, World!"
    }

 }
```


> It does not matter where the file is. You can even fit an application that small inside a  [single tweet](https://twitter.com/rob_winch/status/364871658483351552) !

Next,  [install Spring Boot’s CLI](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#getting-started-installing-the-cli) .
Run the Groovy application by running the following command:
```terminal
$ spring run app.groovy
```

> Shut down the previous application, to avoid a port collision.

From a different terminal window, run the following curl command (shown with its output):
```terminal
$ curl localhost:8080
Hello, World!
```

Spring Boot does this by dynamically adding key annotations to your code and using  [Groovy Grape](http://www.groovy-lang.org/Grape)  to pull down the libraries that are needed to make the app run.

## Summary
Congratulations! You built a simple web application with Spring Boot and learned how it can ramp up your development pace. You also turned on some handy production services. This is only a small sampling of what Spring Boot can do. See  [Spring Boot’s online docs](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)  for much more information.

## See Also
The following guides may also be helpful:
	* 	 [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
	* 	 [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
Want to write a new guide or contribute to an existing one? Check out our  [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki) .

> All guides are released with an ASLv2 license for the code, and an  [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/)  for the writing.

## Spring Boot의 Starter 보기
Spring Boot의 “starters”중 일부를 봤는데요. [이 소스코드](https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project/spring-boot-starters) 에서 모두 볼수 있어요.


## JAR 와 Groovy 지원

마지막 예제는 선생님이 필요한게 뭔지 모르는 것에 Spring Boot가 bean들을 연결하도록 하는 방법, 또한, 편리한 관리서비스를 켜는 방법을 보여줬어요.

하지만 그게 끝이아니에요. Spring Boot의 loader module 덕분에 전통적인 WAR파일 배포를 지원할 뿐만아니라 실행가능한 JAR 파일울 함께 넣을 수 있어요. 다양한 가이드는 `spring-boot-gradle-plugin` 과 `spring-boot-maven-plugin`을 통하여 이러한 이중 지원을 보여줍니다.
그 위에, Spring Boot는 최소한의 단일 파일로 Spring MVC web application을 build 하도록 Groovy 지원도 가지고 있습니다.

호출된 `app.groovy` 파일을 새로 생성하고, 다음의 코드를 넣어주세요.
```java
@RestController
class ThisWillActuallyRun {

    @GetMapping("/")
    String home() {
        return "Hello, World!"
    }

}
```
> 파일이 어디있던 상관 없어요. [단일 트윗](https://mobile.twitter.com/rob_winch/status/364871658483351552) 안으로 어플리케이션을 작게 맞추실 수도 있어요.

다음,  [Spring Boot 의 CLI 설치](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#getting-started-installing-the-cli) .
다음의 실행 명령어로 Groovy 어플리케이션을 실행 합니다.
```
$ spring run app.groovy
```

> 포트 충돌을 방지하기 위해 이전 어플리케이션을 종료하세요.

다른 터미널 창에서 다음의 명령어를 입력하세요.
```
$ curl localhost:8080
Hello, World!
```

Spring Boot는 선생님이 소스에 동적으로 key 어노테이션을 추가하고, [Groovy Grape](http://docs.groovy-lang.org/latest/html/documentation/grape.html)를 사용하여 앱응 실행하는데 필요한 라이브러리들을 다운로드 합니다.

## Summary
Congratulations! You built a simple web application with Spring Boot and learned how it can ramp up your development pace. You also turned on some handy production services. This is only a small sampling of what Spring Boot can do. See  [Spring Boot’s online docs](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)  for much more information.
## See Also
The following guides may also be helpful:
	* 	 [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
	* 	 [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
Want to write a new guide or contribute to an existing one? Check out our  [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki) .

All guides are released with an ASLv2 license for the code, and an  [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/)  for the writing.


## 요약

축하해요! Spring Boot로 간단한 웹 어플리케이션을 설계하고, 선생님의 개발속도를 올리는법을 배웠어요. 몇가지 유용한 제작 서비스도 켰었구요.
이건 Spring Boot로 뭘 할 수 있는지의 대한 작은 샘플링 들이에요. 더 많은 정보는 [Spring Boot 온라인 문서](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)를 보세요.

## 이것도 보세요
다음의 가이드도 도움이 될 거에요.
* [웹 어플리케이션 지키기](https://spring.io/guides/gs/securing-web/)
* [Spring MVC로 웹 컨텐트 제공하기](https://spring.io/guides/gs/serving-web-content/)

새로운 가이드를 작성하거나 이미 존재하는 것에 기여하고 싶나요? [기여 지침](https://github.com/spring-guides/getting-started-guides/wiki)을 확인 하세요.

> 모든 가이드는 코드에 대한 ASLv2 라이센스와 작성을 위한 저작자 표기, 변경금지 CCL로 공개 되어 있습니다.
