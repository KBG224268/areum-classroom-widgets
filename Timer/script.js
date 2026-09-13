/* =========================================
   AREUM STUDY TIMER
   Version 2
========================================= */

const digits =
    document.querySelector("#digits");

const modeDisplay =
    document.querySelector("#mode-display");

const lcd =
    document.querySelector(".lcd");


const hourButton =
    document.querySelector("#hour-button");

const minuteButton =
    document.querySelector("#minute-button");

const secondButton =
    document.querySelector("#second-button");

const modeButton =
    document.querySelector("#mode-button");

const clearButton =
    document.querySelector("#clear-button");

const startButton =
    document.querySelector("#start-button");


/* =========================================
   SETTINGS
========================================= */

/*
    v1에 저장된 테스트 데이터와 분리.
    처음 실행하면 반드시 기본 50분부터 시작.
*/
const STORAGE_KEY =
    "areum-study-timer-v2";


const DEFAULT_SECONDS =
    50 * 60;


const MAX_SECONDS =
    99 * 60 * 60
    + 59 * 60
    + 59;


/* =========================================
   STATE
========================================= */

let state = {

    mode:
        "down",

    presetSeconds:
        DEFAULT_SECONDS,

    remainingSeconds:
        DEFAULT_SECONDS,

    elapsedSeconds:
        0,

    running:
        false,

    targetTime:
        null,

    startedAt:
        null
};


/* =========================================
   STORAGE
========================================= */

function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}


function loadState() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!saved) {
        return;
    }


    try {

        const parsed =
            JSON.parse(saved);


        state = {
            ...state,
            ...parsed
        };

    }
    catch (error) {

        localStorage.removeItem(
            STORAGE_KEY
        );

    }
}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(totalSeconds) {

    totalSeconds =
        Math.max(
            0,
            Math.floor(totalSeconds)
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600)
            / 60
        );


    const seconds =
        totalSeconds % 60;


    return (
        String(hours).padStart(2, "0")
        + ":"
        + String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0")
    );
}


/* =========================================
   GET CURRENT TIMER VALUE
========================================= */

function getCurrentSeconds() {

    /* COUNT DOWN */

    if (
        state.mode === "down"
    ) {

        if (!state.running) {

            return state.remainingSeconds;
        }


        const difference =
            Math.ceil(
                (
                    state.targetTime
                    - Date.now()
                )
                / 1000
            );


        return Math.max(
            0,
            difference
        );
    }


    /* COUNT UP */

    if (!state.running) {

        return state.elapsedSeconds;
    }


    const difference =
        Math.floor(
            (
                Date.now()
                - state.startedAt
            )
            / 1000
        );


    return Math.max(
        0,
        difference
    );
}


/* =========================================
   UPDATE DISPLAY
========================================= */

function updateDisplay() {

    const value =
        getCurrentSeconds();


    digits.textContent =
        formatTime(value);


    modeDisplay.textContent =
        state.mode === "down"
            ? "COUNT DOWN"
            : "COUNT UP";


    /*
        카운트 중에는 시간 설정 버튼 잠금.
        COUNT UP에서도 시간 설정은 불필요하므로 잠금.
    */

    const lockSetting =
        state.running
        || state.mode === "up";


    hourButton.disabled =
        lockSetting;

    minuteButton.disabled =
        lockSetting;

    secondButton.disabled =
        lockSetting;


    modeButton.disabled =
        state.running;
}


/* =========================================
   ADD TIME
========================================= */

function addSeconds(amount) {

    if (
        state.running
        || state.mode !== "down"
    ) {

        return;
    }


    state.presetSeconds =
        Math.min(
            MAX_SECONDS,
            state.presetSeconds
            + amount
        );


    state.remainingSeconds =
        state.presetSeconds;


    lcd.classList.remove(
        "finished"
    );


    saveState();

    updateDisplay();
}


/* =========================================
   START / STOP
========================================= */

