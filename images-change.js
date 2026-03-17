const images = [
    "assets/images/products/IMG_001.jpg",
    "assets/images/products/IMG_002.jpg",
    "assets/images/products/IMG_003.jpg",
    "assets/images/products/IMG_004.jpg",
    "assets/images/products/IMG_005.jpg",
    "assets/images/products/IMG_006.jpg",
    "assets/images/products/IMG_007.jpg",
    "assets/images/products/IMG_008.jpg",
    "assets/images/products/IMG_009.jpg"
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