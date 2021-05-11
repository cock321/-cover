const toDoForm = document.querySelector(".js_toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList=document.querySelector(".js_toDoList");

const TODOS_LS="toDos";

let toDos = [];


// toDo를 삭제하는 함수 deleteToDo 
function deleteToDo(event){
    const btn = event.target;  // target --> 이벤트의 대상을 알 수 있음( button 태그 )
    const li = btn.parentNode  // parentNode --> 부모태그 ( button태그의 부모: li태그 )
    // li 태그의 자식 삭제
    toDoList.removeChild(li);  // 부모.removeChild(자식); --> 자식태그 지우기
    // localStorage에 저장되어있는 toDo를 지움
    const cleanToDos = toDos.filter(function(toDo){  //https://aljjabaegi.tistory.com/312
        return toDo.id !== Number(li.id);    // parselnt  https://jamong-icetea.tistory.com/14
    });  
    toDos = cleanToDos;
    savetoDos();
}

// localStorage에 todo를 저장하는 함수 savetoDos
function savetoDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // JSON.stringify(): 문자형 변환
}

function paintToDo(text){
    const li = document.createElement("li");  // li태그 생성
    const delBtn = document.createElement("button");  // button 태그 생성
    const span = document.createElement("span");  // span 태그 생성
    const newId = toDos.length + 1;  // newId --> 배열 toDos의 요소 개수

    delBtn.innerText = "✖";
    // 1. 유저가 x버튼을 클릭하면, deleteToDo함수가 실행된다 
    delBtn.addEventListener("click", deleteToDo);
    span.innerText=text;

    li.appendChild(span);   
    li.appendChild(delBtn);
    // li태그에 id=newId 부여하기
    li.id = newId;
    toDoList.appendChild(li);

    // 배열 toDos의 요소가 되는 (객체) toDoObj
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    savetoDos();
}

function handleSubmit(event){
    event.preventDefault();   // 새로고침 방지

    const currentValue = toDoInput.value;
    paintToDo(currentValue);        // 유저의 todo를 입력한다.
    toDoInput.value="";             // input의 value를 없앤다.
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if ( loadedToDos !== null ) {
        const parsedToDos = JSON.parse(loadedToDos);  // JSON.parse(): 객체 형변환
        // localStorage에 toDo가 있을 때, 화면상에 떠오르도록 html에 작성
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });   // forEach(함수): 배열 toDos의 각각 요소마다 함수를 실행함 
    }
}



function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

