const form = document.querySelector(".js_form"),
    input = document.querySelector(".js_form input"),
    greetings = document.querySelector(".js_greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// 유저의 정보를 저장하는 함수 saveName
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

// 새로고침을 막는 함수 handleSubmit
function handleSubmit (event){
    event.preventDefault();
    
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

/* 유저에게 정보를 요청하는 함수 askForName 만들기 
유저의 정보가 없으면 What is your name?을 묻는 
form태그가 보이도록 작동한다*/
function askForName () {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

/* 인사하는 함수 paintGreetings 만들기
유저가 정보를 입력하면, form태그는 바로 사라지고
Hello 이름 인사가 떠오르도록 작동한다. */
function paintGreeting(name) {
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerText = `Hello ${name}`;
}

// localStorage : 유저의 컴퓨터에 정보를 담아두는 저장고
// localStorage에서 정보를 가져오는 함수 loadName 만들기
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);

    /* localStorage에 currentUser의 정보가 없을 때
    --> 유저에게 정보를 요청하는 함수 askForName 호출 */
    if(currentUser === null){
        askForName(currentUser);
    }
    /* localStorage에 currentUser의 정보가 있을 때 
    --> 유저에게 인사하는 함수 paintGreetings 호출 */
     else {
        paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}
init();