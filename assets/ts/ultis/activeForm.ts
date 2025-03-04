document.addEventListener("DOMContentLoaded", () => {
  const btnActiveForm: HTMLButtonElement | null =
    document.querySelector(".reviewButton");
  const formReview: HTMLDivElement | null =
    document.querySelector(".form_comment");

  btnActiveForm?.addEventListener("click", () => {
    if (formReview) {
      if (formReview.classList.contains("open")) {
        formReview.style.maxHeight = "0px";
      } else {
        formReview.style.maxHeight = `${formReview.scrollHeight}px`;
      }
      formReview.classList.toggle("open");
    }
  });
});
