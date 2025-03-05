export const imgs = [
    { src: "/assets/images/product.webp", alt: "Ảnh 0" },
    { src: "/assets/images/product-1.webp", alt: "Ảnh 1" },
    { src: "/assets/images/product-2.webp", alt: "Ảnh 2" },
    { src: "/assets/images/product-3.webp", alt: "Ảnh 3" },
    { src: "/assets/images/product-4.webp", alt: "Ảnh 4" },
    { src: "/assets/images/product-5.webp", alt: "Ảnh 5" },
    { src: "/assets/images/product-6.webp", alt: "Ảnh 6" },
    { src: "/assets/images/product-7.webp", alt: "Ảnh 7" },
    { src: "/assets/images/product-8.webp", alt: "Ảnh 8" },
];
function renderSlides() {
    const mainSwiperWrapper = document.querySelector(".main-swiper .swiper-wrapper");
    const thumbSwiperWrapper = document.querySelector(".thumbs-swiper .swiper-wrapper");
    if (!mainSwiperWrapper || !thumbSwiperWrapper)
        return;
    mainSwiperWrapper.innerHTML = "";
    thumbSwiperWrapper.innerHTML = "";
    imgs.forEach((img) => {
        const mainSlide = document.createElement("div");
        mainSlide.classList.add("swiper-slide");
        mainSlide.innerHTML = `<img src="${img.src}" data-lightbox="gallery" alt="${img.alt}"/>`;
        const thumbSlide = document.createElement("div");
        thumbSlide.classList.add("swiper-slide");
        thumbSlide.classList.add("product-thumb-img");
        thumbSlide.innerHTML = `<img src="${img.src}" alt="${img.alt} Thumb"/>`;
        mainSwiperWrapper.appendChild(mainSlide);
        thumbSwiperWrapper.appendChild(thumbSlide);
    });
}
document.addEventListener("DOMContentLoaded", renderSlides);
