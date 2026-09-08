const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondHand = document.querySelector(".second-hand");

function updateClock() {

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const secondDegree =
        seconds * 6;

    const minuteDegree =
        minutes * 6
        + seconds * 0.1;

    const hourDegree =
        (hours % 12) * 30
        + minutes * 0.5
        + seconds / 120;

    secondHand.style.transform =
        `translateX(-50%) rotate(${secondDegree}deg)`;

    minuteHand.style.transform =
        `translateX(-50%) rotate(${minuteDegree}deg)`;

    hourHand.style.transform =
        `translateX(-50%) rotate(${hourDegree}deg)`;
}

updateClock();

setInterval(updateClock, 1000);