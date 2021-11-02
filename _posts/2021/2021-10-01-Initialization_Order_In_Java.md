---
layout: post
title: -Java- Initialization Order (자바의 블럭)
categories: [Development,Java]
tags: [Spring,Java]
date: 2021-10-26 19::25 +0900
thumbnail: "/assets/img/bloging/java/java_logo.png"
excerpt_separator: <!--more-->
hide: false
---
Study for Java's Initialization Order.

<!--more-->

## Initialization Order in Java



### The Reason for writen to this article

I wondered to Initialization order, when I had use a Spring's @ConfigurationProperties annotation. Using static block, instance block, constructor, setter (Injection field).

as consequence, I realized Which order, following definition below .

| order | applicable block | Initialization time                                   |
| :---: | :--------------: | :---------------------------------------------------- |
|   1   |   static block   | before instance creation                              |
|   2   |  instance block  | between allocate to memory and before create instance |
|   3   |   constructor    | allocate to memory on heap                            |
|   4   |  setter method   | inject for field after instance creation in Spring    |

### Static Block

`static block` perform applicable codes that, writen to block before Class be allocated to method area (JVM). which so that available initializing filed without set to value. therefore, static block is meaning that status for no memory address. because, static block is perfomed before instance creation. so that can print static variable like following example.



```java
public class Kimchi {

    public static String name = "Korean Kimchi";

    static {
        System.out.println("Kimchi is traditional korean food. so always " + name);
        Systme.out.println("this : " + this) // compile error.
    }
}
```



The statis block can't print "this" because, current statuses that, instance doesn't allocated in jvm memory. because  exactly, allocated only  "name" variable in Method Area (Class Area) and literal in Constant Pool. So you can understand to JVM flow as following list.

1. Compile (`.java` -> `.class`)
2. Class Load (Class Loader loades byte code to method area)
3. Excute byte code. (As Execution Engine)

A static block can only be executed once, only the first time before create instance (allocate in memory).



### Instance Block

`instance block` perform applicable codes that, between create instance and excute constructor. so you can print "this" (instance) like following example.



```java
public class Main {
    public static void main(String [] args) throws Exception {
        Kimchi kimchi = new Kimchi();
    }
}

class Kimchi {

    public Kimchi(){
        System.out.println("I like traditional Korean's kimchi");
    }

    static {
        System.out.println("Kimchi is not chinese food.");
    }

    {
        System.out.println("I'm Kimchi Developer.");
    }

}
```



#### Instance Block Result

```
Kimchi is not chinese food.   
I'm Kimchi Developer.    
I like traditional Korean's kimchi
```



### Constructor & setter method



`constructor` perform applicable codes that, allocated memory in `HEAP`. So you can initialize feild at constructor like following example.



```java
public class Kimchi{

    private Source source;

    //must be
    public Kimchi(Source source){
        this.source = source;
    }

    //option
    public void setSource(Source source){
        this.source = source;
    }
}
```

There is a simple example with `constructor` and `setter`. **actually**, this example may only possible  in Spring. Spring works that, which inject fields with proxy patterns. Spring's Beans are managed by `IoC Container`. So Spring creating proxy object and  injecting fileds after figure out methods that start with set and first UpperCase method like codes decribed earlier.



## What We learned by reading this article



1. Kimchi is traditional korean's food. (very inportant)
2. Java's Initialization Order.
