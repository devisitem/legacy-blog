---
layout: post
title: -Spring- JWT 토큰을 이용한 인증 및 인가 (feat.jjwt)
categories: [Development,Spring]
tags: [JWT,Spring Security,Token]
date: 2021-06-13 20:50:00 +0900
thumbnail: "/assets/img/bloging/spring/jwt-lgo.png"
excerpt_separator: <!--more-->
hide: false
---
JWT 토큰을 이용한 검증및 인가

<!--more-->

## JWT 란?

**J**son **W**eb **T**oken의 줄임말이다. 그렇다면 JWT는?

RFC 7519 웹표준으로 지정되어있고 `JSON` 객체를 사용해서 토큰 자체에 정보들을 저장하고있는 `Web Token`이다. 사용방식도 매우 간편하고 쉽게 적용할 수 있어서 사이드 프로젝트 진행시에 정말 유용하게 사용할 수 있다.

JWT는 <span style="color: #fb015b;">Header</span>, <span style="color:#d63aff;">Payload</span>, <span style="color: #00b9f1;">Signature</span> 3가지의 부분으로 구성되어있다. 각 부분은 . (The period) 로 구분되는데, 아래와 같은 형식이다.

<span style="color: #fb015b;">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.<span style="color:#d63aff;">JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>.<span style="color: #00b9f1;">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>

<span style="color: #fb015b;">Header</span>는 `Signature` 를 해싱하기 위한 알고리즘 정보들이 담겨있다.  

<span style="color:#d63aff;">Payload</span>는 서버와 클라이언트가 주고받는, 시스템에서 실제로 사용될 정보에 대한 내용들을 담고있다.  

<span style="color: #00b9f1;">Signature</span>는 토큰의 유효성 검증을 위한 문자열이다. 이 문자열을 통해 서버에서 이 토큰이 유효한 검증할 수 있다.  



`JWT`의 장점은 중앙의 인증서버, 데이터 스토어에 대한 의존성이 없고 시스템 수평 확장에 유리하다는 점이있다.

또한, `Base64 SafeEncoding`을 사용하기 때문에 `URL`, `CooKey`,`Header` 어디에든 사용가능하다. 하지만 `Payload` 의 크기가 커지면 네트워크 사용량이 당연시하게 증가하기 때문에 이를 잘고려하여 필요한 정보만 담을수 있도록 설계해야 한다. `Token` 정보는 클라이언트에 저장되기 때문에 서버에서 개입할 수 없다.





### 테스트 프로젝트 생성

### 개발환경

- `Spring Boot 2.5.1`
- `Jdk 1.8`
- `JUnit5`
- `Gradle`

- framworks : [`Spring Data JPA`, `Spring Security`, `Spring validation`, `Lombok`, `H2 Database`]

- Library : [`jjwt-api`, `jjwt-Impl`, `jjwt-jackson`]

### SecurityConfig.java



```java
import lombok.RequiredArgsConstructor;
import me.kimchi.JwtTest.jwt.JwtAccessDeniedHandler;
import me.kimchi.JwtTest.jwt.JwtAuthenticationEntryPoint;
import me.kimchi.JwtTest.jwt.JwtSecurityConfig;
import me.kimchi.JwtTest.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
/*
* @PreAuthorize를 method 단위로 추가하기 위해 사용
* */
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/h2-console/**"
                            ,"/favicon.ico"
                );
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()

                .headers()
                .frameOptions()
                .sameOrigin()
                .and()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authorizeRequests()
                .antMatchers("/api/hello").permitAll()
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/api/signup").permitAll()
                .antMatchers("/api/encode").permitAll()
                .anyRequest().authenticated()
                .and()

                .apply(new JwtSecurityConfig(tokenProvider))
        ;
    }


}

```



### application.yml

