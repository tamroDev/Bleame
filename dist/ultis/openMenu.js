"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const iconOpen = document.querySelector(".nav-rp img");
    const menu = document.querySelector(".nav-hidden");
    iconOpen === null || iconOpen === void 0 ? void 0 : iconOpen.addEventListener("click", (event) => {
        event.stopPropagation();
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle("open-menu");
    });
    document.addEventListener("click", (event) => {
        if (menu === null || menu === void 0 ? void 0 : menu.classList.contains("open-menu")) {
            const target = event.target;
            if (menu && !menu.contains(target) && target !== iconOpen) {
                menu.classList.remove("open-menu");
            }
        }
    });
});
