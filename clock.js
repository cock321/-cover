const clockContainer = document.querySelector(".js_clock"),
      clockTitle = document.querySelector(".js_clock h1"),
      clockSubTitle = document.querySelector(".js_clock p");

function getTime(){
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText=`${
        hours < 10 ? `0${hours}` :  hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes 
    }:${
        seconds < 10 ? `0${seconds}` : seconds   // ? == if, : == else
    }`;
    clockSubTitle.innerText=`${year}. ${month+1}. ${day}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);  // 주기적 실행 함수
}

init();