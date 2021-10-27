---
layout: post
title: "-Linux- /bin/bash^M: bad interpreter: 그런 파일이나 디렉터리가 없습니다."
categories: [Development,Linux]
tags: [Linux]
date: 2021-10-07 18:40:00 +0900
thumbnail: "/assets/img/bloging/linux/linux_logo.png"
excerpt_separator: <!--more-->
hide: false
---
Shell Script Error: /bin/bash^M: bad interpreter: 그런 파일이나 디렉터리가 없습니다

<!--more-->
리눅스에서 shell script파일 실행시 다음과 같은 오류가 발생한다.

```terminal
/bin/bash^M: bad interpreter: 그런 파일이나 디렉터리가 없습니다
```

위의 오류는 UNIX 기반과 WINDOWS 기반에서의 개행처리는 다르다. 그에대한 정보는 CR LF로 검색하면 알수 있으므로 쓰지 않는다.

## 원인 및 해결

```terminal
$ vi -b ./some_your_script.sh
```
`-b`옵션을 주어 바이너리 편집모드로 실행한다. 각 개행되는곳에 `^M` 이 붙어있는데 이걸 다 지워줘야 한다.
`:%s/^M$//g` 명령을 그냥 키보드로 치면 안되고 `^M` 부분을 `Ctrl + v + m`으로 자동 입력해야한다.

변경이되면 저장후 실행하면 정상 실행된다.
