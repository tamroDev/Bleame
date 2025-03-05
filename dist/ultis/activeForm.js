"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const btnActiveForm = document.querySelector(".reviewButton");
    const formReview = document.querySelector(".form_comment");
    btnActiveForm === null || btnActiveForm === void 0 ? void 0 : btnActiveForm.addEventListener("click", () => {
        if (formReview) {
            if (formReview.classList.contains("open")) {
                formReview.style.maxHeight = "0px";
            }
            else {
                formReview.style.maxHeight = `${formReview.scrollHeight}px`;
            }
            formReview.classList.toggle("open");
        }
    });
});
