---
layout: post
title: -Maven- How to publishing artifact to Maven central with OSSRH (메이븐 저장소에 오픈소스 추가하기)
categories: [Development,Java]
tags: [Apache Maven,Java]
date: 2021-11-24 07:12:00 +0900
thumbnail: "/assets/img/bloging/maven/maven_logo.png"
excerpt_separator: <!--more-->
hide: true
---


# Maven Central에 Artifact를 추가(발행)하는 방법

<!--more-->

[원문](_)

*KimchiPaginator를 만들면서 너무 행복한 나머지 남들과 나눠쓰고 싶어서  “이건 Maven Repository에 올려야 되겠다” 라고 생각했습니다. 나한테도 귀찮으면 남한테도 귀찮은 문제라고 생각하지만 남들이 귀찮아하는걸 아니게 만드는게 뭔가 더, 뿌듯한 일인것 같았어요. 그래서 이 문서는 남들에게 오픈소스를 공유하는 방법의 진행방법을 공유하는 문서가 되는거에요. XD - Kimchi-dev*




## 다음의 준비가 필요해요.



1. JDK, Maven, Github 등등이 설치되어있는지 확인하기

2. 깃헙 계정 생성

3. 공유할 프로젝트 Github 저장소 생성

4. Github계정에 새 SSH 추가하기

   1. 터미널 실행
   2. 아래 명령어에 이메일을 붙여넣어요.

   ```terminal
   $ ssh-keygen -t ed25519 -C “your_email@example.com”
   ```

   3. 다음 처럼 나오면 Enter를 누르세요.

   ```terminal
   Generating public/private ed25519 key pair.
   Enter file in which to save the key (/Users/Kimchi-dev/.ssh/id_ed25519):
   ​```
   4. 그리고 passphrase를 입력하고 나오면 대칭키라고 생각하고 입력하시면 됩니다.
   5. key 생성확인은 `$ ls -al ~/.ssh`이고 .pub붙어있는게 공개키, 없는게 개인키 입니다.
   ```

5. Github으로 코드 푸시하기

6. Sonatype Jira 계정 가입하기

   1. 비밀번호에 특수문자, 대문자 들어가야해요.

7. 새로운 프로젝트 호스팅을 위한 Jira 이슈 생성. ([샘플 요청은 클릭](https://issues.sonatype.org/browse/OSSRH-24465))

   	- 아래 사진처럼 SelectBox를 `Community Support - Open Source Project Repository Hosting (OSSRH)`를 선택하면 자동으로 이슈 유형은 `New Project`로 선택 됩니다.
   	- 위에 사진처럼 나머지 issue 내용을 입력해주고 만들기 눌러줍니다.

8. GNU PG 설치.

   * 이건 간단하게 `brew install gpg` 또는 패키지 매니저를 통해 설치합니다. (windows는 `choco install gpg4win`)

   * 설치후 아래 처럼 gpg 버전 체크하면서 지원알고리즘이나 설치위치를 확인해요.

     ```terminal
     $  ~ gpg —version
     gpg (GnuPG) 2.3.3
     libgcrypt 1.9.4
     Copyright (C) 2021 Free Software Foundation, Inc.
     License GNU GPL-3.0-or-later <https://gnu.org/licenses/gpl.html>
     This is free software: you are free to change and redistribute it.
     There is NO WARRANTY, to the extent permitted by law.
     Home: /Users/jason/.gnupg
     Supported algorithms:
     Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
     Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
            CAMELLIA128, CAMELLIA192, CAMELLIA256
     AEAD: EAX, OCB
     Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
     Compression: Uncompressed, ZIP, ZLIB, BZIP2
     ```



9. 키쌍 생성.

```terminal
$  ~ gpg --full-gen-key
gpg (GnuPG) 2.3.3; Copyright (C) 2021 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

gpg: directory '/Users/jason/.gnupg' created
gpg: keybox '/Users/jason/.gnupg/pubring.kbx' created
Please select what kind of key you want:
   (1) RSA and RSA
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
   (9) ECC (sign and encrypt) *default*
  (10) ECC (sign only)
  (14) Existing key from card
Your selection? 1 //RSA기본으로 1로 진행합니다.
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 2048 //몇 비트로 하든 상관없지만 저는 2048(256bytes)로 진행했습니다.
Requested keysize is 2048 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) //키의 만료시간을 설정하지 않습니다.
Key does not expire at all
Is this correct? (y/N) y //진행

GnuPG needs to construct a user ID to identify your key.

Real name: 진짜 이름
Email address: tnine923@gmail.com
Comment:
You selected this USER-ID:
    "진짜 이름 <tnine923@gmail.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o //진행
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the

... 가림

public and secret key created and signed.

pub   rsa2048 2021-12-08 [SC]
      7822A43... 가림
