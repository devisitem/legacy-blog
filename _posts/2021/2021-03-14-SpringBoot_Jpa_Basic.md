---
layout: post
title: -Spring- JPA 도메인 서비스 개발 (Domain Service)
categories: [Development,Spring]
tags: [Spring]
date: 2021-03-14 22:43:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 JPA는 인스턴스를 영속화할 수 있기 때문에 이를 잘 이용해야 한다.  
 JPA 도메인 서비스 개발 시 참고.  

<!--more-->  

## 파라미터 바인딩 (Parameter Binding)  

JPA를 사용하다보면 JPQL을 사용해야하는 상황이 있다. 이럴 때는 다음의 코드처럼 사용하자.  
다음의 상황은 같은 이름의 `Member`인스턴스를 조회하는 상황이다.  

```java

@PersistenceContext
private EntityManager em;

public List<Member> findByName(String name){
  return em.createQuery("select m from Member m where m.name = :name",Member.class)
          .setParameter("name",name)
          .getResultList();
}

```  

인스턴스를 조회하는 쿼리를 날리는데 `preparedStatement` 와 비슷한 형태로 `setParameter`에 의해 값을 넘기고, 해당 쿼리안에서 파라미터가 바인딩 된다.  

## @Transactional (트랜잭션 어노테이션)  

이 어노테이션은 스프링 테스트에서 사용시 모두 `Rollback`한다. 테스트진행시에도 굳이 롤백을 안하고 싶다면 `@Rollback(false)`로 임시적인 롤백을 막을수 있다. 물론 테스트 진행시엔 대부분 롤백한다.  
**`@Test`** 가 아닌 `main` 안에서는 롤백하지않는다. 기본값으로 `@Transactional(readOnly = false)`을 가지며 `readOnly`의 값은 조회 시에만 `true`로 설정한다. 이방법을 응용해보면 다음과 같이 적용할 수 있다.  

```java

@Service
@Transactional(readOnly = true)
public class KimhciService{

  @Autowired
  private KimchiRepository kimchiRepository;

  @Transactional
  public void save(Kimchi kimchi){

    kimchiRepository.saveKimch(kimchi);

  }

}


```  

위 코드는 클래스 자체에 `@Transactional`의 property로 readOnly를 true로 줬다. 전체에대한 설정은 읽기 이지만 필요에따라 각 Method에 설정할 수 있다.  

### @Autowired  

위코드에 선언된 `@Autowired`는 필드에 선언할견우 다른 Injection으로 Access할 수 있는 방법이 없기 때문에, setter Injection으로 사용할 수도 있다.다음은 setter Injection이다.  

### Setter Injection  
```java  

@Service
@Transactional(readOnly = true)
public class KimhciService{

  private KimchiRepository kimchiRepository;

  @Autowired
  public void setKimchiRepository(KimchiRepository kimchiRepository){

    this.kimchiRepository = kimchiRepository;

  }

}

```  
일반 엔티티 설계시  `Setter` 설계와 동일한 구조로 설계한다. Setter Injection의 장점은 Test코드를 작성할때 Mock을 주입할 수 있다. Field는 주입하기가 까다롭다. 그래도 Runtime에는 각 인스턴스의 조립이 끝나기 때문에 Constuctor Injection (생성자 주입)을 사용하기도한다. 다음은 생성자 주입의 예 이다.  

### Constuctor Injection  

```java

@Service
@Transactional(readOnly = true)
public class KimhciService{

  private KimchiRepository kimchiRepository;

  @Autowired
  public KimchiService(KimchiRepository kimchiRepository){

    this.kimchiRepository = kimchiRepository;

  }

}

```  
이런식으로 생성자 주입을 사용할 수있다. 생성자로 주입한다면, 한사람이 작성하기에 편리하지만 다른사람과 협업을 하는 상황에서 문제가 될 수 있는 부분이 많기에 주입이 필요한 필드는 final 로 선언하여 문제될 수 있는 부분을 막을 수 있으며 같이 협업하는 사람에게 주의해야하는 점을 인지시켜줄 수있다. final로 된 필드에 주입하는 다음의 코드를 보자.  

### RequiredArgsConstructor  

```java
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KimhciService {

    private final KimchiRepository kimchiRepository;

}

```  

