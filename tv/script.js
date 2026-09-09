const eventLog =
    document.querySelector("#event-log");

const timeElement =
    document.querySelector("#current-time");

const screen =
    document.querySelector(".screen");


/* =========================================
   EVENT POOL
========================================= */

const events = [

    "복도에서 운동부 구령 소리가 희미하게 들립니다.",

    "교무실 쪽에서 의자 끄는 소리가 들렸습니다.",

    "노을빛이 칠판 위로 조금 더 길게 번집니다.",

    "옆 반 학생들이 청소를 마치고 나갔습니다.",

    "운동장에서 공이 바닥에 튀는 소리가 들립니다.",

    "창밖 나뭇잎이 창문을 가볍게 스쳤습니다.",

    "담임 선생님이 교실 앞을 지나가셨습니다.",

    "짝꿍이 체육복을 가지러 잠시 교실에 들어왔습니다.",

    "복도 불이 하나 켜졌습니다.",

    "급식실 쪽에서 마지막 정리 소리가 들려옵니다.",

    "교실이 조금 더 조용해졌습니다.",

    "창밖으로 새들이 무리를 지어 지나갑니다.",

    "운동장에 남아 있던 학생들이 하나둘 돌아갑니다.",

    "복도 끝 교실의 불이 꺼졌습니다."

];


let previousIndex = -1;


/* =========================================
   CLOCK
========================================= */

function getCurrentTime() {

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}


function updateTime() {

    timeElement.textContent =
        getCurrentTime();
}


updateTime();

setInterval(
    updateTime,
    1000
);


/* =========================================
   RANDOM EVENT
========================================= */

function getRandomEvent() {

    let index;

    do {

        index =
            Math.floor(
                Math.random() * events.length
            );

    }
    while (
        index === previousIndex
        && events.length > 1
    );

    previousIndex =
        index;

    return events[index];
}


/* =========================================
   ADD LOG
========================================= */

function addLog() {

    const line =
        document.createElement("div");

    line.className =
        "log-line log-enter";


    const time =
        document.createElement("span");

    time.className =
        "log-time";

    time.textContent =
        getCurrentTime();


    const text =
        document.createElement("span");

    text.className =
        "log-text";

    text.textContent =
        getRandomEvent();


    line.appendChild(time);
    line.appendChild(text);

    eventLog.appendChild(line);


    /*
        최대 5줄만 유지
    */
    while (
        eventLog.children.length > 5
    ) {

        eventLog.removeChild(
            eventLog.firstElementChild
        );
    }


    /*
        DOM에 삽입된 직후
        등장 애니메이션
    */
    requestAnimationFrame(() => {

        line.classList.remove(
            "log-enter"
        );

        line.classList.add(
            "log-visible"
        );

    });


    /*
        가끔 TV가 아주 미세하게 반응
    */
    if (Math.random() < 0.35) {

        screen.classList.remove(
            "flash"
        );

        void screen.offsetWidth;

        screen.classList.add(
            "flash"
        );

    }
}


/*
    TEST MODE

    지금은 확인하기 위해 6초.
*/
setInterval(
    addLog,
    6000
);