uid                      진짜 이름 <tnine923@gmail.com>
sub   rsa2048 2021-12-08 [E]

➜  ~
```

10. Passphrase 입력

- 중간에 입력하라고 나오는데 쓰실 대칭키 입력 하시면 됩니다.





## 추가(발행) 단계





### POM 파일에 분산관리 섹션추가

- 배포 플러그인 추가하기 (pom.xml)

- 플러그인은 `pom.xml` 파일 안에서 `<build><plugins></plugins></build>`태그로 감싸줘야합니다.



  `pom.xml`을 작성하면서 아래처럼 기본적인 정보를 적어 주어야 합니다.

  ```xml
  <groupId>io.github.kimchi-dev</groupId>
  <artifactId>kimchi-easy-paginator</artifactId>
  <version>1.0.0</version>
  <packaging>jar</packaging>
  <developers>
      <developer>
          <name>Tae Gu Jeon</name>
          <email>tnine923@gmail.com</email>
      </developer>
  </developers>
  <name>${project.groupId}:${project.artifactId}</name>
  <description>Simple Usage and Easy Functions.Kimchi Paginator !</description>
  <url>https://github.com/Kimchi-dev/kimchi-easy-paginator</url>
  <licenses>
      <license>
          <name>apache-2.0</name>
          <url>https://opensource.org/licenses/Apache-2.0</url>
          <distribution>repo</distribution>
      </license>
  </licenses>
  ```



`<distributionManagement/> ` 태그는 스냅샷이나 배포버전을 어떤 저장소로 관리할지를 명시적으로 선언하는 태그입니다. 21년도 부터 정책이 변경되서 `oss.sonatype.org` 로 사용해도 적용되지 않습니다. 따라서 아래처럼`s01.oss.sonatype.org`로 관리해야 합니다. (**pom.xml**)

```xml
<distributionManagement>
    <snapshotRepository>
        <id>ossrh</id>
        <url>https://s01.oss.sonatype.org/content/repositories/snapshots</url>
    </snapshotRepository>
    <repository>
        <id>ossrh</id>
        <url>https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/</url>
    </repository>
</distributionManagement>
```



SCM도 추가합니다. 메이븐 SCM은 소스코드 관리 작업에대한 공통 API로 제공해서 메이븐 플러그인(예: maven-release-plugin)과 다른툴을 지원해요. 메이븐 SCM 툴 사용에대한 더많은 내용은 SCM목록 을 참조 해주세요. (**pom.xml**)

```xml
<scm>
    <connection>scm:git:git://github.com/Kimchi-dev/kimchi-easy-paginator.git</connection>
    <developerConnection>scm:git:ssh://github.com:Kimchi-dev/kimchi-easy-paginator.git</developerConnection>
    <url>https://github.com/Kimchi-dev/kimchi-easy-paginator</url>
    <tag>HEAD</tag>
</scm>
```



릴리즈 플러그인 추가  (**pom.xml**)

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-release-plugin</artifactId>
    <version>2.5.3</version>
    <configuration>
        <autoVersionSubmodules>true</autoVersionSubmodules>
        <useReleaseProfile>false</useReleaseProfile>
        <releaseProfiles>release</releaseProfiles>
        <goals>deploy</goals>
    </configuration>
</plugin>
```



넥서스 스테이징 메이븐 플러그인 추가  (**pom.xml**)

```xml
<plugin>
    <groupId>org.sonatype.plugins</groupId>
    <artifactId>nexus-staging-maven-plugin</artifactId>
    <version>1.6.7</version>
    <extensions>true</extensions>
    <configuration>
        <serverId>ossrh</serverId>
        <nexusUrl>https://s01.oss.sonatype.org</nexusUrl>
        <autoReleaseAfterClose>true</autoReleaseAfterClose>
    </configuration>
</plugin>
```



메이븐 소스 & 자바독 플러그인 추가  (**pom.xml**)

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
    <version>2.2.1</version>
    <executions>
        <execution>
            <id>attach-sources</id>
            <goals>
                <goal>jar-no-fork</goal>
            </goals>
        </execution>
    </executions>
</plugin>
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-javadoc-plugin</artifactId>
    <version>2.9.1</version>
    <configuration>
        <encoding>UTF-8</encoding>
    </configuration>
    <executions>
        <execution>
            <id>attach-javadocs</id>
            <goals>
                <goal>jar</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```



gpg 플러그인 추가  (**pom.xml**)

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-gpg-plugin</artifactId>
    <version>1.5</version>
    <executions>
        <execution>
            <id>sign-artifacts</id>
            <phase>verify</phase>
            <goals>
                <goal>sign</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```





### Settings.xml에 Credential 정보 추가





