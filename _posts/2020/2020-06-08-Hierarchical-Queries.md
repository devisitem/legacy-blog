---
layout: post
title: -Oracle- 계층구조 쿼리(Hierarchical Queries)
categories: [Development,Oracle]
tags: [SQL,Oracle]
excerpt_separator: <!--more-->
hide: false
---

오라클내 계층형구조 (주로 조직도, 메뉴 등) 로 표현해야하는 기능들을 사용 해야한다.
계층 구조를 표현 할 수 있는 쿼리의 간단한 예제.

<!--more-->

```sql

SELECT *
    FROM SCOTT.EMP;

```
먼저 기존의 테이블 구조를 확인하기위해 전체 조회
![SelectAllEMPTable]({{ "/assets/img/bloging/sql/emptable.jpg" | relative_url }})

다음은 7900번의 EMPNO를가지고 있는  JAMES 를기준으로 MGR(직속상관의 EMPNO) 과 다른사원의 EMPNO를 매칭 시킨뒤 계층형으로 나눈다.

```sql

SELECT
    EMPNO,
    ENAME,
    MGR
FROM
    (
        SELECT
            level lvl,
            EMPNO,
            ENAME,
            MGR
        FROM
            SCOTT.EMP
        START WITH
            EMPNO = 7900
        CONNECT BY
            PRIOR MGR = EMPNO
        ORDER SIBLINGS BY
            EMPNO
    )
ORDER BY
    lvl DESC  
    ;

```

JAMES를 기준으로 JAMES의 MGR 을 EMPNO로 가진 사원은 다음 level로 올가가서 조회 된다 이과정을반복하여 최고 직속상관 까지 조회 할수있다.

SIBLINGS BY 는 특정 컬럼에대한 정렬 인데 (자세한 설명은 아래) 여기선 굳이 안써도 된다.


![직속상관 계층 조회]({{ "/assets/img/bloging/sql/orderByEmp7900.jpg" | relative_url }})


```sql
SELECT
   LPAD(' ',2*(LEVEL-1)) || ENAME as Organization_chart,
    EMPNO,
    MGR,
    JOB,
    LEVEL
    FROM SCOTT.EMP
    START WITH MGR IS NULL
    CONNECT BY PRIOR EMPNO = MGR;

```
이번엔 모든 조직도를 확인할수있도록 전체 조회를 해보자

![모든 계층 조회]({{ "/assets/img/bloging/sql/selectAllhierarchical.jpg" | relative_url }})

```sql

SELECT
   LPAD(' ',2*(LEVEL-1)) || ENAME Organization_chart,
    EMPNO,
    MGR,
    JOB,
    LEVEL
    FROM SCOTT.EMP
    START WITH MGR IS NULL
    CONNECT BY PRIOR EMPNO = MGR
    ORDER SIBLINGS BY ENAME;

```

 앞으로 자주 등장 하겠지만 본인은 개발을 할때 예약어를 보며 그 기능을 유추한다.

 SIBLINGS란 단어는 형제의,자매의를 주로 의미한다.

 ORDER 절을 보면 ENAME으로 정렬을 하는데 같은 형제를 의미하는 같은 레벨인 것들 중 ENAME의 알파벳 순서로  ORDERLING을 한다.

 ORDER 절 자체는 ASC 가 Default 이므로 반대를 원하면 Desc 를 붙여주면 된다.





![SelectAllEMPTable]({{ "/assets/img/bloging/sql/Organization_chart.jpg" | relative_url }})




시각화를 위해 [LPAD](/posts/LPAD.html) 사용 하여 조회
