// =========================
// EVENT ADATOK
// =========================

const eventData = {

    name: "Desert Predator",

    description:
        "War Thunder event követő",

    maxPoints: 10000,

    reward:
        "AMV (BMP-3)",

    endDate:
        new Date("2026-10-19T13:00:00+02:00")

};


// =========================
// VÁLTOZÓK
// =========================

let currentPoints =
    Number(localStorage.getItem("wt_points")) || 0;


// =========================
// EVENT BETÖLTÉSE
// =========================

document.getElementById("eventName")
    .textContent = eventData.name;

document.getElementById("eventDescription")
    .textContent = eventData.description;

document.getElementById("reward")
    .textContent = eventData.reward;


// =========================
// HALADÁS
// =========================

function updateProgress() {

    if (currentPoints < 0) {
        currentPoints = 0;
    }

    if (currentPoints > eventData.maxPoints) {
        currentPoints = eventData.maxPoints;
    }

    const percentage =
        (currentPoints / eventData.maxPoints) * 100;

    document.getElementById("progressBar")
        .style.width = percentage + "%";

    document.getElementById("progressText")
        .textContent =
        Math.round(percentage) + "%";

    document.getElementById("points")
        .textContent =
        currentPoints +
        " / " +
        eventData.maxPoints;

    localStorage.setItem(
        "wt_points",
        currentPoints
    );
}


// =========================
// PONT HOZZÁADÁSA
// =========================

function addPoints() {

    const input =
        document.getElementById("pointsInput");

    const value =
        Number(input.value);

    if (value <= 0) {
        return;
    }

    currentPoints += value;

    input.value = "";

    updateProgress();
}


// =========================
// VISSZASZÁMLÁLÓ
// =========================

function updateTimer() {

    const now = new Date();

    const difference =
        eventData.endDate - now;

    if (difference <= 0) {

        document.getElementById("timer")
            .textContent = "EVENT VÉGE";

        return;
    }

    const days =
        Math.floor(
            difference / 86400000
        );

    const hours =
        Math.floor(
            (difference % 86400000) /
            3600000
        );

    const minutes =
        Math.floor(
            (difference % 3600000) /
            60000
        );

    const seconds =
        Math.floor(
            (difference % 60000) /
            1000
        );

    document.getElementById("timer")
        .textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


// =========================
// INDÍTÁS
// =========================

updateProgress();

updateTimer();

setInterval(
    updateTimer,
    1000
);
