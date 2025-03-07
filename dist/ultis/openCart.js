"use strict";
const cartContainer = document.querySelector(".cart-container");
const btnOpenCart = document.querySelector(".open_cart");
const coating = document.querySelector(".coating");
const btnClose = document.querySelector(".close-btn");
if (cartContainer && btnOpenCart && coating && btnClose) {
    btnOpenCart.addEventListener("click", () => {
        cartContainer.classList.add("show");
        document.body.style.overflow = "hidden";
    });
    [btnClose, coating].forEach((el) => {
        el.addEventListener("click", () => {
            cartContainer.classList.remove("show");
        });
    });
}
else {
    console.error("Cart Not Found!");
}
