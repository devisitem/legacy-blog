---
layout: post
title: -Spring- 스프링 프레임워크 코어 (Spring Core)
categories: [Development,Spring]
tags: [Spring,Spring Boot]
date: 2021-09-02 21:58:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_logo.png"
excerpt_separator: <!--more-->
hide: true
---
Spring Framework 5.3.9 Spring Framework Documentation

<!--more-->

# Spring Framework Documentation
[원문 스프링 프레임워크 5.3.9](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop-introduction)


This part of the reference documentation covers all the technologies that are absolutely integral to the Spring Framework.

::참조 문서중 이 부분은 스프링 프레임워크에 필수적인 모든기술을 다룹니다.::

Foremost amongst these is the Spring Framework’s Inversion of Control (IoC) container. A thorough treatment of the Spring Framework’s IoC container is closely followed by comprehensive coverage of Spring’s Aspect-Oriented Programming (AOP) technologies. The Spring Framework has its own AOP framework, which is conceptually easy to understand and which successfully addresses the 80% sweet spot of AOP requirements in Java enterprise programming.

이 중에서 가장 중요한건 스프링 프레임워크의 '제어의 역전' (IoC) 컨테이너 입니다. 스프링 프레임워크 IoC 컨테이너의 철저한 treatment는 스프링 프레임워크의 Aspect Oriented Programming (AOP) 기술의 포괄적인 범위에 의해 가까이 따릅니다. 스프링프레임워크는 개념적으로 이해하기 쉬우며, 자바 엔터프라이즈 프로그래밍 내 AOP 요구사항 중 80%의 스위트 스팟을 성공적으로 해결하는 자체 AOP 프레임워크를 가지고 있습니다.

Coverage of Spring’s integration with AspectJ (currently the richest — in terms of features — and certainly most mature AOP implementation in the Java enterprise space) is also provided.

Aspectj 와 스프링의 통합에 대한 범위도 제공 됩니다.


## IoC 컨테이너
이 챕터는 스프링의 Inversion of Control (IoC) 컨테이너를 다룹니다.


### 1.1. 스프링 IoC 컨테이너와 Bean 소개

이 챕터는 IoC 정책의 스프링 프레임워크 구현체를 다룹니다.IoC는 DI(Dependency Injection)으로도 알려져 있는데요.

