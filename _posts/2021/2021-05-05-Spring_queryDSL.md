---
layout: post
title: -Spring- JPA, 강력한 ORM 쿼리 라이브러리 (QueryDSL)
categories: [Development,Spring]
tags: [QueryDSL,Spring,JPA,JPQL]
date: 2021-05-05 20:30:00 +0900
thumbnail: "/assets/img/bloging/spring/qeurydsl_logo.png"
excerpt_separator: <!--more-->
hide: false
---
JPQL로 조회 하기 힘든 조인을 Type safe한 자바기반 라이브러리로 사용해보자 !

<!--more-->
## Query dsl (Gradle)

---

<br>

### Build.gradle



```gradle
plugins {
	id 'org.springframework.boot' version '2.4.4'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	// QueryDSL
	id "com.ewerk.gradle.plugins.querydsl" version "1.0.10"
	id 'java'
}

group = 'me.missionfamily.web'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-websocket'
	implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.7.0")
	implementation 'org.springframework.boot:spring-boot-devtools'
	implementation 'org.springframework.boot:spring-boot-starter-security'
	implementation 'org.springframework.security:spring-security-test'
	//validation
	implementation 'org.springframework.boot:spring-boot-starter-validation'
	// Gson
	implementation 'com.google.code.gson:gson:2.8.6'

	// QueryDSL
	implementation 'com.querydsl:querydsl-jpa'

	//jwt
	compile group: 'io.jsonwebtoken', name: 'jjwt-api', version: '0.11.2'
	runtime group: 'io.jsonwebtoken', name: 'jjwt-impl', version: '0.11.2'
	runtime group: 'io.jsonwebtoken', name: 'jjwt-jackson', version: '0.11.2'

	compileOnly 'org.projectlombok:lombok'
	runtimeOnly 'mysql:mysql-connector-java'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
	useJUnitPlatform()
}

// QueryDSL
def querydslDir = "$buildDir/generated/querydsl"

querydsl {
	jpa = true
	querydslSourcesDir = querydslDir
}

sourceSets {
	main.java.srcDir querydslDir
}

configurations {
	querydsl.extendsFrom compileClasspath
}
compileQuerydsl {
	options.annotationProcessorPath = configurations.querydsl
}




```

`// QueryDSL` 로 주석을 달아준곳만 추가해주면 된다. 만약 안된다면 `Reload All Gradle Project` 해주자.



### DatabaseConfig.java

```java
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.EntityManager;

@EnableJpaAuditing
@Configuration
public class DatabaseConfig {


    @Bean
    public JPAQueryFactory jpaQueryFactory(EntityManager em){
        return new JPAQueryFactory(em);
    }
}

```

`QueryDsl` 을 사용하려면 `Bean` 으로 등록해줘야한다.



### AccountRepository.java

```java
@Repository
@RequiredArgsConstructor
public class AccountRepository {

    @PersistenceContext
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;
    QUserInfo userInfo = QUserInfo.userInfo;
    QAccount account = QAccount.account;


    public void save(UserInfo userInfo){
        em.persist(userInfo);
    }

    public Account findById(String id){
        return queryFactory.selectFrom(account)
                .where(account.userId.eq(id))
                .fetchOne();
    }

}
```



qeurydsl은 실제 엔티티들과 동일한  Qclass를 생성하여 조회한다.  앞서 `Bean` 으로 등록한 `JPQqueryFactory` 를 사용하여 조회해보자.
