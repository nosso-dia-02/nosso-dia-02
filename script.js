// ===========================
// JS — script.js
// ===========================
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const content = document.getElementById("content");
const music = document.getElementById("music");
const progress = document.querySelector(".progress");

const counter = document.getElementById("counter");
const slideText = document.getElementById("slide-text");

const mainWrapper = document.getElementById("main-wrapper");
const funWrapper = document.getElementById("fun-wrapper");

const slides = document.querySelectorAll("#carousel .slide");
const funSlides = document.querySelectorAll("#fun-carousel .slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const funPrev = document.getElementById("funPrev");
const funNext = document.getElementById("funNext");

const funBtn = document.getElementById("fun-btn");
const backBtn = document.getElementById("back-btn");

let index = 0;
let funIndex = 0;

const phrases = ["de risadas", "de carinho", "de amor", "de paixão", "de nós dois"];
let phraseIndex = 0;

const startDate = new Date("2025-08-02T00:00:00");

// START
startBtn.onclick = () => {
    startScreen.style.display = "none";
    content.style.display = "flex";
    music.play();
    updateCounter();
    startHearts();
    showSlide(0);
};

// COUNTER
function updateCounter() {
    const now = new Date();

    let months =
        (now.getFullYear() - startDate.getFullYear()) * 12 +
        (now.getMonth() - startDate.getMonth());

    let tempDate = new Date(startDate);
    tempDate.setMonth(startDate.getMonth() + months);

    if (now < tempDate) {
        months--;
        tempDate.setMonth(tempDate.getMonth() - 1);
    }

    const diff = now - tempDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const seconds = Math.floor((diff / 1000) % 60);

    counter.style.opacity = 0;

    setTimeout(() => {
        counter.innerHTML =
            `💓 ${months} meses, ${days} dias, ${hours} horas e ${seconds} segundos ${phrases[phraseIndex]}`;

        counter.style.opacity = 1;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 400);
}

setInterval(updateCounter, 3000);

// MUSIC BAR
music.ontimeupdate = () => {
    if (music.duration) {
        progress.style.width = (music.currentTime / music.duration) * 100 + "%";
    }
};

// SLIDES
function showSlide(i) {
    stopVideo(slides[index]);
    slides[index].classList.remove("active");
    index = i;
    slides[index].classList.add("active");
    playVideo(slides[index]);
    updateText(slides[index].dataset.text);
    updateArrows();
}

function playVideo(slide) {
    const v = slide.querySelector("video");
    if (v) { v.currentTime = 0; v.play().catch(() => { }); }
}
function stopVideo(slide) {
    const v = slide.querySelector("video");
    if (v) { v.pause(); v.currentTime = 0; }
}

prevBtn.onclick = () => index > 0 && showSlide(index - 1);
nextBtn.onclick = () => index < slides.length - 1 && showSlide(index + 1);

function updateArrows() {
    prevBtn.classList.toggle("disabled", index === 0);
    nextBtn.classList.toggle("disabled", index === slides.length - 1);
    funBtn.classList.toggle("hidden", index !== slides.length - 1);
}

// TEXT
function updateText(txt) {
    slideText.classList.remove("show");
    setTimeout(() => {
        slideText.textContent = txt;
        slideText.classList.add("show");
    }, 300);
}

// FUN CAROUSEL
funBtn.onclick = () => {
    mainWrapper.classList.add("hidden");
    funWrapper.classList.remove("hidden");
    funBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
    showFunSlide(0);
};

backBtn.onclick = () => {
    funWrapper.classList.add("hidden");
    mainWrapper.classList.remove("hidden");
    backBtn.classList.add("hidden");

    updateArrows();
};

function showFunSlide(i) {
    stopVideo(funSlides[funIndex]);
    funSlides[funIndex].classList.remove("active");
    funIndex = i;
    funSlides[funIndex].classList.add("active");
    playVideo(funSlides[funIndex]);
    updateText(funSlides[funIndex].dataset.text);
    updateFunArrows();
}

funPrev.onclick = () => funIndex > 0 && showFunSlide(funIndex - 1);
funNext.onclick = () => funIndex < funSlides.length - 1 && showFunSlide(funIndex + 1);

function updateFunArrows() {
    funPrev.classList.toggle("disabled", funIndex === 0);
    funNext.classList.toggle("disabled", funIndex === funSlides.length - 1);
}

// HEARTS
function startHearts() {
    setInterval(() => {
        const h = document.createElement("div");
        h.className = "heart";
        h.textContent = "❤️";
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = 12 + Math.random() * 12 + "px";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 5000);
    }, 400);
}

const counterEl = document.getElementById("counter");
