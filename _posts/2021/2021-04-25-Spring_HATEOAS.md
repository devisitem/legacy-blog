---
layout: post
title: -Spring- HATEOAS (스프링 헤이테오스)
categories: [Development,Spring]
tags: [Spring,HATEOAS,스프링 헤이테오스,JsonUnwrapped]
date: 2021-04-25 17:54:00 +0900
thumbnail: "/assets/img/bloging/spring/spring_hateoas_log.png"
excerpt_separator: <!--more-->
hide: false
#thumbnail: "/assets/img/bloging/git/git_thumnail.png"
---

Spring HATEOAS 에대해배우고 Restful 한 API를 만들어 보자

<!--more-->
## HATEOAS 란?  
**H**ypermedia **A**s **T**he **E**ngine **O**f **A**pplication **S**tate  
응용프로그램 상태의 Hypermedia로서 전이 시키는 것 입니다. 예를 들어 `POST /api/user/A`처럼 A라는 유저를 생성하라는 요청을 보냈는데 `A`라는 유저가 이미 있는 유저라면 응답으로서 그 유저를 조회하는방법 또는 현재 상태를 전이할 수있는 `URL`을 보낼 수 있습니다.

##  HATEOAS한 전이를 만든다면?

좀 더, `REST`한 아키텍쳐를 위해 `HATEOAS` 를 통하여  상태를 전이 해야한다. 간단히 API로 제어하는 게시판이 있다는 가정을 한다면, `POST /api/board` 이라는 요청으로 글을 생성 할 수 있을 것이다.  그렇다면 이요청이 성공적으로 받아들여저 글을 생성하고 응답으로는 생성된 글의 정보를 어플리케이션의 상태로 전이 할수 있어야 한다.

```json
{
  "...": "other response...",

  "_links": {
  	"self": {//작성자는 조회가 가능해야하므로 조회 GET URL을 전이
      "href": "http://localhost/api/board/1"
    },
    "update_board": {//작성자는 수정이 가능하므로 PUT URL을 전이
      "href": "http://localhost/api/board/1"
    },
    "users_board": {//작성자는 본인의 글목록을 조회할 수 있으므로 GET URL을 전이
      "href": "http://localhost/api/board"
    }
	}
}
```

위처럼 글하나만 작성하는 API를 호출 하더라도 어플리케이션의 상태를 전이 받을수 있다. `Spring HATEOAS` 에서 제공해주는 두가지 전이의 방법을 사용해보자.

<br>



---

<br>

### RepresentationModel (ResourceSuppost < 1.1.1)



![hateoas-1.1.1]({{"/assets/img/bloging/spring/spring_hateoas.1.1.1.png" | relative_url }})

이 객체는`1.1.1` 버전부터 이름이 변경 되어 현재의 이름으로 `Spring HATEOAS` 에서 제공해준다. 먼저 전달할 객체를 이용해 전이할 `BoardResource` 를 생성한다.

```java
public class BoardResource extends RepresentationModel{

  private Board board;

  public BoardResource(Board board) {
    this.board = board;
  }

  public Board getBoard(){
    return board;
  }
}
```

전이를 생성할 객체를 `Controller` 에서 추가한다.

```java
@RestController
@RequestMapping("/api/board",produces = MediaTypes.HAL_JSON_VALUE)//HATEOAS	전이를 위한 hal+json
@RequiredArgsConstructor
public class BoardController {

  	private final BoardRepository boardRepository;
  	private final ModelMapper modelmapper;

  	@PostMapping
		public ResponseEntity createBoard(@RequestBody @Valid BoardDto board,Errors erros) throws Exception{
      	Board board = ModelMapper.map(eventDto, Board.class); //ModelMapper를 통한 converting
      	Board newBoard = boardRepository.save(board); // 영속화

      	//selfLinkBuiler == new Link("http://localhost/api/board/1");
        WebMvcLinkBuilder selfLinkBuilder = linkTo(BoardController.class).slash(newBoard.getId());
      	URI createURI = selfLinkBuilder.toUri();

      	BoardResource boardResource = new BoardResource(board);
      	boardResource.add(linkTo(BoardController.class).withRel("users_board")); // = http://localhost/api/board
      	boardResource.add(selfLinkBuilder.withSelfRel());  // = http://localhost/api/board/1
      	boardResource.add(selfLinkBuilder.withRel("update_board")); // = http://localhost/api/board/1

      	return ResponseEntity.created(createURI).body(boardResource);

    }
}
```

위 방법인 `RepresentationModel` 을 이용할 수도 있고 다른 방법으로는 `EntityModel ` 을 이용할 수 있습니다.

<br>



---

<br>

### EntityModel

```java
@RestController
@RequestMapping("/api/board",produces = MediaTypes.HAL_JSON_VALUE)//HATEOAS	전이를 위한 hal+json
@RequiredArgsConstructor
public class BoardController {

  	private final BoardRepository boardRepository;
  	private final ModelMapper modelmapper;

  	@PostMapping
		public ResponseEntity createBoard(@RequestBody @Valid BoardDto board,Errors erros) throws Exception{
      	Board board = ModelMapper.map(eventDto, Board.class); //ModelMapper를 통한 converting
      	Board newBoard = boardRepository.save(board); // 영속화

      	//selfLinkBuiler == new Link("http://localhost/api/board/1");
        WebMvcLinkBuilder selfLinkBuilder = linkTo(BoardController.class).slash(newBoard.getId());
      	URI createURI = selfLinkBuilder.toUri();


        //Usage for EntityModel
        EntityModel boardResource = EntityModel.of(board);
        boardResource.add(linkTo(BoardController.class).slash(board.getId()).withSelfRel());
        boardResource.add(linkTo(BoardController.class).withRel("users-board"));
        boardResource.add(selfLinkBuilder.withRel("update-board"));
        return ResponseEntity.created(createUri).body(boardResource);

    }
}
```

<br>



---

<br>

이 처럼 `HATEOAS` 를 통하여 어플리케이션의 상태를 전이하는 방법을 사용하였다. 마지막으로 응답의 객체명을 제외하는법.

### @JsonUnwrapped

```java
public class BoardResource extends RepresentationModel {

    @JsonUnwrapped
    private Board board;

    public BoardResource(Event event) {
        this.event = event;
    }

    public Board getBoard() {
        return board;
    }

}
```



```json
//사용전
{
 	"board": {
    "id": 1,
    "title": "특급! Jenkins의 모든것!",
    "author": "Jenkinser",
		_links: {
      "users_board":{
        "href": "http://localhost/api/board"
      },
      "self": {
        "href": "http://localhost/api/board/1"
      },
      "update_board": {
        "href": "http://localhost/api/board/1"
      }
    }
  }
}
//사용후
{
    "id": 1,
    "title": "특급! Jenkins의 모든것!",
    "author": "Jenkinser",
		_links: {
      "users_board":{
        "href": "http://localhost/api/board"
      },
      "self": {
        "href": "http://localhost/api/board/1"
      },
      "update_board": {
        "href": "http://localhost/api/board/1"
      }
   }
}
```
