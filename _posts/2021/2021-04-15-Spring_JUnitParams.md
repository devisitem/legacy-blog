---
layout: post
title: -Spring- JUnitParams (단위 테스트 편하게하기)
categories: [Development,Spring]
tags: [단위 테스트,테스트 파라미터,Spring]
date: 2021-04-14 17:30:00 +0900
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/img/bloging/spring/junit_logo.png"
---

정형적인 코드만 계속 작성해야하는 단위 테스트 좀더 쉽게해보자.

<!--more-->
## 불편한 객체 만들기

단위 테스트 진행시 객체의 값을 넣어 테스트를 하기에 항상 너무 불편하다. 테스트를 할 때 마다 객체의 값을 항상 넣어주고, 테스트를 진행한다. 어떻게보면 당연한 일 일수있지만, 중복된 코드와 정형적인 코드는 개선할 수록 생산성이 올라간다.

1. 테스트마다 객체생성

```java
@Test
public void 사용자_삭제_테스트(){
  //given
  Member member = Member.build()
    				.deleteYn("Y")
    				.build();
  
  //when
  member.update();//
  
  
  //given
  assertThat(member.getActiveYn()).isEqualTo("Y");
}
```

어쩌면 이 케이스는 양반일지 모른다.`builder()` 를 사용해서, 그나마 낫다. 먼저 설명을 하자면 위의 케이스는 삭제를 시킨후 `update()` 를 진행한다.(삭제가 됬을땐 활동을 할수 없기에 ActiveYn을 N 으로 만드는 로직이 작성되있음.)  `builder()` 를 사용하였다 하더라도, 불편한건 변함없다. 

2. 반복적인 코드 줄여보기

```java
public Member createMember(){
  Member member = Member.build()
    				.name("Kimchi-dev")
    				.deleteYn("Y")
    				.build();
}

@Test
public void 사용자_삭제_테스트(){
  //given
  Member member = createMember();
  
  //when
  member.update();//
  
  
  //given
  assertThat(member.getActiveYn()).isEqualTo("Y");
}

```

이제 `Member` 관련 테스트는 이걸로 진행해도 될것 같다. 한번의 작성으로 간단한 테스트를 진행할 수 있다. 하지만 문제가생겼다. 생성되는 객체가 모두 같다. 정형화된 테스트는 이것으로 해결할 수 있지만 서로 다른 값을 테스트 할 때는 ...?

## JUnitParams

뭐 그렇게 대단한건아닌데, 조금 신기하기에 사용해보았다.

### Installation

```xml
<!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-params -->
<dependency>
  <groupId>pl.pragmatists</groupId>
  <artifactId>JUnitParams</artifactId>
  <version>1.1.1</version>
  <scope>test</scope>
</dependency>
```

2021-04-15 기준 최신버전





## Usage





### JUnit4

```java
@Runwith(JUnitParamsRunner.class)//Runner 설정
public class MemberTest {
  
  @Test
  @Parameters({
    "Kimchi,Y",
    "Dev,N"
  })
  public void 사용자_삭제(String name, String deleteYn){
    	//Given
      Member member = Member.builder()
              .name(name)
              .deleteYn(deleteYn)
              .build();
    
    	//When
    	member.update();
    
    	//Then
    	assertThat(member.getActiveYn()).isEqualTo(deleteYn);
  }
  
}
```



### JUnit5

```java
@SpringBootTest
public class MemberTest{
    @ParameterizedTest
    @MethodSource("parmas")
  	public void 사용자_비활성화(String name, String deleteYn){
      	//Given
      	Member member = Member.builder()
          				.name(name)
          				.deleteYn(deleteYn)
          				.builder();
      
      	//When
      	member.update();
      
      
      	//Then
      	Assertions.assertThat(member.getActiveYn()).isEqualsTo(deleteYn)
    }
  
  	public Stream<Arguments> params(){
        return Stream.of(
            Argument.of("Kimchi-dev","Y"),
            Argument.of("foo","N"),
            Argument.of("bar","N")
        );
    }
  	
}
```



어떻게 보면 JUnit4 에서는 `TypeSafe` 하지않아 불편하기도 한데, 방법이 없는건 아니다. 다음과 같이 수정할 수 있다.

### JUnit4 (Type Safe)

```java
@Runwith(JUnitParamsRunner.class)//Runner 설정
public class MemberTest {
  
  @Test
  @Parameters
  public void 사용자_삭제(String name, String deleteYn){
    	//Given
      Member member = Member.builder()
              .name(name)
              .deleteYn(deleteYn)
              .build();
    
    	//When
    	member.update();
    
    	//Then
    	assertThat(member.getActiveYn()).isEqualTo(deleteYn);
  }
  
  public Object[] parametersFor사용자_삭제(){
    return new Object[] {
      new Object[] {"Kimchi-dev","Y"},
      new Object[] {"foo","N"},
      new Object[] {"bar","N"}
    };
  }
  
}
```



이제 각자 다른 값의 테스트를 반복되는 코드의 작성을 줄여서 진행할 수 있다. 또한 `method = "params"` 설정이 없어도 JUnitParams에서 제공하는 `parametersFor` 컨벤션을 따른다면  테스트 진행이 가능하다.



