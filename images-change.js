document.addEventListener("DOMContentLoaded", function () {

    const slides = document.getElementById("slides");
    const images = slides.querySelectorAll("img");
    const dotsContainer = document.getElementById("dots");
    const thumbsContainer = document.getElementById("thumbnails");

    let index = 1;
    let autoSlide;
    const total = images.length;

    // Initial position
    slides.style.transform = `translateX(-100%)`;

    function updateSlide() {
        slides.style.transition = "transform 0.5s ease-in-out";
        slides.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
        updateThumbs();
    }

    function nextSlide() { index++; updateSlide(); }
    function prevSlide() { index--; updateSlide(); }

    document.getElementById("next-btn").onclick = nextSlide;
    document.getElementById("prev-btn").onclick = prevSlide;

    // Infinite loop
    slides.addEventListener("transitionend", () => {
        if (index === total - 1) { slides.style.transition = "none"; index = 1; slides.style.transform = `translateX(-100%)`; }
        if (index === 0) { slides.style.transition = "none"; index = total - 2; slides.style.transform = `translateX(-${index * 100}%)`; }
    });

    // Dots
    for (let i = 1; i < total - 1; i++) {
        let dot = document.createElement("span");
        dot.addEventListener("click", () => { index = i; updateSlide(); });
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        const dots = dotsContainer.children;
        for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active");
        if (dots[index - 1]) dots[index - 1].classList.add("active");
    }

    // Thumbnails
    for (let i = 1; i < total - 1; i++) {
        let img = images[i].cloneNode();
        img.addEventListener("click", () => { index = i; updateSlide(); });
        thumbsContainer.appendChild(img);
    }

    function updateThumbs() {
        const thumbs = thumbsContainer.children;
        for (let i = 0; i < thumbs.length; i++) thumbs[i].classList.remove("active");
        if (thumbs[index - 1]) {
            thumbs[index - 1].classList.add("active");
            thumbs[index - 1].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }

    // Auto slide
    function startAuto() { autoSlide = setInterval(nextSlide, 3000); }
    function stopAuto() { clearInterval(autoSlide); }
    startAuto();

    // Pause on hover
    document.getElementById("slideshow").addEventListener("mouseenter", stopAuto);
    document.getElementById("slideshow").addEventListener("mouseleave", startAuto);

    // Swipe support
    let startX = 0;
    slides.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
    slides.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
        stopAuto(); startAuto();
    });

});