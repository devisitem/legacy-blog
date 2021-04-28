---
layout: post
title: -Spring- 종속성 순환 에러 (The dependencies of some of the beans in the application context form a cycle)
categories: [Development,Spring]
tags: [The dependencies of some of the beans in the application context form a cycle,테스트 에러]
date: 2021-04-28 16:46:00 +0900
thumbnail: "/assets/img/bloging/spring/bean_cycle.png"
excerpt_separator: <!--more-->
hide: false
---
Unsatisfied dependency expressed through constructor parameter 0

<!--more-->
## 의존성 주입오류

```
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'userController' defined in file [C:\study\jwt-api-login\target\classes\me\kimchidev\jwtapilogin\UserController.class]: Unsatisfied dependency expressed through constructor parameter 0; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'org.springframework.security.authentication.AuthenticationManager' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {}
	at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:800)
	at org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(ConstructorResolver.java:229)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.autowireConstructor(AbstractAutowireCapableBeanFactory.java:1354)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1204)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:564)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:524)
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:944)
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:918)
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:583)
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:782)
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:774)
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439)
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:339)
	at org.springframework.boot.test.context.SpringBootContextLoader.loadContext(SpringBootContextLoader.java:123)
	at org.springframework.test.context.cache.DefaultCacheAwareContextLoaderDelegate.loadContextInternal(DefaultCacheAwareContextLoaderDelegate.java:99)
	at org.springframework.test.context.cache.DefaultCacheAwareContextLoaderDelegate.loadContext(DefaultCacheAwareContextLoaderDelegate.java:124)
	... 67 more
Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'org.springframework.security.authentication.AuthenticationManager' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {}
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.raiseNoMatchingBeanFound(DefaultListableBeanFactory.java:1790)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1346)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1300)
	at org.springframework.beans.factory.support.ConstructorResolver.resolveAutowiredArgument(ConstructorResolver.java:887)
	at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:791)
	... 86 more
```

`userController`의 `AuthenticationManager`  의존성 주입문제  이다. 먼저 의존성 주입을 하려면 의존성주입을 받을 객체와 부모 또는 자식의 관계를 가지고 있어야한다. 하지만 이오류에서 말하고자 하는 정보는 `autowired`할 `Bean`이 적어도 한개는 있어야하는 그마저도 없어서 생성할 수 없다고 한다.



```java
package me.kimchidev.jwtapilogin;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers("/user").permitAll()//hasAuthority("USER") //user api 유저권한
                .antMatchers("/admin").hasAuthority("ADMIN") //admin api 관리자 권한
                .anyRequest().authenticated()
                .and()
                .logout();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}

```

## 원인

아니 나는 분명 Bean 으로 등록 했는데 왜 없다는거지... 구글링 해도 위와 동일한 글들 밖에 없다... 그럼 테스트 로그를 보자

```
The dependencies of some of the beans in the application context form a cycle:

   userController defined in file [C:\study\jwt-api-login\target\classes\me\kimchidev\jwtapilogin\UserController.class]
┌─────┐
|  webSecurityConfig defined in file [C:\study\jwt-api-login\target\classes\me\kimchidev\jwtapilogin\WebSecurityConfig.class]
↑     ↓
|  userRepository defined in file [C:\study\jwt-api-login\target\classes\me\kimchidev\jwtapilogin\UserRepository.class]
└─────┘
```

`webSecurityConfig` 와 `userRepository`에서 순환참조가 발생하여 생기는 오류같다... 스프링 빈의 종속성 순환이 발생하게 된건데, ``webSecurityConfig`  에선 `userService` 를 구현한  `userRepository`를 참조하고 있고 `userRepository`에서는 `webSecurityConfig`  에서 빈으로 등록된 `PasswordEncoder`를 참조 하고있었다.



## 해결



```java
@Repository
@RequiredArgsConstructor
public class UserRepository implements UserService {

	private final PasswordEncoder encoder; // <- 삭제

	...Other Method

}
```

`UserRepository`에 정의되어있는 `PasswordEncoder` 순환되지않도록 지워준다.



## 결과

![빈 종속성 순환]({{ "/assets/img/bloging/spring/bean_cycle.png" | relative_url }})
