---
layout: post
title: -JavaScript- 선택자 입력태그 제어 (JQuery)
categories: [Development,JavaScript]
tags: [JavaScript]
date: 2021-01-28 16:18:00 +0900
excerpt_separator: <!--more-->
hide: false
---
 체크박스,라디오 제어  
<!--more-->  

## Radio
```
name 및 value로 체크
$("input:radio[name='selectAges']:input[value='"+찾을 값이름+"']").prop("checked",true)

체크된값 가져오기
$("input:radio[name='selectAges']:checked").val();
```

## CheckBox
```
체크값 가져오기

	var serviceString = new Array();

	$("input:checkbox[name='service_option_name']").each(function(){
		if($(this).is(":checked")){
			serviceString.push($(this).val());
		}
	});


```
