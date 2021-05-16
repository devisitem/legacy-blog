---
layout: post
title: -Spring- REST Docs 문서생성 (feat.ASCII Doctor)
categories: [Development,Spring]
tags: [REST Docs,API 문서화,ASCII Doctor]
date: 2021-05-14 20:50:00 +0900
thumbnail: "/assets/img/bloging/spring/rest_docs.png"
excerpt_separator: <!--more-->
hide: false
---
ASCII Doctor를 이용한 API 문서화

<!--more-->

## API 문서 빌드

`API` 를 문서화 하려면 테스트로 만들어진 문서조각들을 가지고 `API`문서를 빌드해야한다.

그러기 위해선 다음의 `plug in` 추가가 필요하다.



### AsciiDoctor Plug in 설치

```xml
<plugin>
	<groupId>org.asciidoctor</groupId>
	<artifactId>asciidoctor-maven-plugin</artifactId>
	<version>1.5.3</version>
  <executions>
		<execution>
			<id>generate-docs</id>
			<phase>prepare-package</phase>
			<goals>
				<goal>process-asciidoc</goal>
      </goals>
			<configuration>
				<backend>html</backend>
				<doctype>book</doctype>
			</configuration>
    </execution>
	</executions>
  <dependencies>
		<dependency>
			<groupId>org.springframework.restdocs</groupId>
        <artifactId>spring-restdocs-asciidoctor</artifactId>
        <version>2.0.2.RELEASE</version>
    </dependency>
	</dependencies> </plugin> <plugin>
	<artifactId>maven-resources-plugin</artifactId>
	<version>2.7</version>
  <executions>
		<execution>
			<id>copy-resources</id>
			<phase>prepare-package</phase>
			<goals>
				<goal>copy-resources</goal>
      </goals>
			<configuration>
				<outputDirectory>
					${project.build.outputDirectory}/static/docs
        </outputDirectory>
				<resources>
					<resource>
						<directory>
							${project.build.directory}/generated-docs
            </directory>
          </resource>
				</resources>
      </configuration>
    </execution>
  </executions>
</plugin>
```

정확히 말하면 `adoc` 으로 생성된 문서들을 `markdown` 파일이라고 생각해보면, html로 파싱되는 것처럼 비슷하게 파싱되어 문서를 만들어준다. 이때 파싱하여 빌드해주는 플러그인 이다.

문서는 현재 프로젝트에 생성되있는 테스트를 기반으로 생성하며, 중간에 단위테스트 실패가 발생한다면, 생성 또는 변경이 되지 않는다.





### 빌드

플러그인 설치가 완료 되었다면 메이븐으로 빌드한다.

아래 사진처럼 IDE에서 실행하면 바로 생성된다.

![문서 빌드]({{ "/assets/img/bloging/spring/build-docs01.png" | relative_url }})

문서를 빌드하면 `target > generated-docs`  라는 경로에 `index.html` 이 생성되는데 이를 실행해보면 `HTML` 기반으로 생성된 문서를 볼 수 있다.

![생성된 문서]({{ "/assets/img/bloging/spring/build-docs02.png" | relative_url }})



### 문서 생성

![문서 확인]({{ "/assets/img/bloging/spring/build-docs03.png" | relative_url }})
