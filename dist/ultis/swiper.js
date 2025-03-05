document.addEventListener("DOMContentLoaded", function () {
    const thumbsSwiper = new Swiper(".thumbs-swiper", {
        spaceBetween: 10,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        centeredSlides: false,
        on: {
            slideChange() {
                const totalSlides = this.slides.length;
                const activeIndex = this.activeIndex;
                this.params.centeredSlides =
                    activeIndex >= 2 && activeIndex <= totalSlides - 3;
                this.update();
                document
                    .querySelectorAll(".thumbs-swiper .swiper-slide")
                    .forEach((slide, index) => {
                    slide.classList.toggle("swiper-slide-active", index === activeIndex);
                });
                updateFadingEffect(this);
            },
        },
    });
    const mainSwiper = new Swiper(".main-swiper", {
        spaceBetween: 10,
        thumbs: {
            swiper: thumbsSwiper,
        },
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slideChange() {
                thumbsSwiper.slideTo(this.activeIndex);
                document
                    .querySelectorAll(".thumbs-swiper .swiper-slide")
                    .forEach((slide, index) => {
                    slide.classList.toggle("swiper-slide-active", index === this.activeIndex);
                });
                updateFadingEffect(thumbsSwiper);
            },
        },
    });
    function updateFadingEffect(swiper) {
        const thumbsContainer = document.querySelector(".thumbs-swiper");
        if (swiper.activeIndex === 0) {
            thumbsContainer.classList.add("hide-left");
        }
        else {
            thumbsContainer.classList.remove("hide-left");
        }
        if (swiper.isEnd) {
            thumbsContainer.classList.add("hide-right");
        }
        else {
            thumbsContainer.classList.remove("hide-right");
        }
    }
    updateFadingEffect(thumbsSwiper);
});
export {};
