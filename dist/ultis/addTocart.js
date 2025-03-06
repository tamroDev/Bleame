"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll('input[name="product"]');
    const addToCartButtons = document.querySelectorAll(".addToCart");
    let selectedPack = null;
    const updateSelectedPack = (event) => {
        const target = event.target;
        const label = target.closest(".product-option");
        if (label) {
            const titleElement = label.querySelector(".product-title");
            const priceElement = label.querySelector(".current-price");
            const oldPriceElement = label.querySelector(".old-price");
            if (titleElement && priceElement && oldPriceElement) {
                selectedPack = {
                    name: "Sample Product",
                    quantity: 1,
                    price: parseFloat(priceElement.textContent.replace("$", "")),
                    oldPrice: parseFloat(oldPriceElement.textContent.replace("$", "")),
                    type_product: titleElement.textContent.trim(),
                };
            }
        }
    };
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", updateSelectedPack);
    });
    const checkedRadio = document.querySelector('input[name="product"]:checked');
    if (checkedRadio) {
        updateSelectedPack({ target: checkedRadio });
    }
    const addToCart = () => {
        if (!selectedPack) {
            alert("Vui lòng chọn gói trước khi thêm vào giỏ hàng!");
            return;
        }
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!Array.isArray(cart)) {
            cart = [];
        }
        const existingProduct = cart.find((item) => item.type_product === selectedPack.type_product);
        if (existingProduct) {
            existingProduct.quantity += 1;
        }
        else {
            cart.push(selectedPack);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };
    const cartActive = document.querySelector(".cart-container");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            addToCart();
            renderCart();
            cartActive === null || cartActive === void 0 ? void 0 : cartActive.classList.toggle("show");
        });
    });
    const renderCart = () => {
        const cartContainer = document.querySelector(".cart-product");
        const cartArr = JSON.parse(localStorage.getItem("cart") || "[]");
        const cartEmpty = cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.querySelector(".cart-empty");
        const productCart = document.querySelector(".product-cart");
        const progressCart = document.querySelector(".wrapper-progess-cart");
        const finalCart = document.querySelector(".final-cart");
        if (cartArr.length > 0) {
            cartEmpty === null || cartEmpty === void 0 ? void 0 : cartEmpty.classList.add("hidden");
            productCart.innerHTML = "";
            progressCart === null || progressCart === void 0 ? void 0 : progressCart.classList.add("active");
            finalCart === null || finalCart === void 0 ? void 0 : finalCart.classList.add("active");
            cartArr.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
            <img
              src="https://bleame.com/cdn/shop/files/FreeGleamScrub2.jpg?v=1714574606&width=92"
              alt="Product Image"
            />
            <div class="cart-info">
              <div class="text-info">
                <h3>${item.name}</h3>
                <div class="price">
                  <span class="old-price">$${item.oldPrice}</span>
                  <span class="current-price">$${item.price}</span>
                </div>
              </div>
              <div class="pack">${item.type_product}</div>
              <div class="control-info">
                <div class="quantity-control">
                  <button class="decrease" data-index="${index}">-</button>
                  <span>${item.quantity}</span>
                  <button class="increase" data-index="${index}">+</button>
                </div>
                <a href="#" class="remove" data-index="${index}">Remove</a>
              </div>
          </div>`;
                productCart === null || productCart === void 0 ? void 0 : productCart.appendChild(cartItem);
            });
            document.querySelectorAll(".increase").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const index = parseInt(event.target.getAttribute("data-index"));
                    updateQuantity(index, 1);
                });
            });
            document.querySelectorAll(".decrease").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const index = parseInt(event.target.getAttribute("data-index"));
                    updateQuantity(index, -1);
                });
            });
            document.querySelectorAll(".remove").forEach((button) => {
                button.addEventListener("click", (event) => {
                    event.preventDefault();
                    const index = parseInt(event.target.getAttribute("data-index"));
                    removeItem(index);
                });
            });
            document.querySelectorAll(".remove").forEach((button) => {
                button.addEventListener("click", (event) => {
                    event.preventDefault();
                    const index = parseInt(event.target.getAttribute("data-index"));
                    const cartItem = event.target.closest(".cart-item");
                    if (cartItem) {
                        cartItem.classList.add("fade-out");
                        setTimeout(() => cartItem.remove(), 300);
                    }
                    removeItem(index);
                    updateCartSummary();
                });
            });
            updateCartSummary();
        }
        else {
            cartEmpty === null || cartEmpty === void 0 ? void 0 : cartEmpty.classList.remove("hidden");
            progressCart === null || progressCart === void 0 ? void 0 : progressCart.classList.remove("active");
            finalCart === null || finalCart === void 0 ? void 0 : finalCart.classList.remove("active");
        }
    };
    const updateQuantity = (index, amount) => {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!cart[index])
            return;
        cart[index].quantity += amount;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };
    const removeItem = (index) => {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!cart[index])
            return;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };
    const updateCartSummary = () => {
        const cartArr = JSON.parse(localStorage.getItem("cart") || "[]");
        const totalPrice = cartArr.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalQuantity = cartArr.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector(".cart-count");
        const cartTotal = document.querySelector(".total-price");
        if (cartCount) {
            cartCount.textContent = totalQuantity.toString();
        }
        if (cartTotal) {
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        }
    };
    renderCart();
});