function toggleTimer() {

    lcd.classList.remove(
        "finished"
    );


    /* -------------------------
       STOP
    ------------------------- */

    if (state.running) {

        if (
            state.mode === "down"
        ) {

            state.remainingSeconds =
                getCurrentSeconds();

            state.targetTime =
                null;
        }

        else {

            state.elapsedSeconds =
                getCurrentSeconds();

            state.startedAt =
                null;
        }


        state.running =
            false;


        saveState();

        updateDisplay();

        return;
    }


    /* -------------------------
       START
    ------------------------- */

    if (
        state.mode === "down"
    ) {

        /*
            0초에서 START를 누르면
            기본 50분으로 다시 시작.
        */

        if (
            state.remainingSeconds <= 0
        ) {

            state.presetSeconds =
                DEFAULT_SECONDS;

            state.remainingSeconds =
                DEFAULT_SECONDS;
        }


        state.targetTime =
            Date.now()
            + state.remainingSeconds * 1000;

    }

    else {

        state.startedAt =
            Date.now()
            - state.elapsedSeconds * 1000;

    }


    state.running =
        true;


    saveState();

    updateDisplay();
}


/* =========================================
   CLEAR

   무조건 기본 상태로 돌아간다.
========================================= */

function clearTimer() {

    state.running =
        false;

    state.targetTime =
        null;

    state.startedAt =
        null;


    lcd.classList.remove(
        "finished"
    );


    if (
        state.mode === "down"
    ) {

        /*
            사용자가 몇 시간을 추가했든
            CLEAR = 00:50:00
        */

        state.presetSeconds =
            DEFAULT_SECONDS;

        state.remainingSeconds =
            DEFAULT_SECONDS;

    }

    else {

        /*
            COUNT UP에서는 0으로 초기화.
        */

        state.elapsedSeconds =
            0;

    }


    saveState();

    updateDisplay();
}


/* =========================================
   MODE
========================================= */

function toggleMode() {

    if (state.running) {
        return;
    }


    lcd.classList.remove(
        "finished"
    );


    if (
        state.mode === "down"
    ) {

        state.mode =
            "up";

        state.elapsedSeconds =
            0;

    }

    else {

        state.mode =
            "down";

        /*
            다시 COUNT DOWN으로 돌아오면
            기본 50분.
        */

        state.presetSeconds =
            DEFAULT_SECONDS;

        state.remainingSeconds =
            DEFAULT_SECONDS;

    }


    saveState();

    updateDisplay();
}


/* =========================================
   COUNTDOWN FINISH
========================================= */

function finishCountdown() {

    state.running =
        false;

    state.remainingSeconds =
        0;

    state.targetTime =
        null;


    saveState();


    lcd.classList.remove(
        "finished"
    );


    /*
        애니메이션 재실행을 위한 reflow
    */

    void lcd.offsetWidth;


    lcd.classList.add(
        "finished"
    );


    updateDisplay();
}


/* =========================================
   TIMER TICK
========================================= */

function tick() {

    if (!state.running) {

        updateDisplay();

        return;
    }


    if (
        state.mode === "down"
    ) {

        const remaining =
            getCurrentSeconds();


        if (
            remaining <= 0
        ) {

            finishCountdown();

            return;
        }

    }


    updateDisplay();
}


/* =========================================
   REFRESH RECOVERY
========================================= */

function recoverTimer() {

    if (!state.running) {
        return;
    }


    if (
        state.mode === "down"
    ) {

        const remaining =
            getCurrentSeconds();


        if (
            remaining <= 0
        ) {

            finishCountdown();

        }

    }
}


/* =========================================
   BUTTON EVENTS
========================================= */

hourButton.addEventListener(
    "click",
    () => addSeconds(3600)
);


minuteButton.addEventListener(
    "click",
    () => addSeconds(60)
);


secondButton.addEventListener(
    "click",
    () => addSeconds(1)
);


modeButton.addEventListener(
    "click",
    toggleMode
);


clearButton.addEventListener(
    "click",
    clearTimer
);


startButton.addEventListener(
    "click",
    toggleTimer
);


/* =========================================
   INIT
========================================= */

loadState();

recoverTimer();

updateDisplay();


setInterval(
    tick,
    250
);