OSSRH 계정정보 추가 (**settings.xml**)

```xml
<servers>
    <server>
        <id>ossrh</id>
        <username>{가입한 아이디}</username>
        <password>{비밀번호}</password>
    </server>
</servers>
```

GPG passphrase 추가 (대칭키 ) (**settings.xml**)

```xml
<profile>
    <id>ossrh</id>
    <activation>
        <activeByDefault>true</activeByDefault>
    </activation>
    <properties>
        <gpg.passphrase>{설정했던 대칭키}</gpg.passphrase>
    </properties>
</profile>
<profile>
    <id>release-sign-artifacts</id>
    <activation>
        <property>
            <name>performRelease</name>
            <value>true</value>
        </property>
    </activation>
</profile>
```



배포작업시 메이븐에서 탐색하는 PGP Server는 아래와같습니다. (아래 사이트중 하나로 골라서 `--keyserver`옵션 줄때 사용하시면 됩니다.)

- keyserver.ubuntu.com
- keys.openpgp.org
- pgp.mit.edu
- keyserver.ubuntu.com
- keys.openpgp.org



```terminal
$ gpg --list-keys --keyid-format LONG
```

위에서 확인 해두라고 했던 Key를 여기서 쓰네요 위명령어로 한번더 조회할 수있어요.

```terminal
-----------------------------------------------------
pub   ... 2021-12-09 [SC]
      <키 아이디>
uid                 [ultimate] Tae Gu Jeon <tnine923@gmail.com>
sub   ... 2021-12-09 [E]

```



```terminal
$ gpg --keyserver keyserver.ubuntu.com --send-keys <키 아이디 입력>
```

릴리즈 진행

```terminal
$ mvn clean
$ mvn release:prepare
$ mvn release:perform
```

위에서 `mvn release:perform` 진행시에 `gpg: signing failed: Inappropriate ioctl for device`라는 에러가 발생하는데,
`$ export GPG_TTY=$(tty)` 명령어로 환경변수 설정해줍니다.

마무리로 `github`에 저장해주시고. 소나타입 저장소 인증 진행합니다.

이슈를 등록할때 사용했던 group-id는 pom.xml과 동일하게 맞춰주셔야합니다. 또한 해당 그룹 아이디의 도메인을 가지고 없을때 자격증명을 위해 `github`에 저장소 생성방식으로 소유권을 인증합니다. 그에 대한 절차는 아래처럼 봇의 안내에따라 진행할 수 있습니다. (Jira 이슈에 댓글로 달림)



```
If you do not own this domain, you may also choose a different Group Id that reflects your project hosting. io.github.kimchi-dev would be valid based on your Project URL.
To continue the registration process, please follow these steps:

Create a temporary, public repository called https://github.com/kimchi-dev/OSSRH-75870 to verify github account ownership.
Edit this ticket, update the Group ID field with the new GroupId, and set Status to Open.
More info: https://central.sonatype.org/publish/requirements/coordinates/
```



위 같은 상황에서는 `OSSRH-75870`이름의 리포지토리를 생성해서 자격증명을 진행할 수 있습니다.

자격증명이 되었다면 상단 버튼 Respond를 눌러 해당이슈의 상태를 `open` 으로 변경합니다.



그리고 다시 터미널로 돌아와서 아래의 명령어로 릴리즈 배포를 진행할 수 있습니다.

`$ mvn clean deploy -P release`



빌드가 성공으로 끝난다면, 아래의 메세지와 함께 `https://repo1.maven.org/maven2/`로 는 일반적으로 30분, 메이븐 공식 저장소인 `https://search.maven.org`로는 4시간 정도 걸린 다는 알림을 받을 수 있습니다.

```terminal
Central sync is activated for io.github.kimchi-dev. After you successfully release, your component will be available to the public on Central https://repo1.maven.org/maven2/, typically within 30 minutes, though updates to https://search.maven.org can take up to four hours.
```



 OSSRH를 이용해서 `Maven Repository`에 `Artifact`를 발행하면서, 마주한 에러들은 대부분 오타나 더 이상 `Apache Maven`에서 사용하지 못하도록 `Deprecated` 된 사례였습니다. 다른 분들이 올려주셨던 글들도 많은 도움이 되었지만, 21년도 부터 변경된 각 정책들에 적용하기에는 조금 어려움이 있었습니다.



조금 나중에 알았는데 `Apache Maven` 에서는 [OSSRH에 배포](https://central.sonatype.org/publish/publish-maven/)할 수 있는 정확한 필요사항들을 간단하게 정리해줘서, 참고하실수 있도록 공유드리겠습니다.

혹시라도 부족한 내용이나 공유해주실 내용이 있으시다면 tnine923@gmail.com 으로 언제든지 부탁드립니다.
