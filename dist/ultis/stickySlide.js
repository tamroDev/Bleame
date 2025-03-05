"use strict";
window.addEventListener("scroll", () => {
    const mediaBox = document.querySelector(".product-media");
    const parentBox = document.querySelector(".product-detail");
    if (!mediaBox || !parentBox)
        return;
    const parentBottom = parentBox.offsetTop + parentBox.offsetHeight;
    const scrollY = window.scrollY;
    if (scrollY >= 135 && scrollY + mediaBox.offsetHeight < parentBottom) {
        mediaBox.classList.add("sticky");
        mediaBox.classList.remove("stop");
    }
    else if (scrollY + mediaBox.offsetHeight >= parentBottom) {
        mediaBox.classList.remove("sticky");
        mediaBox.classList.add("stop");
    }
    else {
        mediaBox.classList.remove("sticky", "stop");
    }
});
