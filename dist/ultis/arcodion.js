"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const listArcodion = document.querySelectorAll(".arcodion-item");
    listArcodion.forEach((el) => {
        const promt = el.querySelector(".promt");
        const img = el.querySelector(".plus img");
        const title = el.querySelector(".title");
        if (!promt || !img)
            return;
        el.addEventListener("click", () => {
            const isOpen = promt.classList.contains("open");
            listArcodion.forEach((item) => {
                const itemPromt = item.querySelector(".promt");
                const itemImg = item.querySelector(".plus img");
                const title = item.querySelector(".title");
                itemPromt.style.maxHeight = "0";
                itemPromt.classList.remove("open");
                itemImg.src = "./assets/images/plus.png";
                title.classList.remove("active");
            });
            if (!isOpen) {
                promt.style.maxHeight = promt.scrollHeight + 16 + "px";
                promt.classList.add("open");
                img.src = "./assets/images/minus.png";
                title === null || title === void 0 ? void 0 : title.classList.add("active");
            }
        });
    });
});