It is a process whereby objects define their dependencies ::(that is, the other objects they work with):: only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. The container then injects those dependencies when it creates the bean.This process is fundamentally the inverse (hence ㅔthe name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies by using direct construction of classes or a mechanism such as the Service Locator pattern.

팩토리 메소드에서 생성되거나 반환된 후 객체 인스턴스를 세팅한 프로퍼티즈, 또는 매개변수에서 팩토리 메소드, 생성자 매개변수를 통해서만 의존성(함께 작업하는 다른객체) 객체를 정의하는 프로세스입니다. 그런 다음, 컨테이너는 빈이 생성될때 이런 의존성을 주입합니다. 이 프로세스는 근본적으로 Service Locator 패턴과 같은 메커니즘이나 클래스의 직접 생성을 사용에 의해, 해당 의존성의 위치 또는 인스턴스화를 제어하는 Bean 자체의 역전(이래서 이름이 IoC에요) 입니다.

The `org.springframework.beans` and `org.springframework.context` packages are the basis for Spring Framework’s IoC container. The  [BeanFactory](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/beans/factory/BeanFactory.html) interface provides an advanced configuration mechanism capable of managing any type of object.  [ApplicationContext](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/context/ApplicationContext.html) is a sub-interface of `BeanFactory`. It adds:
	* 	Easier integration with Spring’s AOP features
	* 	Message resource handling (for use in internationalization)
	* 	Event publication
	* 	Application-layer specific contexts such as the WebApplicationContext for use in web applications.


`org.springframework.beans` 와 `org.springframework.context` 패키지는 스프링의 IoC 컨테이너를 위한 기반 입니다. [BeanFactory](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/beans/factory/BeanFactory.html) 인터페이스는 모든 객체 타입을 관리할 수 있는 고급 구성 메커니즘을 제공합니다.
[ApplicationContext](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/context/ApplicationContext.html)는 `BeanFactory`의 하위 클래스고 아래의 내용을 추가해요.
	* 스프링의 AOP기능으로 쉬운 통합
	* 메세지 자원 처리 (전역화 내에서 사용하기 위해)
	* 이벤트 발행
	* 웹 어플리케이션에서 사용할 WebApplicationContext 같은 어플리케이션 계층 특정 컨텍스트

In short, the BeanFactory provides the configuration framework and basic functionality, and the ApplicationContext adds more enterprise-specific functionality. The ApplicationContext is a complete superset of the BeanFactory and is used exclusively in this chapter in descriptions of Spring’s IoC container. For more information on using the BeanFactory instead of the ApplicationContext, see [The BeanFactory](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-beanfactory).

간략히 말하자면, BeanFactory는 기본적인 기능과 설정 프레임워크을 제공하고, ApplicationContext는 더 많은 엔터프라이즈별 기능성을 추가합니다. ApplicationContext는 BeanFactory의 완전한 상위집합이며, 이번챕터에서는 스프링의 IoC 컨테이너에 대한 설명에서 독점적으로 사용됩니다. ApplicationContext 대신에 BeanFactory를 사용하는 더많은 정보는 [The BeanFactory](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-beanfactory)를 보세요.

In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

스프링에서, 어플리케이션의 중심을 형성하며 스프링 IoC 컨테이너에의해 관리되는 객체를 빈이라 합니다. Bean은 IoC 컨테이너에의해 인스턴스화, 조립 및 관리되는 객체입니다. 그렇지 않으면, bean은 어플리케이션에 많은 객체들중 그냥 하나일뿐이죠.Bean과 이들간의 종속성은 컨테이너에서 사용된 구성 메타데이터 안에 반영됩니다.


## 1.2. 컨테이너 개요

The `org.springframework.context.ApplicationContext` interface represents the Spring IoC container and is responsible for instantiating, configuring, and assembling the beans. The container gets its instructions on what objects to instantiate, configure, and assemble by reading configuration metadata. The configuration metadata is represented in XML, Java annotations, or Java code. It lets you express the objects that compose your application and the rich interdependencies between those objects.

`org.springframework.context.ApplicationContext` 인터페이스는 스프링 IoC 컨테이너를 나타내며, 빈의 인스턴스화, 구성, 조립을 담당해요. 컨테이너는 구성 메타데이터를 읽어 무슨 객체를 인스턴스화, 구성, 조립하는지에 대하여 해당 명령을 가져옵니다. 구성 메타데이터는 XML, 자바 어노테이션 또는자바코드를 나타내요. 이것은 어플리케이션을 구성하고 이러한 객체간에 풍부한 상호의존성을 표현할 수 있어요.

Several implementations of the `ApplicationContext` interface are supplied with Spring. In stand-alone applications, it is common to create an instance of  [ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html)  or  [FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html). While XML has been the traditional format for defining configuration metadata, you can instruct the container to use Java annotations or code as the metadata format by providing a small amount of XML configuration to declaratively enable support for these additional metadata formats.

`ApplicationContext`의 몇몇 구현체들은 스프링과 함께 제공 됩니다. 독립적인 어플리케이션에서, [ClassPathXmlApplicationContext](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html)  또는  [FileSystemXmlApplicationContext](https://docs.spring.io/spring-framework/docs/5.3.9/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html)의 인스턴스를 생성하는것이 일반적이에요. 반면에 XML은 구성 메타데이터를 정의하는 전통적인 형식 이였지만, 이러한 추가적인 메타데이터 형식에대한 지원을 선언적으로 활성화하기 위해 소량의 XML 구성을 제공하여 컨테이터에게 자바 어노테이션 또는 코드를 메타데이터 형식으로 사용하라고 명령할 수 있습니다.

In most application scenarios, explicit user code is not required to instantiate one or more instances of a Spring IoC container. For example, in a web application scenario, a simple eight (or so) lines of boilerplate web descriptor XML in the `web.xml` file of the application typically suffices (see [Convenient ApplicationContext Instantiation for Web Applications](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-create)). If you use the [Spring Tools for Eclipse](https://spring.io/tools) (an Eclipse-powered development environment), you can easily create this boilerplate configuration with a few mouse clicks or keystrokes.

대부분의 어플리케이션 시나리오에서, 사용자 코드는 스프링 IoC 컨테이너의 한개 이상의 인스턴스를 인스턴스화하는데 요구되지 않습니다. 예를들어 웹 어플리케이션 시나리오에서, 어플리케이션의 `web.xml` 파일에 보일러플레이트 웹 디스크립터 XML의 간단한 8 (또는 그런)라인은 일반적으로 충분합니다 ([Convenient ApplicationContext Instantiation for Web Applications](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#context-create)를 보세요).
[Spring Tools for Eclipse](https://spring.io/tools)를 사용하시면 몇번의 클릭또는 단축키로 보일러플레이트 구성을 쉽게 생성할 수 있습니다.

The following diagram shows a high-level view of how Spring works. Your application classes are combined with configuration metadata so that, after the ApplicationContext is created and initialized, you have a fully configured and executable system or application.

다음에 나오는 다이어그램은 스프링이 어떻게 동작하는지의 최상위레벨 뷰를 보여줍니다. 어플리케이션의 클래스는 구성 메타데이터와 결합되어 ApplicationContext가 생성되며 초기화된 후 모든구성이 완료되고 실행가능한 시스템 또는 어플리케이션이 됩니다.

[image:B413FA8C-75E4-4E11-8026-0EB10002947E-6011-000003FD91B6D273/사진 2021. 8. 30. 오후 63357.jpg]

사진 1. 스프링 IoC 컨테이너

### 1.2.1 구성 메타데이터

As the preceding diagram shows, the Spring IoC container consumes a form of configuration metadata. This configuration metadata represents how you, as an application developer, tell the Spring container to instantiate, configure, and assemble the objects in your application.

앞에서 보여준 다이어그램으로 스프링 IoC 컨테이너는 구성 메타데이터의 형식을 사용합니다.
이 구성 메타데이터는 당신이 어플리케이션 개발자로서, 스프링 컨테이너에게 어플리케이션 내 객체를 인스턴스화, 구성 및 조립하라고 지시하는 방법을 나타냅니다.

Configuration metadata is traditionally supplied in a simple and intuitive XML format, which is what most of this chapter uses to convey key concepts and features of the Spring IoC container.

구성 메타데이터는 전통적으로 간단하고 직관적인 XML 형식으로 제공되며 이번 챕터의 대부분은 스프링 IoC 컨테이너의 기능과 핵심개념을 전달하는데 사용됩니다.

> XML-based metadata is not the only allowed form of configuration metadata. ::The Spring IoC container itself is totally decoupled from the format in which this configuration metadata is actually written.:: These days, many developers choose Java-based configuration for their Spring applications.

> XML기반의 메타데이터는 구성 메타데이터의 형식을 허용만하지 않습니다. 스프링 IoC 컨테이너 자체는 이 구성 메타데이터가 실제로 작성된 형식에서 완전히 분리됩니다. 요즘, 많은 개발자들이 스프링 어플리케이션을 위해 자바기반 구성을 선택합니다.

For information about using other forms of metadata with the Spring container, see:
	* Annotation-based configuration: Spring 2.5 introduced support for annotation-based configuration metadata.
	* Java-based configuration: Starting with Spring 3.0, many features provided by the Spring JavaConfig project became part of the core Spring Framework. Thus, you can define beans external to your application classes by using Java rather than XML files. To use these new features, see the  [@Configuration](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html) ,  [@Bean](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html) ,  [@Import](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html) , and  [@DependsOn](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/DependsOn.html)  annotations.

스프링 컨테이너와 다른 메타데이터 형식 사용에대한 정보는 다음을 참조.
	* [어노테이션 기반 구성](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-annotation-config): 스프링 2.5는 어노테이션 기반 구성 메타데이터를 위한 지원을 도입했습니다.
	* [자바 기반 구성](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-java): 스프링 3.0부터 스프링 자바 프로젝트에서 제공되는 많은 기능이 코어 스프링 프레임워크의 일부가 되었습니다. 따라서, XML 대신 자바를 사용하여 어플리케이션 클래스 외부에 있는 Bean을 정의할 수 있어요. 이러한 신기능 사용은, [@Configuration](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html) ,  [@Bean](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html) ,  [@Import](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html) , and  [@DependsOn](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/DependsOn.html) 어노테이션을 보세요.

Spring configuration consists of at least one and typically more than one bean definition that the container must manage. XML-based configuration metadata configures these beans as `<bean/>` elements inside a top-level `<beans/>` element. Java configuration typically uses `@Bean`-annotated methods within a `@Configuration` class.

스프링 구성은 컨테이너가 관리해야만 하는 최소 하나, 일반적으로 하나이상 Bean 정의로 이루어져 있습니다. XML 기반 구성 메타데이터는 최상위 레벨 `<beans/>` 요소 내에 `<bean/>` 요소로 이러한 Bean을 구성합니다. 자바 구성은 일반적으로 `@Configureation` 클래스 내 `@Bean` 어노테이션이 달린 메소드를 사용합니다.

These bean definitions correspond to the actual objects that make up your application. Typically, you define service layer objects, data access objects (DAOs), presentation objects such as Struts `Action` instances, infrastructure objects such as Hibernate `SessionFactories`, JMS `Queues`, and so forth. Typically, one does not configure fine-grained domain objects in the container, because it is usually the responsibility of DAOs and business logic to create and load domain objects. However, you can use Spring’s integration with AspectJ to configure objects that have been created outside the control of an IoC container. See [Using AspectJ to dependency-inject domain objects with Spring](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop-atconfigurable).

이러한 Bean 정의는 어플리케이션을 만드는 실제 객체에 해당합니다. 일반적으로 서비스레이어 객체, 데이터 액세스 객체 (DAO), 스트럿츠 Action인스턴스 같은 프레젠테이션 객체, 하이버네이트 `SessionFactories` ,JMS `Queues` 같은 인프라 객체, 기타 등등 을 정의합니다. 일반적으로 이는 컨테이너 내에 세분화된 도메인 객체를 구성하지 않아요. 왜냐면 이것은 Dao 와 도메인객체를 생성하고 로드하는 비즈니스로직을 담당하기 때문이죠. 그러나 AspectJ로 스프링의 통합을 사용하여 IoC 컨테이너의 제어 밖에서 생성된 객체를 구성할 수 있습니다. [AspectJ를 사용하여 스프링으로 도메인객체 의존성 주입하기](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop-atconfigurable)를 참고하세요.

The following example shows the basic structure of XML-based configuration metadata:

다음의 예제 XML 기반 구성 메타데이터의 기본적인 구조:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  <!--1, 2 -->
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```

1. `id` 속성은 각각의 빈정의를 식별하는 문자입니다.
2. `class` 속성은 Bean의 타입을 정의하고 완전한 클래스명을 사용합니다.

`id` 속성의 값은 협업하는 객체를 참조합니다. 협업 객체를 참조하는 XML은 이예제에서는 보여지지 않았어요. 더 많은 정보는 [의존성](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-dependencies)을 참조하세요.

### 1.2.2. 컨테이너 인스턴스화

The location path or paths supplied to an ApplicationContext constructor are resource strings that let the container load configuration metadata from a variety of external resources, such as the local file system, the Java `CLASSPATH`, and so on.

`ApplicationContext` 생성자에 제공된 위치 경로들은 컨테이너가 로컬파일 시스템, 자바 `CLASSPATH` 같이 여러가지 외부 자원들에서 구성 메타데이터를 로드할 수 있도록 하는 리소스 문자열입니다.

```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

> After you learn about Spring’s IoC container, you may want to know more about Spring’s Resource abstraction (as described in [Resources](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#resources)), which provides a convenient mechanism for reading an InputStream from locations defined in a URI syntax. In particular, Resource paths are used to construct applications contexts, as described in [Application Contexts and Resource Paths](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#resources-app-ctx).

스프링의 IoC 컨테이너에 대해 배우고나서, URI 문법에 정의된 위치에 입력스트림을 읽기위해 편리한 메커니즘을 제공하는 스프링의 자원 추상화([리소스](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#resources)에 설명)에 대해서 더알고 싶을수도 있습니다. 특히, 리소스 경로는 [어플리케이션 컨택스트와 리소스경로](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#resources-app-ctx)에 설명된 대로 어플리케이션 컨택스트를 구성하는데 사용합니다.

서비스 계층 객체 설정파일을 보여주는 다음의 예제:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- services -->

    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for services go here -->

</beans>
```

데이터 액세스 객체 `daos.xml` 파일을 보여준 다음의 예제:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountDao"
        class="org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <bean id="itemDao" class="org.springframework.samples.jpetstore.dao.jpa.JpaItemDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for data access objects go here -->

</beans>
```


In the preceding example, the service layer consists of the PetStoreServiceImpl class and two data access objects of the types JpaAccountDao and JpaItemDao (based on the JPA Object-Relational Mapping standard). The property name element refers to the name of the JavaBean property, and the ref element refers to the name of another bean definition. This linkage between id and ref elements expresses the dependency between collaborating objects. For details of configuring an object’s dependencies, see [Dependencies](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-dependencies).

이전의 예제에서, 외부 Bean 정의는 세개 파일 `service.xml`, `messageSource.xml`, `themeSource.xml`에서 로드 되었습니다. 모든 위치 경로는 임포팅하는 정의 파일에 상대적이므로 `service.xml`은 임포팅하는 파일로 동일한 디렉토리 또는 클래스패스 위치가 되어야하며, `messageSource.xml` 과 `themeSource.xml`은 임포팅파일의 위치 아래 resources 위치에 있어야합니다. 보시다 시피 앞의 슬래시는 무시됩니다. 하지만, 이러한 주어진 경로는 상대적이므로 슬래시를 전혀 사용하지 않는것이 좋은 형식이에요. 최상위 <beans/> 요소를 포함하는 임포트된 파일의 내용은 스프링 스키마에따라 유효한 XML Bean정의여야 합니다.

> It is possible, but not recommended, to reference files in parent directories using a relative “../“ path. Doing so creates a dependency on a file that is outside the current application. In particular, this reference is not recommended for classpath: URLs (for example, classpath:../services.xml), where the runtime resolution process chooses the “nearest” classpath root and then looks into its parent directory. Classpath configuration changes may lead to the choice of a different, incorrect directory.
>
> You can always use fully qualified resource locations instead of relative paths: for example, file:C:/config/services.xml or classpath:/config/services.xml. However, be aware that you are coupling your application’s configuration to specific absolute locations. It is generally preferable to keep an indirection for such absolute locations — for example, through “${… }” placeholders that are resolved against JVM system properties at runtime.

> “../“ 상대경로를 사용하여 부모 디렉토리에 파일을 참조가 가능하지만 추천 드리지는 않습니다. 이렇게 하면, 현재 어플리케이션 외부에있는 파일에 의존성이 생성됩니다. 특히 이참조는 런타임 완성 프로세스가 루트에 가장가까운 클래스패스를 선택한 다음 해당 상위디렉토리에서 찾는 클래스패스: URL(예를들어, 클래스패스:../services.xml)에 대해 권장되지않습니다. 클래스패스 구성 변경으로 인해 다른 잘못된 디렉토리가 선택될 수 있 습니다.
>
> 선생님은 언제든지 상대경로 대신에 정규화된 리소스 경로를 사용할 수 있습니다: (예를들어, 파일:C:/config/services.xml 또는 classpath:/config/service.xml). 하지만 어플리케이션의 구성을 특정 절대경로에 연결하고 있다는것을 아셔야 합니다. 일반적으로 런타임시 JVM 시스템 속성에 대해 확인되는 “${… }” 플레이스홀더를 통해 절대경로에 대한 간접참조를 유지하는 것이 좋습니다.

The namespace itself provides the import directive feature. Further configuration features beyond plain bean definitions are available in a selection of XML namespaces provided by Spring — for example, the context and util namespaces.

네임스페이스 그 자체는 직접 임포트하는 기능을 제공합니다. 더 나아가 일반 Bean 정의이후 구성기능은 스프링에서 제공하 는 XML 네임스페이스의 섹션에 적용 가능합니다. (예를들어, 컨텍스트 와 유틸 네임스페이스)

### 그루비 Bean 정의 DSL

As a further example for externalized configuration metadata, bean definitions can also be expressed in Spring’s Groovy Bean Definition DSL, as known from the Grails framework. Typically, such configuration live in a “.groovy” file with the structure shown in the following example:

구성화된 구성 메타데이터 예제로서, 그레일 프레임워크에서 알려진 것 처럼 Bean 정의는 스프링의 그루비 Bean 정의 DSL에 표현될 수도 있습니다. 일반적으로 이러한 구성은 다음 예제에 표시된 구조로 “.groovy” 파일에 있습니다.

```groovy
beans {
    dataSource(BasicDataSource) {
        driverClassName = "org.hsqldb.jdbcDriver"
        url = "jdbc:hsqldb:mem:grailsDB"
        username = "sa"
        password = ""
        settings = [mynew:"setting"]
    }
    sessionFactory(SessionFactory) {
        dataSource = dataSource
    }
    myService(MyService) {
        nestedBean = { AnotherBean bean ->
            dataSource = dataSource
        }
    }
}
```

This configuration style is largely equivalent to XML bean definitions and even supports Spring’s XML configuration namespaces. It also allows for importing XML bean definition files through an importBeans directive.

이 구성방식은 대체로 XML Bean 정의와 같고 스프링의 XML 구성 네임스페이스도 지원하기도 한다.


### 1.2.3. Using the Container

The ApplicationContext is the interface for an advanced factory capable of maintaining a registry of different beans and their dependencies. By using the method `T getBean(String name, Class<T> requiredType)`, you can retrieve instances of your beans.
The `ApplicationContext` lets you read bean definitions and access them, as the following example shows:

`ApplicationContext`는 다른 Bean과 그 의존성들의 레지스트리를 유지할 수 있는 고급 팩토리를 위한 인터페이스입니다. `T getBean(String name, Class<T> requiredType)` 메소드를 사용하므로써, 선생님 Bean의 인스턴스를 가져올수 있어요.
다음의 표시된 예제로 `ApplicationContext`가 Bean 정의를 읽고 그것들을 접근하도록 합니다.

```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

With Groovy configuration, bootstrapping looks very similar. It has a different context implementation class which is Groovy-aware (but also understands XML bean definitions). The following example shows Groovy configuration:

그루비 구성으로 매우 비슷하게 만듭니다. 이것은 그루비를 인식하는(XML Bean정의를 이해핟하지만) 다른 구현체를 가지고있어요. 다음에 표시된 그루비 구성을 참고하세요.

```java

ApplicationContext context = new GenericGroovyApplicationContext("services.groovy", "daos.groovy");

```

The most flexible variant is `GenericApplicationContext` in combination with reader delegates — for example, with `XmlBeanDefinitionReader` for XML files, as the following example shows:

가장 유연한 변형은 리더를 위임하는 것과 결합된 `GenericApplicationContext` 입니다. 예를 들어 다음 예제와 같이 XML 파일을 위한 `XMLBeanDefinitionReader` 처럼요.

```java

GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();

```

You can also use the `GroovyBeanDefinitionReader` for Groovy files, as the following example shows:

다음의 예제와 같이 그루비 파일을 위한 `GroovyBeanDefinitionReader`를 사용할수 있어요.

```java

GenericApplicationContext context = new GenericApplicationContext();
new GroovyBeanDefinitionReader(context).loadBeanDefinitions("services.groovy", "daos.groovy");
context.refresh();

```

You can mix and match such reader delegates on the same ApplicationContext, reading bean definitions from diverse configuration sources.

You can then use getBean to retrieve instances of your beans. The ApplicationContext interface has a few other methods for retrieving beans, but, ideally, your application code should never use them. Indeed, your application code should have no calls to the getBean() method at all and thus have no dependency on Spring APIs at all. For example, Spring’s integration with web frameworks provides dependency injection for various web framework components such as controllers and JSF-managed beans, letting you declare a dependency on a specific bean through metadata (such as an autowiring annotation).

다양한 구성 소스에서 Bean 정의를 읽어, 같은 `ApplicationContext`에 리더를 위임 하는것과 같이 섞거나 맞출수 있어요.

Bean의 인스턴스를 가져올때 `getBean`을 사용할 수 있습니다. `ApplicationContext` 인터페이스는 빈을 가져오기위한 많지않은 다른 메소드를 가지고 있지만, 이상적으로, 어플리케이션코드는 그것을 절대 사용해선 안됩니다. 어플리케이션 코드는 `getBean()`에 호출을 가지고있지 않아야하고, 따라서 모든 Spring API의 의존성이 없어야합니다. 예를들어, 스프링과 웹프레임워크의 통합이 컨트롤러나 JSF로 관리되는 Bean 같은 다양한 웹 프레임워크 컴포넌를위한 의존성 주입을 제공하여, 메타데이터를(예: 자동연결하는 어노테이션) 통해서 특정한 Bean에 의존성을 정의하도록 합니다.


## 1.3. Bean 개요
A Spring IoC container manages one or more beans. These beans are created with the configuration metadata that you supply to the container (for example, in the form of XML <bean/> definitions).

스프링 IoC 컨테이너는 하나이상의 Bean을 관리합니다. 이러한 Bean은 컨테이너(예: XML <bean/> 정의 양식 내)에 공급하는 구성 메타데이터로 생성 됩니다.

Within the container itself, these bean definitions are represented as BeanDefinition objects, which contain (among other information) the following metadata:

	* A package-qualified class name: typically, the actual implementation class of the bean being defined.
	* Bean behavioral configuration elements, which state how the bean should behave in the container (scope, lifecycle callbacks, and so forth).
	* References to other beans that are needed for the bean to do its work. These references are also called collaborators or dependencies.
	* Other configuration settings to set in the newly created object — for example, the size limit of the pool or the number of connections to use in a bean that manages a connection pool.

컨테이너 자체 내에서, 이러한 Bean 정의는 다음의 메타데이터를 포함하는 BeanDefinition 객체로 표시됩니다.

	* 패키지 수식 클래스명: 일반적으로 정의된 Bean의 실제 구현체 클래스입니다.
	* 컨테이너(범위, 생명주기 콜백 등) 내에서 Bean이 어떻게 동작해야만 하는지 표시하는 Bean 동작 구성요소.
	* Bean이 작업을 수행하는데 필요한 다른빈에 대한 참조입니다. 이러한 참조는 의존성 또는 협업객체라고도 합니다.
	* 신규 생성된 객체에 설정할 다른 구성 설정 - 예: 풀의 크기제한 또는 컨넥션 풀을 관리하는 Bean에 사용할 컨넥션 수.

	This metadata translates to a set of properties that make up each bean definition. The following table describes these properties

	| property | Explained in… |
	| ——— | ———— |
	| Class | [Instantiating Beans](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-class) |
	| Name | [Naming Beans](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-beanname) |
	| Scope | [Bean Scopes](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes) |
	| Constructor Argument | [Dependency Injection](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-collaborators) |
	| Properties | [Dependency Injection](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-collaborators) |
	| Autowiring mode | [Autowiring Collaborators](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-autowire) |
	| Lazy initialization mode | [Lazy-initialized Beans](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-lazy-init) |
	| Initialization method | [Initialization Callbacks](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-lifecycle-initializingbean) |
	| Destruction method | [Destruction Callbacks](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-lifecycle-disposablebean) |

	이 메타데이터는 각 bean 정의를 만드는 프로퍼티의 설정을 번역합니다. 다음의 테이블은 이러한 프로퍼티를 나타내요.

	| 프로퍼티 | 설명링크 |
	| ——— | ———— |
	| 클래스 | [Bean 인스턴스화](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-class) |
	| Bean 이름 | [Bean 이름 설정](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-beanname) |
	| 영역 | [Bean 영역](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes) |
	| 생성자 매개변수 | [의존성 주입](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-collaborators) |
	| 프로퍼티즈 | [의존성 주입](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-collaborators) |
	| 자동연결 모드 | [협업객체 자동연결](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-autowire) |
	| 지연 초기화 모드 | [Bean의 지연 초기화](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-lazy-init) |
	| 초기화 메서드 | [초기화 콜백](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-lifecycle-initializingbean) |
	| 제거 메소드 | [제거 콜백](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-lifecycle-disposablebean) |

	In addition to bean definitions that contain information on how to create a specific bean, the `ApplicationContext` implementations also permit the registration of existing objects that are created outside the container (by users). This is done by accessing the ApplicationContext’s BeanFactory through the `getBeanFactory()` method, which returns the BeanFactory `DefaultListableBeanFactory` implementation. `DefaultListableBeanFactory` supports this registration through the `registerSingleton(..)` and `registerBeanDefinition(..)` methods. However, typical applications work solely with beans defined through regular bean definition metadata.

	특정 Bean을 생성하는 방법에대한 정보를 포함하는 Bean 정의 뿐만아니라, ApplicationContext 구현체는 컨테이너 (유저로 부터) 밖에서 생성된 존재하는 객체의 등록도 허용합니다. 이것은 Beanfactory `DefaultListableBeanFactory` 구현체를 리턴하는 `getBeanFactory()`메소드를 통해서 `ApplicationContext`의 Beanfactory에 접근하여 수행됩니다. `DefaultListableBeanFactory`은 `registerSingleton(..)` 과 `registerBeanDefinition(..)` 메소드를 통해서 이 등록을 제공하지만, 일반적으로 어플리케이션은 일반 Bean정의 메타데이터를 통해 정의한 Bean으로만 동작합니다.

	> Bean metadata and manually supplied singleton instances need to be registered as early as possible, in order for the container to properly reason about them during autowiring and other introspection steps. While overriding existing metadata and existing singleton instances is supported to some degree, the registration of new beans at runtime (concurrently with live access to the factory) is not officially supported and may lead to concurrent access exceptions, inconsistent state in the bean container, or both.

> Bean 메타데이터와 수동 공급된 싱글톤 인스턴스는 가능한 빨리 등록돼야 컨테이너가 자동연결 및 기타 내부검사 단계에서 이에대한 적절한 추론을 할 수 있습니다. 재정의의 경우 존재하는 메타데이터 및 싱글톤 인스턴스는 어떤 면에서는 지원이 되지만 실행 시(팩토리에 실시간으로 동시에) 새로운 Bean의 등록은 공식지원이 아니며 병렬 접근 예외가될수 있고 Bean 컨테이너에 일관성없는 상태 이거나 둘다입니다.


## 1.3.1. Naming Beans

Every bean has one or more identifiers. These identifiers must be unique within the container that hosts the bean. A bean usually has only one identifier. However, if it requires more than one, the extra ones can be considered aliases.

모든 Bean은 한개이상의 식별자를 가지고 있습니다. 이러한 식별자는 Bean을 호스팅하는 컨테이너 내에서 고유해야 합니다. Bean은 보통 식별자를 한개만 가지고있지만, 한개이상이 필요한경우 별칭으로 간주될 수 있습니다.

In XML-based configuration metadata, you use the id attribute, the `name` attribute, or both to specify the bean identifiers. The `id` attribute lets you specify exactly one id. Conventionally, these names are alphanumeric ('myBean', 'someService', etc.), but they can contain special characters as well. If you want to introduce other aliases for the bean, you can also specify them in the `name` attribute, separated by a comma (`,`), semicolon (`;`), or white space. As a historical note, in versions prior to Spring 3.1, the id attribute was defined as an `xsd:ID` type, which constrained possible characters. As of 3.1, it is defined as an `xsd:string` type. Note that bean `id` uniqueness is still enforced by the container, though no longer by XML parsers.

XML 기반 구성 메타데이터에서, Bean 식별자 명시에 `id` 속성, `name`속성 또는 둘다 사용합니다. `id` 속성은 정확한 한개의 id를 명시하도록 합니다. 관례적으로, 이러한 이름들은 영문,숫자로('myBean', 'someService', etc.) 쓰지만, 특정한 문자열도 포함할 수 있습니다. Bean에 다른 별칭을 추가하고 싶다면, name 속성에 콤마(`,`), 세미콜론(`;`) 또는 스페이스로 구분지어서 명시할 수 도 있어요. 스프링 3.1 버전 이전에 id 속성은 `xsd:ID`타입으로 정의 됐었고, 이는 문자열을 가능하게 만들었습니다. 3.1에서 id 속성은 `xsd:string` 타입으로 정의 됐었어요. XML 파서에 의해 길지 않지만, Bean id 고유성은 컨테이너에의해 아직 강요되고 있습니다.

You are not required to supply a `name` or an `id` for a bean. If you do not supply a `name` or `id` explicitly, the container generates a unique name for that bean. However, if you want to refer to that bean by name, through the use of the `ref` element or a Service Locator style lookup, you must provide a name. Motivations for not supplying a name are related to using inner beans and autowiring collaborators.

Bean생성을 위해 `id` 또는 `name`을 추가할 필요 없어요. `id` 또는 `name`을 명시적으로 추가하지 않는다면 컨테이너는 그 Bean에 대한 고유한 이름을 생성합니다. 그러나 `ref` 요소의 사용이나 서비스 로케이터 스타일 조회를 통해서 `name`에 의해 Bean을 참조 하고 싶다면 이름을 제공해야만 해요. 이름을 제공하지 않는것에대한 동기는 [내부 Bean](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-inner-beans) 및 [협업객체 자동연결](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-autowire)의 사용과 관련이 있습니다.

### Bean 명명 규칙

The convention is to use the standard Java convention for instance field names when naming beans. That is, bean names start with a lowercase letter and are camel-cased from there. Examples of such names include `accountManager`, `accountService`, `userDao`, `loginController`, and so forth.

Naming beans consistently makes your configuration easier to read and understand. Also, if you use Spring AOP, it helps a lot when applying advice to a set of beans related by name.

명명 규칙은 Bean의 이름을 정할때 인스턴스 필드 이름에 대한 표준 자바 규칙에 사용하는 것 입니다. 이는, Bean 이름이 소문자로 시작하고 캐멀케이스 입니다. 그런 이름의 예로 `accountManager`, `accountService`, `userDao`, `loginController` 등이 있습니다.

Bean의 이름을 일관되게 지으면 구성을 더 쉽게 읽고 이해할 수 있습니다. 또한, 스프링 AOP를 사용한다면, 이름으로 연관된 Bean의 설정에 advice를 적용할 때 많은 도움을 줍니다.

> With component scanning in the classpath, Spring generates bean names for unnamed components, following the rules described earlier: essentially, taking the simple class name and turning its initial character to lower-case. However, in the (unusual) special case when there is more than one character and both the first and second characters are upper case, the original casing gets preserved. These are the same rules as defined by java.beans.Introspector.decapitalize (which Spring uses here).

> 클래스패스에서 컴포넌트 스캐닝을 통해, 스프링은 앞에서 설명한 규칙에 따라 이름이 없는 컴포넌트에 대한 Bean 이름을 생성합니다 (기본적으로 간단한 클래스명을 취하고, 초기 문자열을 소문자로 바꾸는것 입니다.). 하지만, 한개 이상의 문자열이 있고, 첫번째나 두번째 문자열 둘다 대문자인 특별한 경우 원본 대소문자는 유지 됩니다. `java.beans.Introspector.decapitalize` (스프링이 여기서 사용하는)에 의해 정의된 것과 동일한 규칙입니다.



### Aliasing a Bean outside the Bean Definition

In a bean definition itself, you can supply more than one name for the bean, by using a combination of up to one name specified by the id attribute and any number of other names in the name attribute. These names can be equivalent aliases to the same bean and are useful for some situations, such as letting each component in an application refer to a common dependency by using a bean name that is specific to that component itself.

Specifying all aliases where the bean is actually defined is not always adequate, however. It is sometimes desirable to introduce an alias for a bean that is defined elsewhere. This is commonly the case in large systems where configuration is split amongst each subsystem, with each subsystem having its own set of object definitions. In XML-based configuration metadata, you can use the <alias/> element to accomplish this. The following example shows how to do so:

```xml
<alias name="fromName" alias="toName"/>
```

### Bean 정의 외부에서 Bean 별칭 정하기

 Bean정의 자체에서,
