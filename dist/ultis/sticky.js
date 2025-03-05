"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const productMedia = document.querySelector(".product-media");
    const productDetail = document.querySelector(".product-detail");
    if (productMedia && productDetail) {
        const updateSticky = () => {
            const detailRect = productDetail.getBoundingClientRect();
            const mediaRect = productMedia.getBoundingClientRect();
            if (detailRect.bottom <= mediaRect.height + 135) {
                productMedia.style.position = "absolute";
                productMedia.style.top = `${detailRect.height - mediaRect.height}px`; // Dừng lại khi chạm đáy
            }
            else {
                productMedia.style.position = "sticky";
                productMedia.style.top = "135px"; // Bình thường vẫn sticky
            }
        };
        window.addEventListener("scroll", updateSticky);
        updateSticky(); // Chạy ngay khi load trang
    }
});