final로 선언을 하고 `@RequiredArgsConstructor` 어노테이션을 붙여준다면 간단한 주입과 외부 코드에서 접근시 기본생성자가 없기 때문에 참조 클래스의 내부로직을 볼 수 밖에 없다.  
이 어노테이션은 final로 선언된 field의 주입을 담당하며 간결한 방식으로 좋은 코드를 만들수 있기에 자주 사용한다.  

### TDD  
  - 단위 테스트 진행시 Transcational 때문에 저장은 안되지만 쿼리가 적용되는걸 굳이 보고싶다면 다음 처럼 적용할 수 있다.  
```java

  @SpringBootTest
  @Transcational
  public class KimchiRepositoryTest{

    @Autowired EntityManager em;
    @Autowired KimchiService kimchiService;
    @Autowired KimchiRepository kimchiRepository;

    @Test
    public void 김치_재료추가(){
      //given
      Kimchi kimchi = new kimchi();

      //when
      kimchi.addSources("lemon")
      em.persist(kimchi);
      em.flush();

      //then
      assertEquals("lemon",kimchi.getSources().get(0),"첫번째 재료가 일치하지 않는다.");

      fail("재료는 일치해야만한다.")
    }

    ...Other_Methods

  }

```  
  영속화된 객체를 `EntityManager`의 `flush` method로 출력할 수 있다.  

  - JUNIT4 와 JUNIT5의 예외처리 작성  
  JUNIT4  
  : `@Test(expected = Exception.class)`  
  JUNIT5  
  :
  ```java
  @Test
  public void 김치_재료추가(){
    //given
    Kimchi kimchi = new kimchi();

    //when
    kimchi.addSources("lemon")
    em.persist(kimchi);
    em.flush();

    //then
    assertEquals("lemon",kimchi.getSources().get(0),"첫번째 재료가 일치하지 않는다.");
    Exception e = assertThrown(Exception.class,() -> {
        예외 처리 테스트 로직
    },"예외 메세지");

    assertEquals(e.getMessage(),"테스트 로직에서 발생한 메세지")
  }

  ```  

### Protected Constuctor (기본생성자 생성 주의)  
특정인스턴스를 설계할때 인스턴스의 기본생성을 막아야하는 경우가있다 보통 이경우는 `protected` access modifier를 사용하는데, 다음과 같은 어노 테이션으로 간단히 작성할 수 있다.  
```java
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Kimchi{
      ...
}

```  

## Memory DB (In Memory)  
스프링부트는 기본적으로 gradle에 등록되 있는 드라이버에 한에 `In Memory DB`를 지원한다. 외부 데이터베이스를 사용해서 진행해도되지만, Test Case 작성 시 인메모리를 사용한다면 빠르고 간단한 테스트가 가능하다.  
기본적으로 외부 DB를 사용하더라도 `@Transactional`이 적용 되있다면 롤백되기 때문에 인메모리 DB 랑 다를게 없다. 롤백 테스트 진행시는 인메모리로 진행해도 무방하다.  
`test`디렉토리 안에 `resource`디렉토리를 생성하면 그 안에있는 자원들이 사용되는데 우선권을 갖는다. 이방법을 이용하여 `application.yml`을 따로 만든다면 Test DB 연결 또는 인메모리 DB를 사용가능하다.  

스프링부트는 `jpa.hibernate.ddlauto`의 기본값이 `create-drop`인데 그냥 `create`를 사용하면 create를 하고 어플리케이션을 실행 한다. 반면에 create-drop하면 create를 하고 어플리케이션이 실행되며 어플리케이션이 종료할때 drop한다 따라서 테스트 시나리오의 과정을 보길원한다면 기본으로 진행하는 것도 좋다.  

## Domain Model Pattern (도메인 모델 패턴)  

엔티티에 핵심 비즈니스 로직을 몰아넣는 스타일을 도메인 모델 패턴이라 한다. 서비스계층은 단순히 엔티티에 필요한 요청을 위임하는 역할을 한다. 이처럼 엔티티가 비즈니스 로직을 가지고 객체지향의 특성을 적극 활용하는 것을 **도메인 모델 패턴**이라 한다. 또한 일반적으로 `sql mapper`를 다룰때 사용하는 패턴은 트랜잭션 스크립트 패턴 이라한다.  
