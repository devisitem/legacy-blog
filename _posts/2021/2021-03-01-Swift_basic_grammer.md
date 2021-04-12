---
layout: post
title: -Swift- 기본 문법 (Summary Basic Swift)
categories: [Development,Swift]
tags: [Swift]
date: 2021-03-01 22:57:00 +0900
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/img/bloging/swift/swift_console.png"
---
 Swift 기본 문법
<!--more-->

## 기본 문법  
### 이름짓기 규칙  

Lower Camel Case : function, methods, variable, constant  
Upper Camel Case: type(class, struct, enum, extension …)  

lower**C**amel  
**U**pper**C**amel  

### 변수와 상수  

```
import UIKit


let age : Int = 10

"안녕하세요 ! 저는 \(age)살 입니다."
"안녕, 나는 \(age+10)살 이야 말놓을게"

print("저랑 \(age - 7)살 차이나네요")

print("\n####################\n")

class Person{
    var name : String = "Kimchi-dev"
    var age : Int = 10
}
let kimchiDev : Person = Person()

print(kimchiDev)

print("\n####################\n")

dump(kimchiDev)

//변수 선언
var variable : Int = 23
//상수 선언
let constant : Int = 212

//constant  = 20 Error Can't Initialize

```  
![Swift console]({{ "/assets/img/bloging/swift/swift_console.png" | relative_url }})  

### 기본 자료형  
```
//Bool Type
var someBool : Bool = true
//Integer Type
var someInt : Int = 100
//UInt Type
var someUInt : UInt = 100
//Float Type
var someFloat : Float = 3.14
//Double Type
var someDoulbe : Double = 3.14
//Character Type
var someCharacter : Character = "a"
//String Type
var someString : String = "문자열"
//Any Type
var someAny : Any = 100;
someAny = "문자열도 가능"

class SomeClass{}
var someAnyObject: AnyObject = SomeClass()
```  

### 컬렉션  
```
/**
Array - Orderd Collaction
Dictionary - Collaction like HashMap in Java
Set  - No Order, No overlap collaction
*/
var integers : Array<Int> = Array<Int>()
integers.append(100)
integers.append(120)
integers.contains(100)
integers.remove(at: 1)
integers.removeFirst()
integers.count

//Declare List more short 1
var doubles : Array<Double> = [Double]()
//Declare List more short 2
var Strings : Array<String> = []

//Constant List Can't append and remove
let immutableArray = [1,2,4]

//Declare Dictionary
var miniDictionary : Dictionary<String,Any> = [String : Any]()
miniDictionary["miniKey"] = "miniValue"
miniDictionary

miniDictionary.removeValue(forKey: "miniKey")
miniDictionary["miniKey"] = nil

//Declare Dictionary more short
let tinyDictionary : Dictionary<String,Any> = [:]

//Create Set
var miniSet : Set<Int> = Set<Int>()
miniSet.insert(2)
miniSet.contains(2)

miniSet.count

//there is no overlaped in Set
let duplicateSet : Set<Int> = [2,2,6,5,7,65]
duplicateSet.sorted()

let setA : Set<Int> = [1,3,5,4,4]
let setB : Set<Int> = [54,2,37,3,45]

let union : Set<Int> = setA.union(setB)
//Convert Set to List
let sortedUnion : [Int] = union.sorted()

//get duplicate value
let intersection : Set<Int> = setA.intersection(setB)
//Find values in setA that do not overlap with setB
let subtracting : Set<Int>  = setA.subtracting(setB)

```  
## 번외, Playground Shortcuts  
```
⌘ : command
⇧ : Shift
⌃ : control
↩ : return
⌥ : option

⇧ + return : 현재 행까지 실행
⌘ + ⇧ + return : 전체 실행
⌃ +  ↩ : 키보드 단축키 등록(Stop Playground)
⌃ + ‘+’ : 폰트 크게
⌃ + ‘-‘ : 폰트 작게
⌘ + ⌃ + ‘0’ : 폰트 기본사이즈
```
