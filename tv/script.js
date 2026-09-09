const messageElement =
    document.querySelector("#message");

const timeElement =
    document.querySelector("#current-time");

const screen =
    document.querySelector(".screen");


const messages = [

    "복도 끝에서 체육부 구령 소리가 희미하게 들려옵니다.",

    "교무실 쪽에서 의자 끄는 소리가 잠깐 들렸습니다.",

    "노을빛이 칠판 위로 조금 더 길게 번졌습니다.",

    "옆 반에서 청소를 마친 학생들의 목소리가 들려옵니다.",

    "운동장 쪽에서 공이 바닥에 튀는 소리가 들립니다.",

    "창밖 나뭇잎이 바람에 흔들리며 창문을 스쳤습니다.",

    "담임 선생님이 교실 안을 한번 들여다보고 지나가셨습니다.",

    "짝꿍이 체육복을 가지러 왔다가 초코바를 반 나눠주고 갔습니다.",

    "복도 불이 하나둘 켜지기 시작했습니다.",

    "급식실 쪽에서 마지막 정리를 하는 소리가 들려옵니다.",

    "교실이 조금 더 조용해졌습니다.",

    "멀리서 새들이 무리를 지어 날아가는 모습이 보입니다."

];


let previousIndex = -1;


/* =========================================
   현재 시간
========================================= */

function updateTime() {

    const now =
        new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    timeElement.textContent =
        `${hours}:${minutes}`;
}


updateTime();

setInterval(
    updateTime,
    1000
);


/* =========================================
   랜덤 메시지 선택
========================================= */

function getRandomMessage() {

    let newIndex;

    do {

        newIndex =
            Math.floor(
                Math.random() * messages.length
            );

    }
    while (
        newIndex === previousIndex
        && messages.length > 1
    );

    previousIndex =
        newIndex;

    return messages[newIndex];
}


/* =========================================
   메시지 변경
========================================= */

function changeMessage() {

    /*
        먼저 기존 문장을 살짝 사라지게 함
    */
    messageElement.classList.add("hide");


    setTimeout(() => {

        messageElement.textContent =
            getRandomMessage();

        /*
            CRT 화면이 아주 짧게 번쩍
        */
        screen.classList.remove("flash");

        void screen.offsetWidth;

        screen.classList.add("flash");


        /*
            새 문장 등장
        */
        messageElement.classList.remove("hide");

    }, 450);
}


/*
    테스트용:
    7초마다 새 상태메시지

    본판에서는 나중에
    5~10분 랜덤으로 변경할 예정.
*/
setInterval(
    changeMessage,
    7000
);
