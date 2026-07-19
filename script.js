/*=========================================================
    DATABASE DESA PURBOSARI 2026
    SCRIPT.JS - BAGIAN 1
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /*=====================================================
        ELEMEN HTML
    =====================================================*/

    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");
    const aboutTitle = document.getElementById("aboutTitle");
    const typingBox = document.getElementById("typingText");
    const scrollButton = document.querySelector(".scroll-btn");
    const databaseSection = document.getElementById("database");
    const rtCards = document.querySelectorAll(".rt-card");



    /*=====================================================
        TEKS HERO
    =====================================================*/

    const TITLE =
        "DATABASE DESA PURBOSARI 2026";

    const SUBTITLE =
`Sistem Informasi Dokumentasi dan Database
Desa Purbosari Kecamatan Seluma Barat
Kabupaten Seluma Provinsi Bengkulu`;



    /*=====================================================
        KONFIGURASI ANIMASI
    =====================================================*/

    const CONFIG = {

        titleSpeed: 60,

        subtitleSpeed: 20,

        paragraphSpeed: 12,

        paragraphDelay: 350,

        heroDelay: 300,

        scrollDelay: 700,

        rtDelay: 120

    };



    /*=====================================================
        STATUS
    =====================================================*/

    let animationFinished = false;
    let skipAnimation = false;



    /*=====================================================
        KONDISI AWAL
    =====================================================*/

    heroTitle.textContent = "";
    heroSubtitle.textContent = "";

    scrollButton.style.opacity = "0";
    scrollButton.style.transform = "translateY(20px)";



    /*=====================================================
        SIMPAN PARAGRAF DARI HTML
    =====================================================*/

    const paragraphs = [];

    typingBox.querySelectorAll("p").forEach((p) => {

        paragraphs.push(p.textContent.trim());

        p.textContent = "";

        p.style.display = "none";

        p.style.opacity = "1";

    });



    /*=====================================================
        DELAY
    =====================================================*/

    function sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }



    /*=====================================================
        TYPEWRITER
    =====================================================*/

    function typeWriter(element, text, speed) {

        return new Promise(resolve => {

            element.innerHTML = "";

            let index = 0;

            function write() {

                  if (skipAnimation) {
        element.innerHTML = text.replace(/\n/g, "<br>");
        resolve();
        return;
    }

    if (index >= text.length) {

        resolve();

        return;

    }

    const char = text.charAt(index);

    if (char === "\n") {

        element.innerHTML += "<br>";

    } else {

        element.innerHTML += char;

    }

    index++;

    setTimeout(write, speed);

}
            write();

        });

    }



    /*=====================================================
        FADE IN
    =====================================================*/

    function fadeIn(element) {

        element.style.transition = ".6s";

        element.style.opacity = "1";

        element.style.transform = "translateY(0)";

    }



    /*=====================================================
        SCROLL HALUS
    =====================================================*/

    function scrollToElement(element) {

        element.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }



    /*=====================================================
        CURSOR MENGETIK
    =====================================================*/

    function cursorOn(element) {

        element.classList.add("typing-cursor");

    }

    function cursorOff(element) {

        element.classList.remove("typing-cursor");

    }



    /*=====================================================
        BAGIAN 2 DIMULAI DARI SINI
    =====================================================*/
      /*=====================================================
        HERO ANIMATION
    =====================================================*/

    async function playHero() {

        cursorOn(heroTitle);

        await typeWriter(
            heroTitle,
            TITLE,
            CONFIG.titleSpeed
        );

        if (skipAnimation) return;

        cursorOff(heroTitle);

        await sleep(CONFIG.heroDelay);

        cursorOn(heroSubtitle);

        await typeWriter(
            heroSubtitle,
            SUBTITLE,
            CONFIG.subtitleSpeed
        );

        if (skipAnimation) return;

        cursorOff(heroSubtitle);

        fadeIn(scrollButton);

    }



    /*=====================================================
        SCROLL KE LATAR BELAKANG
    =====================================================*/

    async function gotoAbout() {

        await sleep(CONFIG.scrollDelay);

        scrollToElement(
            document.querySelector(".about")
        );

        await sleep(600);

    }



    /*=====================================================
        TAMPILKAN JUDUL ABOUT
    =====================================================*/

    function showAboutTitle() {

        aboutTitle.classList.add("show");

    }



    /*=====================================================
        TYPING LATAR BELAKANG
    =====================================================*/

    async function playAbout() {

        await gotoAbout();

        showAboutTitle();

        await sleep(500);

        const paragraphElement =
            typingBox.querySelectorAll("p");

        for (let i = 0; i < paragraphElement.length; i++) {

             paragraphElement[i].textContent = "";

             paragraphElement[i].style.display = "block";
          
            cursorOn(paragraphElement[i]);

            await typeWriter(

                paragraphElement[i],

                paragraphs[i],

                CONFIG.paragraphSpeed

            );

            if (skipAnimation) return;

            cursorOff(paragraphElement[i]);

            await sleep(CONFIG.paragraphDelay);

        }

    }



    /*=====================================================
        TOMBOL JELAJAHI DATABASE
    =====================================================*/

    scrollButton.addEventListener("click", (e) => {

        e.preventDefault();

        scrollToElement(databaseSection);

    });



    /*=====================================================
        KLIK LOGO KEMBALI KE HERO
    =====================================================*/

    const logo = document.querySelector(".logo");

    logo.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });



    /*=====================================================
        BAGIAN 3 DIMULAI DARI SINI
    =====================================================*/
      /*=====================================================
        SCROLL KE DATABASE RT
    =====================================================*/

    async function gotoDatabase() {

        await sleep(700);

        scrollToElement(databaseSection);

        await sleep(600);

    }



    /*=====================================================
        ANIMASI RT
    =====================================================*/

    async function showRTCards() {

        for (const card of rtCards) {

            card.classList.add("show");

            await sleep(CONFIG.rtDelay);

        }

    }



    /*=====================================================
        DATABASE ANIMATION
    =====================================================*/

    async function playDatabase() {

        await gotoDatabase();

        await showRTCards();

    }



    /*=====================================================
        HOVER ICON
    =====================================================*/

    rtCards.forEach(card => {

        const icon = card.querySelector("i");

        card.addEventListener("mouseenter", () => {

            icon.style.transform = "scale(1.15) rotate(-8deg)";

        });

        card.addEventListener("mouseleave", () => {

            icon.style.transform = "scale(1) rotate(0deg)";

        });

    });



    /*=====================================================
        RIPPLE EFFECT
    =====================================================*/

    rtCards.forEach(card => {

        card.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";

            ripple.style.height = size + "px";

            ripple.style.left =
                (e.clientX - rect.left - size / 2) + "px";

            ripple.style.top =
                (e.clientY - rect.top - size / 2) + "px";

            this.appendChild(ripple);

            ripple.addEventListener("animationend", () => {

                ripple.remove();

            });

        });

    });



    /*=====================================================
        SKIP ANIMATION
    =====================================================*/

    function finishAnimation() {

        if (animationFinished) return;

        animationFinished = true;

        heroTitle.innerHTML = TITLE;

        heroSubtitle.innerHTML =
            SUBTITLE.replace(/\n/g, "<br>");

        fadeIn(scrollButton);

        aboutTitle.classList.add("show");

        const paragraphElement =
            typingBox.querySelectorAll("p");

        paragraphElement.forEach((paragraph, index) => {

          paragraph.style.display = "block";
          
            paragraph.innerHTML = paragraphs[index];

        });

        rtCards.forEach(card => {

            card.classList.add("show");

        });

    }



    window.addEventListener("wheel", () => {

        skipAnimation = true;

        finishAnimation();

    }, { once: true });



    window.addEventListener("touchmove", () => {

        skipAnimation = true;

        finishAnimation();

    }, { once: true });



    /*=====================================================
        BAGIAN 4 DIMULAI DARI SINI
    =====================================================*/
      /*=====================================================
        FUNGSI UTAMA
    =====================================================*/

    async function startWebsite() {

        if (skipAnimation) return;

        await playHero();

        if (skipAnimation) return;

        await playAbout();

        if (skipAnimation) return;

        await playDatabase();

        animationFinished = true;

    }



    /*=====================================================
        LOAD WEBSITE
    =====================================================*/

    window.addEventListener("load", () => {

        setTimeout(() => {

            startWebsite();

        }, 500);

    });



    /*=====================================================
        PRELOAD GAMBAR
    =====================================================*/

    function preloadImage(src) {

        const img = new Image();

        img.src = src;

    }

    preloadImage("logo.png");



    /*=====================================================
        TAMPILKAN RT LANGSUNG
        JIKA USER MEMILIH DATABASE
    =====================================================*/

    if (window.location.hash === "#database") {

        rtCards.forEach(card => {

            card.classList.add("show");

        });

    }



    /*=====================================================
        RESET SAAT REFRESH
    =====================================================*/

    window.onbeforeunload = function () {

        window.scrollTo(0, 0);

    };



    /*=====================================================
        SELESAI
    =====================================================*/

});