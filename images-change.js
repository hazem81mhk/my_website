const images = [
    "assets/images/products/IMG_01.jpg",
    "assets/images/products/IMG_02.jpg",
    "assets/images/products/IMG_03.jpg",
    "assets/images/products/IMG_04.jpg",
    "assets/images/products/IMG_05.jpg",
    "assets/images/products/IMG_06.jpg",
    "assets/images/products/IMG_07.jpg"
];

let currentIndex = 0;

const slideImg = document.getElementById("slide-img");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function showImage(index) {
    slideImg.src = images[index];
}

nextBtn.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);
});

prevBtn.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    showImage(currentIndex);
});