---
layout: post
title: -Spring- Feign Client Parsing Error (파싱 에러)
categories: [Development,Spring]
tags: [Spring,Spring Boot,Feign Client]
date: 2021-11-24 07:12:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_logo.png"
excerpt_separator: <!--more-->
hide: true
---
Spring Framework 5.3.9 Spring Framework Documentation

<!--more-->

## Problem



Feign 클라이언트 응답 바디 역직렬화 시 발생하는문제.

feign.response.body()를 objectMapper로 역직렬화시 다음과같은 오류가 발생합니다.

```terminal
com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'sun': was expecting (JSON String, Number, Array, Object or token 'null', 'true' or 'false')
 at [Source: (String)"sun.net.www.protocol.http.HttpURLConnection$HttpInputStream@4a428b36"; line: 1, column: 4]
	at com.fasterxml.jackson.core.JsonParser._constructError(JsonParser.java:1851)
	at com.fasterxml.jackson.core.base.ParserMinimalBase._reportError(ParserMinimalBase.java:717)
	at com.fasterxml.jackson.core.json.ReaderBasedJsonParser._reportInvalidToken(ReaderBasedJsonParser.java:2898)
```



구글링으로 검색시 파싱될 객체의 유무 또는 JSON과 객체의 포맷 매핑이 맞지않아 발생하는 오류라고 합니다.

하지만 포맷이 맞아도 발생합니다. 정확한 오류를 찾지는 못하였지만 추측으로는 응답 바디 전문이 길면 발생하는것 같습니다.



feign.Response 객체에는 두가지 Body 가 존재하는데 해당 객체들의 `toString()`은 다음과 같습니다.

#### InputStreamBody

```java
private static final class InputStreamBody implements Response.Body {

    ...Others...

    @Override
    public String toString() {
      try {
        return new String(toByteArray(inputStream), UTF_8);
      } catch (Exception e) {
        return super.toString();
      }
    }
}
```



#### ByteArrayBody

```java
private static final class ByteArrayBody implements Response.Body {

    ...Others...

    @Override
    public String toString() {
      return decodeOrDefault(data, UTF_8, "Binary data");
    }
}
```



길이가 짧을 때는 `ByteArrayBody.toString()`을 사용하고, 길이가 길 때에는 `InputStreamBody.toString()` 을 사용합니다.

길이가 길때 해당 스트림을 다읽기전에 닫히면 `stream is closed`라는 내용의 오류가 발생합니다. 또한, 해당 `InputStreamBody.toString()` 수행시 내부적인 예외가 발생한다면 **Object** 의 `toString()`을 호출합니다. 따라서 변환된값은 `feign.Response$InputStreamBody@334ddef3` 처럼 해쉬코드값을 표시합니다.  

사실 ObjectMapper와는 아무 상관이 없지만, ObjectMapper 사용시 오류를 바로 확인할 수 없기 때문에 관련지었습니다.



## Solved



결과적으로는 구글링으로 얻은 내용과 같이 JSON 포맷과 달라 할당할수 없는 오류가 맞습니다. 저 해쉬코드값을 역직렬화 하려했으니요.

만약 응답 전문이 길다면, 아래처럼 스트림으로 바로받아서 읽고 처리해야합니다.



```java
@Override
@PerformCheck(value = "Service -> External Connection", targetClass = ExternalConnectionService.class)
public final CzemsResponse connect (FeignRequest body, Function<FeignRequest, Response> connect) throws Throwable {
    connectLog.startExtLog();
    connectLog.info("\n---- Start to Connection And Convert----");

    ObjectMapper mapper = new ObjectMapper();

    feign.Response response = connect.apply(body);
    String parsed = IOUtils.toString(response.body().asReader(Charset.defaultCharset()));

    ...

}
```
