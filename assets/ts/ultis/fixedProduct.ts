document.addEventListener("DOMContentLoaded", () => {
  const fixedProduct = document.querySelector<HTMLDivElement>(".product-fixed");
  const productContainer =
    document.querySelector<HTMLDivElement>(".wrapper-shopify");

  if (!fixedProduct || !productContainer) return;

  window.addEventListener("scroll", () => {
    const containerRect = productContainer.getBoundingClientRect();

    if (containerRect.top <= window.innerHeight) {
      fixedProduct.classList.add("active");
    } else {
      fixedProduct.classList.remove("active");
    }
  });
});
