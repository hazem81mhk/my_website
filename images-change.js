document.addEventListener("DOMContentLoaded", function () {

    const slides = document.getElementById("slides");
    if (!slides) {
        console.error("Slides element not found!");
        return;
    }

    const totalSlides = slides.children.length;

    let index = 0;
    let autoSlide;

    function showSlide(i) {
        index = (i + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    document.getElementById("next-btn").onclick = () => {
        showSlide(index + 1);
        resetAutoSlide();
    };

    document.getElementById("prev-btn").onclick = () => {
        showSlide(index - 1);
        resetAutoSlide();
    };

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            showSlide(index + 1);
        }, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    startAutoSlide();

    // Swipe
    let startX = 0;

    slides.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    slides.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (diff > 50) showSlide(index + 1);
        else if (diff < -50) showSlide(index - 1);

        resetAutoSlide();
    });

});