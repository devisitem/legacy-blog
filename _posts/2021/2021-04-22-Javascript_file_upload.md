---
layout: post
title: -JavaScript- Drag and Drop  (드래그 앤드 드롭)
categories: [Development,JavaScript]
tags: [드래그 앤 드롭,Drag And Drop,파일 업로드]
date: 2021-04-22 14:17:00 +0900
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/img/bloging/javascript/javascript.png"
---

자바스크립트 드래그 앤드롭을 사용해보자.

<!--more-->

![Drag and Drop]({{ "/assets/img/bloging/javascript/file_upload.gif"}})


## File drag and drop

`HTML`의 Drag and Drop `interface`는 웹페이지에서 파일을 드레그앤 드롭 할 수 있게 합니다. 이 문서는 파일매니저 ( mac 은 finder ,window는 file explorer ) 에서 끌어 웹페이지에 Drop 된 하나 또는 그이상의 파일을 `application`이 허용하는 방법을 설명합니다.

*[원문](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop)

드래그앤드롭을 사용하려면 먼저 `drop zone `(drag and drop 이 일어나는 element)을 정의하고 `drop`,`dragover` 이벤트 핸들러를 정의 해야합니다.

<br>

### drop zone 정의

해당 요소(drop zone)의  `drop` 이벤트를 활성화 하려면 `ondrop`글로벌 이벤트 핸들러를 사용해야합니다.

```html
<div class="main-container">
        <h2>파일 입/출력 테스트</h2>
        <div class="sub-container" id="drop_zone" ondrop="dropHandler(event)">
    </div>
            <span>이곳에 파일을 올려주세요.</span>
        </div>
    </div>
```

drop 이벤트를 사용하려면  먼저 해당영역이 드래그된 파일이 올라갈수 있는 영역인지 정의해줘야 합니다.  `dragover` 이벤트 핸들러를  `ondragover`  글로벌 이벤트 핸들러를 통해 포함시켜 브라우저의 drag 기본동작을 재정의 합니다. [`dragover`](https://developer.mozilla.org/en-US/docs/Web/API/Document/dragover_event) 는 매 100ms마다 드래그 된 커서가 요소 위에있는지 체킹 합니다.

```html
<div class="main-container">
        <h2>파일 입/출력 테스트</h2>
        <div class="sub-container" id="drop_zone" ondrop="dropHandler(event)"
             ondragover="dragOverHandler(event)" ondragenter="dragEnterHandler(event)"
             ondragleave="dragLeaveHandler(event)">
            <span>이곳에 파일을 올려주세요.</span>
        </div>
    </div>
```

### Handler Event

필요한 이벤트를 재정의 하여 사용할 수 있습니다.

```javascript
//drag 항목을 drop 했을 때 동작하는 이벤트 입니다.
const dropHandler = e => {
    $('.sub-container').removeClass('dragged')
    console.log('File(s) dropped')

    //기본동작 막기 (파일열림 방지)
    e.preventDefault()
    //파일을 허용할수있는 dataTransfer 인터페이스 사용
    let items = e.dataTransfer.items
    if(items){
        for(var i = 0; i < items.length;i++){
            if(items[i].kind === 'file'){
                var file = items[i].getAsFile()

                console.log('... file['+ i +'].name = ' + file.name)
                console.log('... file['+ i +'].size = ' + file.size + ' B')
                console.log('... file['+ i +'].type = ' + file.type)
                console.log('... file['+ i +'].lastModifiedDate = ' + file.lastModifiedDate)
                console.log('... file['+ i +'].webkitRelativePath = ' + file.webkitRelativePath)
                console.log('... file['+ i +'].lastModified = ' + file.lastModified)
            }
        }
    } else {
        for(var i = 0; i < e.dataTransfer.files.length; i++) {
            cnosole.log('file['+ i + '].name = '+ e.dataTransfer.files[i].name)
        }
    }
}
//drag중인 커서가 요소 위에 있을 때 100ms 마다 동작합니다.
const dragOverHandler = e => {
    console.log('File(s) in drop zone')
    //기본 dragover 의 동작을 막아야 해당 element 위에서 drop을 위한 drag가 가능하다.
    e.preventDefault()

}
//drag 중인 커서가 요소로 들어왔을때 동작합니다.
const dragEnterHandler = e => {
    console.log('drag entered')
    $('.sub-container').addClass('dragged')
    e.preventDefault()
}
//drag된 커서가 요소 범위 밖으로 나갔을 때 동작합니다.
const dragLeaveHandler = e => {
    console.log('drag end')
    $('.sub-container').removeClass('dragged')
}
```
### Etc
```css
.main-container{
    background: #f7f7f7;
    margin: 20px auto;
    width: 80%;
    height: 600px;
    text-align: center;
}

.sub-container{
    height: 80%;
    width: 40%;
    transition: .4s;
    border-radius: 30px;
    display: block;
    border: 3px solid #A4A4A4;
    display: inline-block;
}

.sub-container span{
    font-size: 2em;
    color: #a1a1a1;
    margin: 220px 20px;
    display: inline-block;
}

.dropped-file-info{
    display: inline-block;
}

.dropped-file-info table{
    border: 2px solid gray;
}

.dragged {
    background: #cfcfcf;
    transition: .4s;
}
```
