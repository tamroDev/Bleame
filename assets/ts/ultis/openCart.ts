const cartContainer = document.querySelector<HTMLDivElement>(".cart-container");
const btnOpenCart = document.querySelector<HTMLElement>(".open_cart");
const coating = document.querySelector<HTMLDivElement>(".coating");
const btnClose = document.querySelector<HTMLButtonElement>(".close-btn");

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
} else {
  console.error("Cart Not Found!");
}
