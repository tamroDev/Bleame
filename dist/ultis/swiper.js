"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const imgThumbnails = document.querySelectorAll(".thumbnails .thumbnail");
    const mainImages = document.querySelectorAll(".image-container .main-image");
    const imageContainer = document.querySelector(".image-container");
    const thumbnails = document.querySelector(".thumbnails");
    const containerSlider = ((_a = document.querySelector(".container-slide")) === null || _a === void 0 ? void 0 : _a.offsetLeft) || 0;
    const btnZoom = document.querySelector(".btn-zoom"); // Nút Zoom
    let currentIndex = 0;
    const updateSlider = (index) => {
        var _a, _b, _c, _d;
        const imageWidth = ((_a = mainImages[0]) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0;
        imageContainer === null || imageContainer === void 0 ? void 0 : imageContainer.scrollTo({ left: index * imageWidth, behavior: "smooth" });
        imgThumbnails.forEach((thumb) => thumb.classList.remove("active"));
        (_b = imgThumbnails[index]) === null || _b === void 0 ? void 0 : _b.classList.add("active");
        const leftSpacing = (((_c = imgThumbnails[index]) === null || _c === void 0 ? void 0 : _c.offsetLeft) || 0) -
            containerSlider -
            ((thumbnails === null || thumbnails === void 0 ? void 0 : thumbnails.clientWidth) || 0) / 2 +
            (((_d = imgThumbnails[index]) === null || _d === void 0 ? void 0 : _d.clientWidth) || 0) / 2;
        thumbnails === null || thumbnails === void 0 ? void 0 : thumbnails.scrollTo({ left: leftSpacing, behavior: "smooth" });
    };
    window.addEventListener("load", () => {
        currentIndex = 0;
        updateSlider(currentIndex);
    });
    mainImages.forEach((image, index) => {
        image.addEventListener("mousemove", (e) => {
            const { left, width } = image.getBoundingClientRect();
            const mouseX = e.clientX - left;
            image.classList.remove("left-cursor", "right-cursor");
            image.classList.add(mouseX < width / 2 ? "left-cursor" : "right-cursor");
        });
        image.addEventListener("click", (e) => {
            const { left, width } = image.getBoundingClientRect();
            const mouseX = e.clientX - left;
            currentIndex =
                mouseX < width / 2
                    ? Math.max(0, currentIndex - 1)
                    : Math.min(mainImages.length - 1, currentIndex + 1);
            updateSlider(currentIndex);
        });
    });
    imgThumbnails.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });
    const lightBox = document.querySelector(".lightBox");
    const lightBoxMainImg = document.querySelector(".lightBox-main-img img");
    const closeLightBox = document.querySelector(".close-lightBox");
    const btnLeft = document.querySelector(".btn-lightBox.btn-left");
    const btnRight = document.querySelector(".btn-lightBox.btn-right");
    const updateLightBoxImage = (index) => {
        var _a;
        if (lightBoxMainImg)
            lightBoxMainImg.src = ((_a = mainImages[index]) === null || _a === void 0 ? void 0 : _a.src) || "";
    };
    btnZoom === null || btnZoom === void 0 ? void 0 : btnZoom.addEventListener("click", () => {
        updateLightBoxImage(currentIndex);
        lightBox === null || lightBox === void 0 ? void 0 : lightBox.classList.add("openLightBox");
    });
    closeLightBox === null || closeLightBox === void 0 ? void 0 : closeLightBox.addEventListener("click", () => {
        lightBox === null || lightBox === void 0 ? void 0 : lightBox.classList.remove("openLightBox");
    });
    lightBox === null || lightBox === void 0 ? void 0 : lightBox.addEventListener("click", (e) => {
        if (!e.target.closest(".lightBox-main-img") &&
            !e.target.closest(".btn-lightBox")) {
            lightBox === null || lightBox === void 0 ? void 0 : lightBox.classList.remove("openLightBox");
        }
    });
    btnLeft === null || btnLeft === void 0 ? void 0 : btnLeft.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightBoxImage(currentIndex);
        }
    });
    btnRight === null || btnRight === void 0 ? void 0 : btnRight.addEventListener("click", () => {
        if (currentIndex < mainImages.length - 1) {
            currentIndex++;
            updateLightBoxImage(currentIndex);
        }
    });
});
// SLide Auto Infinity
document.addEventListener("DOMContentLoaded", () => {
    const sliderContainer = document.getElementById("slider-container");
    const sliderTrack = document.getElementById("slider-track");
    const originalSlides = Array.from(document.querySelectorAll(".slide"));
    let isAnimating = true;
    let isPausedByHover = false;
    let animationId;
    let currentPosition = 0;
    const scrollSpeed = 0.4;
    let totalWidth = 0;
    const cloneSlides = (times = 2) => {
        for (let i = 0; i < times; i++) {
            originalSlides.forEach((slide) => {
                const clone = slide.cloneNode(true);
                sliderTrack.appendChild(clone);
            });
        }
        updateTotalWidth();
    };
    const updateTotalWidth = () => {
        totalWidth = Array.from(sliderTrack.children).reduce((width, slide) => {
            return (width +
                slide.offsetWidth +
                parseInt(getComputedStyle(slide).marginRight));
        }, 0);
    };
    cloneSlides();
    const animateScroll = () => {
        if (!isAnimating)
            return;
        currentPosition -= scrollSpeed;
        if (Math.abs(currentPosition) >= totalWidth / 2) {
            cloneSlides(1);
        }
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
        animationId = requestAnimationFrame(animateScroll);
    };
    animateScroll();
    sliderContainer.addEventListener("mouseenter", () => {
        isPausedByHover = true;
        updateAnimationState();
    });
    sliderContainer.addEventListener("mouseleave", () => {
        isPausedByHover = false;
        updateAnimationState();
    });
    const updateAnimationState = () => {
        if (!isPausedByHover && !isAnimating) {
            isAnimating = true;
            animateScroll();
        }
        else if (isPausedByHover && isAnimating) {
            isAnimating = false;
            cancelAnimationFrame(animationId);
        }
    };
});
// Slide Drag
document.addEventListener("DOMContentLoaded", () => {
    const sliderContainer = document.querySelector(".swiper");
    const sliderTrack = document.querySelector(".swiper-wrapper");
    const slides = Array.from(document.querySelectorAll(".swiper-slide"));
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    if (sliderContainer && sliderTrack) {
        sliderContainer.style.overflow = "hidden";
        sliderContainer.style.display = "flex";
        sliderContainer.style.alignItems = "center";
        sliderContainer.style.userSelect = "none";
        sliderTrack.style.display = "flex";
        sliderTrack.style.gap = "10px";
        slides.forEach((slide) => {
            const clone = slide.cloneNode(true);
            sliderTrack.appendChild(clone);
        });
        sliderContainer.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.pageX - sliderContainer.offsetLeft;
            scrollLeft = sliderContainer.scrollLeft;
        });
        sliderContainer.addEventListener("mouseleave", () => {
            isDragging = false;
        });
        sliderContainer.addEventListener("mouseup", () => {
            isDragging = false;
        });
        sliderContainer.addEventListener("mousemove", (e) => {
            if (!isDragging)
                return;
            e.preventDefault();
            const x = e.pageX - sliderContainer.offsetLeft;
            const walk = (x - startX) * 2;
            sliderContainer.scrollLeft = scrollLeft - walk;
            if (sliderContainer.scrollLeft <= 0) {
                sliderContainer.scrollLeft = sliderContainer.scrollWidth / 2;
            }
            if (sliderContainer.scrollLeft >= sliderContainer.scrollWidth / 2) {
                sliderContainer.scrollLeft = 0;
            }
        });
    }
});
