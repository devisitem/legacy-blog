---
layout: post
title: -Spring- SVN 커밋 시 젠킨스 빌드 (SVN commit jenkins build)
categories: [Development,Jenkins]
tags: [Jenkins,CI/CD,SVN,SVN 커밋 시 젠킨스 빌드]
date: 2021-06-18 16:26:00 +0900
thumbnail: "/assets/img/bloging/spring/rest_docs.png"
excerpt_separator: <!--more-->
hide: true
---
SVN과 Jenkins로 연동으로 CI 구성을 해보자.

<!--more-->

## 개요  
<br>
> 이 포스트는 SVN에서 커밋이 발생할 때 Jenkins에서 해당 Repository의 소스를 가져와 빌드를 하는것이 목적이기 때문에 SVN Server 설치와 Jenkins 설치는 다루지 않습니다.

## 준비  
<br>
1. SVN Server
2. Jenkins

이 포스트는 [**젠킨스 공식문서**](https://plugins.jenkins.io/subversion/)를 참고하여 작성하였다.  

각 서버끼리 통신을 할려면 다음의 정보들이 필요하다.  

- Jenkins 계정으로 접근 할 수있는 `API_KEY`  
- Jenkins job으로 접근 할 수 있는 `AUTH_KEY`  

### API Token 발급

<br>

먼저 `API_KEY`를 발급 받을 계정정보로 이동한다.

![계정 접근]({{ "/assets/img/bloging/jenkins/svn-jenkins01.png" | relative_url }})

![계정 접근2]({{ "/assets/img/bloging/jenkins/svn-jenkins01.png" | relative_url }})

위 이미지를 보면 본인은 이미`API_Token`을 발급받아 존재하지만, 처음 발급받으면 `Add new Token`을 눌러 해싱 할 임의의 값을 입력한다.  
테스트를 위해 그냥 `svn-post-commit`으로 하였다.. 무튼 아무값이나 넣고 `Generate`하면 해싱된 `API_Key`를 받는다.  
나중에 사용해야 하므로 메모해두자.  

### Jenkins 설정  

<br>

![젠킨스 SVN 설정]({{ "/assets/img/bloging/jenkins/svn-jenkins03.png" | relative_url }})

위 이미지에 `Repository URL`에 `svn://${host}/${Repository}/${Project Path}` 형식으로 입력해준다. 본인은 `trunk`안에 프로젝트를 넣어놨다.  
`Credential`은 말그대로 `SVN`접근 정보이다. `add > jenkins`를 눌러 추가해주자.

![젠킨스 SVN 설정]({{ "/assets/img/bloging/jenkins/svn-jenkins04.png" | relative_url }})

1. 젠킨스 유저명이다. 그냥 목록에서 알아보도록 설정할 유저명  
2. `SVN` 비밀번호  
3. `SVN` 아이디  

![젠킨스 SVN 설정]({{ "/assets/img/bloging/jenkins/svn-jenkins05.png" | relative_url }})  

위에서 말한 `AUTH_Key`이다. 이것또한 `SVN`에서 `Hook`을 보낼때 사용 해야하기 때문에 임의의 문자열로 작성해준다.  
`API_KEY`와 같이 메모해두자.


![젠킨스 SVN 설정]({{ "/assets/img/bloging/jenkins/svn-jenkins06.png" | relative_url }})  

빌드가 목적이기 때문에 배포 쉘스크립트에 대해서는 다루지 않으므로 위까지만 설정해준다.  

### SVN Server 설정  

<br>

`SVN`이 설치된 서버에서 보면 `repository`디렉토리 (리포지토리 생성시 만들어진 디렉토리명 본인은 `JENKINS-SVN-TEST`) 안에 `conf`디렉토리로 이동한다.

```terminal
/var/opt/svn/jenkins-svn-test/conf # ls -al
total 16
drwxr-xr-x    1 root     root          4096 Jun 17  2021 .
drwxr-xr-x    1 root     root          4096 Jun 18  2021 ..
-rw-r--r--    1 root     root          1118 Jun 17  2021 authz
-rw-r--r--    1 root     root           885 Jun 17  2021 hooks-env.tmpl
-rw-r--r--    1 root     root           325 Jun 17  2021 passwd
-rw-r--r--    1 root     root          4366 Jun 18  2021 svnserve.conf
```

> 본인은 SVN서버를 Docker로 띄운거라 리눅스임.

`conf`(설정파일) 파일 설명

- authz : 계정 권한정보 파일
- hook-env.tmpl : 훅 환경설정 파일
- passwd : 계정 정보파일
- svnserve.conf : 위파일들을 svn server에서 사용할 때 설정하는 파일

## authz  파일수정

```terminal
$ vi authz

### This file is an example authorization file for svnserve.
### Its format is identical to that of mod_authz_svn authorization
### files.
### As shown below each section defines authorizations for the path and
### (optional) repository specified by the section name.
### The authorizations follow. An authorization line can refer to:
###  - a single user,
###  - a group of users defined in a special [groups] section,
###  - an alias defined in a special [aliases] section,
###  - all authenticated users, using the '$authenticated' token,
###  - only anonymous users, using the '$anonymous' token,
###  - anyone, using the '*' wildcard.
###
### A match can be inverted by prefixing the rule with '~'. Rules can
### grant read ('r') access, read-write ('rw') access, or no access
### ('').

[aliases]
# joe = /C=XZ/ST=Dessert/L=Snake City/O=Snake Oil, Ltd./OU=Research Institute/CN=Joe Average

[groups]
# harry_and_sally = harry,sally
# harry_sally_and_joe = harry,sally,&joe
allaccess = (SVN 계정명)
# [/foo/bar]
# harry = rw
# &joe = r
# * =

# [repository:/baz/fuz]
# @harry_and_sally = rw
# * = r
[/]
@allaccess = rw

```  
<br>
`allaccess`는 본인의 `SVN`계정을 입력한다. 그후 아랫쪽에 `[/]`아래에 `@allaccess`라는 변수에 `rw` (read write)값을 할당한다.

### passwd 파일수정  

<br>

```terminal
$ vi passwd

### This file is an example password file for svnserve.
### Its format is similar to that of svnserve.conf. As shown in the
### example below it contains one section labelled [users].
### The name and password for each user follow, one account per line.

[users]
# harry = harryssecret
# sally = sallyssecret
(SVN 아이디) = (SVN 비밀번호)


```
`SVN아이디 = SVN비밀번호` 형식으로 계정을 설정해준다.  

### svnserve.conf 파일 수정

```terminal
vi svnserve.conf

### This file controls the configuration of the svnserve daemon, if you
### use it to allow access to this repository.  (If you only allow
### access through http: and/or file: URLs, then this file is
### irrelevant.)

### Visit http://subversion.apache.org/ for more information.

[general]
### The anon-access and auth-access options control access to the
### repository for unauthenticated (a.k.a. anonymous) users and
### authenticated users, respectively.
### Valid values are "write", "read", and "none".
### Setting the value to "none" prohibits both reading and writing;
### "read" allows read-only access, and "write" allows complete
### read/write access to the repository.
### The sample settings below are the defaults and specify that anonymous
### users have read-only access to the repository, while authenticated
### users have read and write access to the repository.
anon-access = none
auth-access = write
### The password-db option controls the location of the password
### database file.  Unless you specify a path starting with a /,
### the file's location is relative to the directory containing
### this configuration file.
### If SASL is enabled (see below), this file will NOT be used.
### Uncomment the line below to use the default password file.
password-db = passwd
### The authz-db option controls the location of the authorization
### rules for path-based access control.  Unless you specify a path
### starting with a /, the file's location is relative to the
### directory containing this file.  The specified path may be a
### repository relative URL (^/) or an absolute file:// URL to a text
### file in a Subversion repository.  If you don't specify an authz-db,
### no path-based access control is done.
### Uncomment the line below to use the default authorization file.
authz-db = authz
### The groups-db option controls the location of the file with the
### group definitions and allows maintaining groups separately from the
### authorization rules.  The groups-db file is of the same format as the
### authz-db file and should contain a single [groups] section with the
### group definitions.  If the option is enabled, the authz-db file cannot
### contain a [groups] section.  Unless you specify a path starting with
### a /, the file's location is relative to the directory containing this
### file.  The specified path may be a repository relative URL (^/) or an
### absolute file:// URL to a text file in a Subversion repository.
### This option is not being used by default.
# groups-db = groups
### This option specifies the authentication realm of the repository.
### If two repositories have the same authentication realm, they should
### have the same password database, and vice versa.  The default realm
### is repository's uuid.
realm = My First Repository
### The force-username-case option causes svnserve to case-normalize
### usernames before comparing them against the authorization rules in the
### authz-db file configured above.  Valid values are "upper" (to upper-
### case the usernames), "lower" (to lowercase the usernames), and
### "none" (to compare usernames as-is without case conversion, which
### is the default behavior).
# force-username-case = none
### The hooks-env options specifies a path to the hook script environment
### configuration file. This option overrides the per-repository default
### and can be used to configure the hook script environment for multiple
### repositories in a single file, if an absolute path is specified.
### Unless you specify an absolute path, the file's location is relative
### to the directory containing this file.
# hooks-env = hooks-env

[sasl]
### This option specifies whether you want to use the Cyrus SASL
### library for authentication. Default is false.
### Enabling this option requires svnserve to have been built with Cyrus
### SASL support; to check, run 'svnserve --version' and look for a line
### reading 'Cyrus SASL authentication is available.'
# use-sasl = true
### These options specify the desired strength of the security layer
### that you want SASL to provide. 0 means no encryption, 1 means
### integrity-checking only, values larger than 1 are correlated
### to the effective key length for encryption (e.g. 128 means 128-bit
### encryption). The values below are the defaults.
# min-encryption = 0
# max-encryption = 256



```
주석 중에 `#`이 하나만 되어있는것만 풀어도된다.  
`anon-access = none`, `auth-access = write`, `password-db = passwd`, `authz-db = authz`, `realm = My First Repository`  
`realm`은 커밋시 출력되므로 해당 프로젝트 이름정도 적어주면 될것 같다.  

<br>

### post-commit파일 수정
`hooks`디렉토리를 열어본다면 `post-commit.tmpl` 파일이 존재한다. `SVN은 커밋시 post-commit`파일을 실행하는데 `post-commit.tmpl`파일만 있다면, 해당 훅은 동작하지 않는다.  
따라서 `post-commit.tmpl` 파일을 `post-commit` 파일로 만들어준다.

```terminal
$ cp post-commit.tmpl post-commit
```
복사가 되었다면 아래와같이 수정하자

```sh
#!/bin/sh

# POST-COMMIT HOOK
#
# The post-commit hook is invoked after a commit.  Subversion runs
# this hook by invoking a program (script, executable, binary, etc.)
# named 'post-commit' (for which this file is a template) with the
# following ordered arguments:
#
#   [1] REPOS-PATH   (the path to this repository)
#   [2] REV          (the number of the revision just committed)
#   [3] TXN-NAME     (the name of the transaction that has become REV)
#
# Because the commit has already completed and cannot be undone,
# the exit code of the hook program is ignored.  The hook program
# can use the 'svnlook' utility to help it examine the
# newly-committed tree.
#
# The default working directory for the invocation is undefined, so
# the program should set one explicitly if it cares.
#
# On a Unix system, the normal procedure is to have 'post-commit'
# invoke other programs to do the real work, though it may do the
# work itself too.
#
# Note that 'post-commit' must be executable by the user(s) who will
# invoke it (typically the user httpd runs as), and that user must
# have filesystem-level permission to access the repository.
#
# On a Windows system, you should name the hook program
# 'post-commit.bat' or 'post-commit.exe',
# but the basic idea is the same.
#
# The hook program runs in an empty environment, unless the server is
# explicitly configured otherwise.  For example, a common problem is for
# the PATH environment variable to not be set to its usual value, so
# that subprograms fail to launch unless invoked via absolute path.
# If you're having unexpected problems with a hook program, the
# culprit may be unusual (or missing) environment variables.
#
# CAUTION:
# For security reasons, you MUST always properly quote arguments when
# you use them, as those arguments could contain whitespace or other
# problematic characters. Additionally, you should delimit the list
# of options with "--" before passing the arguments, so malicious
# clients cannot bootleg unexpected options to the commands your
# script aims to execute.
# For similar reasons, you should also add a trailing @ to URLs which
# are passed to SVN commands accepting URLs with peg revisions.
#
# Here is an example hook script, for a Unix /bin/sh interpreter.
# For more examples and pre-written hooks, see those in
# the Subversion repository at
# http://svn.apache.org/repos/asf/subversion/trunk/tools/hook-scripts/ and
# http://svn.apache.org/repos/asf/subversion/trunk/contrib/hook-scripts/

#Jenkins Build


REPOS="$1"
REV="$2"
TXN_NAME="$3"
echo "Post Commit Start !"
USERNAME=젠킨스 아이디
API_TOKEN=해싱된 AUTH_KEY #이전에 메모해두었던 API_KEY
AUTH_TOKEN=svn-authentication # 이전에 메모해두었던 AUTH_KEY
JENKINS_URL=젠킨스 주소 # ex) http://host:port
APP_PROJECT_NAME=job으로 등록 되어있는 프로젝트 이름

echo "Success initializing for Variable !"
echo "Username = $USERNAME, JenkinsURL = $JENKINS_URL, Project Name = $APP_PROJECT_NAME"

NOTIFY_URL="job/${APP_PROJECT_NAME}/build?token=${AUTH_TOKEN}"

echo ""
echo "Complete Setting.Try Connectting ..."
sleep 2
echo ""
if [[ !-z ${BUILD_URL} ]];

then
    wget \
        --auth-no-challenge \
        --http-user=${USERNAME} \
        --http-password=${API_TOKEN} \
        --header "Content-Type:text/plain;charset=UTF-8" \
        --post-data "`svnlook changed -r ${REV} ${REPOS}`" \
        --output-document "-" \
        --timeout=2 \
        ${JENKINS_URL}/${NOTIFY_URL}
fi
## 커밋 로그 남기기 용도
echo "[$(date)] Repos : ${REPOS}, Rev : ${REV}, Tx : ${TXN_NAME}" >> ${REPOS}/logs/commit.log
```

저장하고 커밋시 성공 !
