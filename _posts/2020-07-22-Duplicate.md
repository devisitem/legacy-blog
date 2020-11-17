---
layout: post
title: -Oracle- 컬럼 중복 확인 (Duplication Check)
tags: [SQL,Queries,Orcle,Duplication check]
excerpt_separator: <!--more-->
---

중복된 데이터를 찾을 때 사용할수있는 중요한팁 !

<!--more-->

```sql
WITH PERSON AS(
SELECT 'D0010' AS CODE,'김천재' AS NAME, TO_DATE('1990/08/09')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0012' AS CODE,'코딩왕' AS NAME, TO_DATE('1992/09/04')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0011' AS CODE,'편집왕' AS NAME, TO_DATE('1999/04/02')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0010' AS CODE,'설계왕' AS NAME, TO_DATE('1983/02/13')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0013' AS CODE,'김천재' AS NAME, TO_DATE('1989/05/22')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0014' AS CODE,'보안관' AS NAME, TO_DATE('2001/11/17')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0015' AS CODE,'날벼락' AS NAME, TO_DATE('1992/04/01')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0016' AS CODE,'디비꾼' AS NAME, TO_DATE('1996/06/30')AS BIRTH FROM DUAL 
UNION ALL
SELECT 'D0017' AS CODE,'고질라' AS NAME, TO_DATE('2004/03/27')AS BIRTH FROM DUAL 
)
SELECT *  FROM PERSON;

```
  
  
  
먼저 위코드처럼 테스트할 임시테이블을 만들어줍니다.
  
  
  
  
![중복 체크용 테이블 전체 조회 이미지]({{ "/assets/img/pexels/dupcheck1.png" | relative_url }})
  
  
쿼리를 바로 조회하면 해당 이미지처럼 전체 조회가 가능합니다.

  
  
위의 데이타는 code 컬럼에 중복이있습니다.
  
바로 가시죠
  
```sql
SELECT CODE,COUNT(*) AS DUPCHK FROM PERSON GROUP BY CODE HAVING COUNT(*) > 1;

```
  
  위의 코드를 실행하면 같은 CODE를 가진 사람을 중복 확인 할수있습니다.
  
![테이블 중복확인 조회 이미지]({{ "/assets/img/pexels/dupcheck2.png" | relative_url }})
  
임시테이블 선언은 제외하고 필요 쿼리만 보겠습니다. 

이렇게 이해하시면 편합니다.


코드를 보면 바로 이해가시겠지만...TMI 를 필요로 하는분들도 있기에
    
중복을 체크할 COLUMN을 GROUPING  해준후 그 카운트가 1보다크다면 CODE명이 같은게 한개 이상이라는 거겠죠?
  