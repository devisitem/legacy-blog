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
