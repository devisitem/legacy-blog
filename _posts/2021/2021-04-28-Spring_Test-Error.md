---
layout: post
title: -Spring- JUnit Test Error (No ParameterResolver)
categories: [Development,Spring]
tags: [No ParameterResolver,테스트 에러]
date: 2021-04-25 17:54:00 +0900
thumbnail: "/assets/img/bloging/spring/junit_logo.png"
excerpt_separator: <!--more-->
hide: false
---
No ParameterResolver registerd for parameter

<!--more-->

![JUnit5 DI]({{ "/assets/img/bloging/spring/TestError01.png" | relative_url }})

## JUnit 5 에선 안돼?

```java
@SpringBootTest
@RequiredArgsConstructor
class UserControllerTest{

    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;
    private final UserRepository UserRepository;

    @Test
    @DisplayName("회원 로그인 테스트")
    public void login() throws Exception{
        mockMvc/perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(UserRepository.createUser())))

                .andDo(print());
    }
}
```
`JUnit4`에서는 테스트 해보지 않았지만 `JUnit5`에서 테스트 실행시 위와같은코드로 `@RequiredArgsConstructor`어노테이션으로 의존성 주입을 받는다면 빈생성에 실패한다.`JUnit5`에서는 `DI`를지원하는 타입이 정해져있기 때문에 아래와같이 `@AutoConfigureMockMvc`를 `Autowired`와 같이 사용하여 주입시켜야한다.

## 방법은?
```java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest{

    @Autowired
    private final MockMvc mockMvc;
    @Autowired
    private final ObjectMapper objectMapper;
    @Autowired
    private final UserRepository UserRepository;

    @Test
    @DisplayName("회원 로그인 테스트")
    public void login() throws Exception{
        mockMvc/perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(UserRepository.createUser())))

                .andDo(print());
    }
}
```
