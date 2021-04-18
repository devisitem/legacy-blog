---
layout: post
title: -Git- Git Flow (깃 플로우)
categories: [Development,github]
tags: [Git Flow,깃 플로우,github]
date: 2021-04-16 17:10:00 +0900
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/img/bloging/git/gitflow.png"
---

기본브랜치만 만들어서 충돌나 날려먹지말고 Git flow를 사용하여 체계적인 프로젝트 운용관리와 안전한 협업 프로세스를 구축해보자.

<!--more-->


![IMAGE GIT]({{ "/assets/img/bloging/git/gitflow.png" | relative_url }})

<br>
## 원시시대적 코드반영  

사실 `Git`으로`master branch`만 사용하여 프로젝트를 관리하는 것은 `Git`을 쓰나마나이다. 코드를 작성하고 테스트 열심히해서 반영하고  master branch로 바로 병합하면, 혼자 일하는게 아닌가라는 생각이 든다. 혼자사용하는 블로그 같은경우는 뭐 맘대로 지지고 복고 해도 상관없지만 협업, 프로젝트 관리를 위해 Git을 사용하는데 이처럼 올바르지 못한 사용은 안좋은 결과를 초래할 수 있다.  
<br>
누군가 이런방식으로 일을 진행하는 것을 보고 글을 써야겠다고 느꼈다. 물론 그사람을 비하하는 것은아니다. 내가쓰는 글을 그사람에게 알리지 않을 뿐더러 좋은 기록을 위해 작성하는 것일 뿐이니까.  



## 이것은 낚시인가?

```terminal
echo "# plzUseGitflow" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Kimchi-dev/plzUseGitflow.git
git push -u origin main
```

처음 `Repository` 를 생성하면 위와 같은 명령어를 사용하라고 친절 하게 알려준다. `Git hub` 을 조금 이라도 사용 해본사람 이라면 알것이다. `5Line`을 보면 `git branch -M main` 이라는 명령어를 볼 수있다. 아니 잘사용하는 `master branch`를 왜 `main`으로 바꾸는 거지 ?! 궁금해서 알아보았더니 어떤 개발자가 `master`라는 이름은 주인이라는 인종차별적인 요소이다라는 주제로 git에 소송을 걸 었던것. 이 사실을 알고 나는 항상 main으로 먼저 바꾼다.



## Git flow

<br>

### Develop and Feature

- `main` 브랜치로 `develop`브랜치를 생성.

```terminal
(master)$ git checkout -b develop
(develop)$
```

- `develop`브랜치로 변경되었는데, 이제 `login`기능 개발을 위한 기능 브랜치를  생성해야한다.

```terminal
(develop)$ git checkout -b feature/login
(feature/login)$
```

- 로그인 기능을 개발할 브랜치. 기능을 개발하고 저장하자.

```terminal
(feature/login)$ git add .
(feature/login)$ git commit -m "로그인 기능 server, client 구현"
```

- 병합할 브랜치로 이동하여 병합을 진행해준다.

```terminal
(feature/login)$ git checkout develop
(develop)$ git merge feature/login
```

<br>

### Release  

- 기능을 개발 하였다면 테스트를 해야 하지 않겠는가 ! QA를 위한 `release` 브랜치를 생성 해보자.  

```terminal
(develop)$ git checkout -b release-1.1
(release-1.1)$
```

- 테스트를 완료하고 배포를 위한 `master` 브랜치로 이동하여, 병합하자.  

```terminal
(release-1.1)$ git checkout master
(master)$ git merge --no-ff release-1.1
(master)$ git tag -a 1.1
```

### Hotfix

- 배포전 오류가 발생했을시 `master`브랜치에서 분기하여, 오류수정후 `develop`과 `master`로 병합한다.  

```terminal
(master)$ git checkout -b hotfix-1.1.1 

(오류 수정 후)

(hotfix-1.1.1)$ git checkout master

(master)$ git merge --no-ff hotfix-1.1.1
(master)$ git tage -a 1.1.1
(master)$ git checkout develop

(develop)$ git merge --no-ff hotfix-1.2.1


```
