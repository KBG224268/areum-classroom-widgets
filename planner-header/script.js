const dateElement =
    document.querySelector("#date");

const quoteElement =
    document.querySelector("#quote");


/* =========================================
   DATE
========================================= */

const now =
    new Date();


const year =
    now.getFullYear();


const month =
    String(
        now.getMonth() + 1
    ).padStart(2, "0");


const day =
    String(
        now.getDate()
    ).padStart(2, "0");


const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


const weekday =
    weekdays[
        now.getDay()
    ];


dateElement.textContent =
    `${year}. ${month}. ${day} · ${weekday}`;


/* =========================================
   DAILY QUOTES
========================================= */

const quotes = [

    "Small steps still move you forward.",

    "Stay a little longer.",

    "Quiet work adds up.",

    "Do what you can with this hour.",

    "Progress does not need to be loud.",

    "One page at a time.",

    "A calm day can still be productive.",

    "You only need to begin.",

    "Keep the light on a little longer.",

    "Today is enough for today.",

    "Slow progress is still progress.",

    "Finish what belongs to this evening."
];


/*
    날짜를 숫자로 바꿔서
    오늘은 항상 같은 명언을 고름.

    새로고침해도 안 바뀌고
    다음 날 자동으로 다른 문장.
*/

const dateKey =
    year * 10000
    + (now.getMonth() + 1) * 100
    + now.getDate();


const quoteIndex =
    dateKey % quotes.length;


quoteElement.textContent =
    `“${quotes[quoteIndex]}”`;