```yml
spring:
  h2:
    console:
      enabled: true

  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:

  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop #run: Drop create Alter , terminate: Drop
    properties:
      hibernate:
        format-sql: true
        show-sql: true
    defer-datasource-initialization: true

logging:
  level:
    me.kimchi: DEBUG

jtw:
  header: Autorization

  #HS512 알고리즘을 사용할 것이기 때문에 512bit, 즉 64byte 이상의 secret key를 사용해야 한다.
  secret: c2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQtc2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQK
  token-validity-in-seconds: 86400
```



> spring.jpa.defer-datasource-initialization: true
>
> `Spring Boot 2.5.0` 부터 변경되었기 때문에 `data.sql` 파일을 사용하려면 해당 값을 활성화 시켜줘야 한다.



[**jjwt 라이브러리 다운로드**](https://mvnrepository.com/search?q=jjwt)  필요한 라이브러리 : [`jjwt-api`, `jjwt-Impl`, `jjwt-jackson`]



### TokenProvider.java

```java
package me.kimchi.JwtTest.jwt;



import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

/*
 * 토큰 생성 및 유효성 검증
 */
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider implements InitializingBean {


    private static final String AUTHORITIES_KEY = "auth";

    private final String secret;
    private final long tokenValidityInMilliseconds;

    private Key key;


    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds) {
        this.secret = secret;
        this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
    }
    //Bean
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}

```



- 설명
  - afterPropertiesSet : 생성자로 주입받은 `secret` 을 **Base64** Decode를 한 값을 `key` 변수에 할당한다.
  - createToken :  토큰을 생성한다. `Authentication` 객체를 받아서 권한을 넣고 만료시간을 정하고 해싱하여 토큰을 리턴한다.
  - getAuthentication : 토큰을받아 `Claim` 을 만들고, `SimpleGrantedAuthority` 리스트를 만들고 이를 이용해 `User` 객체를 만들고 최종적으로 `Authentication` 을 리턴한다.
  - validateToken : 토큰을받아 유효성을 검증한다.

### JwtFilter.java

```java
package me.kimchi.JwtTest.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final TokenProvider tokenProvider;

    /*
    * 토큰의 인증정보를 Security Context(Thread Local)에 저장
    * */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        String jwt = resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();

        if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)){

            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.debug("SecurityContext - {} save Authentication, URI = {}",authentication.getName(),requestURI);
        }else{

            log.debug("There is no Valid Valid JWT Token. URI = {}",requestURI);
        }

        chain.doFilter(request, response);
    }
    /*
    * requestHeader에서 토큰정보를 가져온다.
    * */
    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }

}

```

- 설명
  - `jwtFilter` 는 필터 요청헤더에 들어온 토큰에대한 유효성 검증 필터로직을 작성할 수 있다.
  - `GenericFilterBean` 으로 등록하여 필터의 역할 을 수행할 수 있도록 구현해 준다.

### AuthController.java

```java
package me.kimchi.JwtTest.controller;

import antlr.Token;
import lombok.RequiredArgsConstructor;
import me.kimchi.JwtTest.dto.LoginDto;
import me.kimchi.JwtTest.dto.TokenDto;
import me.kimchi.JwtTest.jwt.JwtFilter;
import me.kimchi.JwtTest.jwt.TokenProvider;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) throws Exception {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Baerer ".concat(jwt));

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);

    }
}

```



- 설명
  - `/api/authenticate` 는 사용자정보를 확인하고 토큰을 발급하는 `API` 이다.
  - `authenticate` 메소드로 토큰을 보내는순간 인증이 시작되며, `UserDetailsService`의 `loadUserByUsername` 메소드가 실행된다. 검증이 끝나면 발급된 토큰을 `Header` 에 넣어 넘긴다.



이정도 까지만 설명을 하며, 나머지소스는 [Kimchi-dev git hub](https://github.com/kimchi-dev/jwt-test) 에서 확인 할 수 있다.

> 화나도 어쩔수 없습니다. 이 포스트는 설명을 위함 입니다.
