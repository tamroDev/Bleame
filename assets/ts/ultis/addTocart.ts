document.addEventListener("DOMContentLoaded", () => {
  const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    'input[name="product"]'
  );
  const addToCartButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".addToCart");

  interface Product {
    name: string;
    quantity: number;
    price: number;
    oldPrice: number;
    type_product: string;
  }

  let selectedPack: Product | null = null;

  const updateSelectedPack = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const label = target.closest(".product-option");

    if (label) {
      const titleElement = label.querySelector(".product-title");
      const priceElement = label.querySelector(".current-price");
      const oldPriceElement = label.querySelector(".old-price");

      if (titleElement && priceElement && oldPriceElement) {
        selectedPack = {
          name: "Sample Product",
          quantity: 1,
          price: parseFloat(priceElement.textContent!.replace("$", "")),
          oldPrice: parseFloat(oldPriceElement.textContent!.replace("$", "")),
          type_product: titleElement.textContent!.trim(),
        };
      }
    }
  };

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", updateSelectedPack);
  });

  const checkedRadio = document.querySelector(
    'input[name="product"]:checked'
  ) as HTMLInputElement;
  if (checkedRadio) {
    updateSelectedPack({ target: checkedRadio } as any);
  }

  const addToCart = () => {
    if (!selectedPack) {
      alert("Vui lòng chọn gói trước khi thêm vào giỏ hàng!");
      return;
    }

    let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!Array.isArray(cart)) {
      cart = [];
    }

    const existingProduct = cart.find(
      (item) => item.type_product === selectedPack!.type_product
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(selectedPack);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  const cartActive: HTMLDivElement | null =
    document.querySelector(".cart-container");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      addToCart();
      renderCart();
      cartActive?.classList.toggle("show");
    });
  });

  const renderCart = () => {
    const cartContainer: HTMLDivElement | null =
      document.querySelector(".cart-product");

    const cartArr: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const cartEmpty: HTMLDivElement | null | undefined =
      cartContainer?.querySelector(".cart-empty");
    const productCart: HTMLDivElement | null =
      document.querySelector(".product-cart");
    const progressCart: HTMLDivElement | null = document.querySelector(
      ".wrapper-progess-cart"
    );
    const finalCart: HTMLDivElement | null =
      document.querySelector(".final-cart");

    if (cartArr.length > 0) {
      cartEmpty?.classList.add("hidden");
      productCart!.innerHTML = "";
      progressCart?.classList.add("active");
      finalCart?.classList.add("active");

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
        productCart?.appendChild(cartItem);
      });

      document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = parseInt(
            (event.target as HTMLElement).getAttribute("data-index")!
          );
          updateQuantity(index, 1);
        });
      });

      document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = parseInt(
            (event.target as HTMLElement).getAttribute("data-index")!
          );
          updateQuantity(index, -1);
        });
      });

      document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const index = parseInt(
            (event.target as HTMLElement).getAttribute("data-index")!
          );
          removeItem(index);
        });
      });

      document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const index = parseInt(
            (event.target as HTMLElement).getAttribute("data-index")!
          );
          const cartItem = (event.target as HTMLElement).closest(".cart-item");

          if (cartItem) {
            cartItem.classList.add("fade-out");
            setTimeout(() => cartItem.remove(), 300);
          }

          removeItem(index);
          updateCartSummary();
        });
      });

      updateCartSummary();
    } else {
      cartEmpty?.classList.remove("hidden");
      progressCart?.classList.remove("active");
      finalCart?.classList.remove("active");
    }
  };

  const updateQuantity = (index: number, amount: number) => {
    let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  const removeItem = (index: number) => {
    let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart[index]) return;

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  const updateCartSummary = () => {
    const cartArr: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const totalPrice = cartArr.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const totalQuantity = cartArr.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount: HTMLDivElement | null =
      document.querySelector(".cart-count");
    const cartTotal: HTMLDivElement | null =
      document.querySelector(".total-price");

    if (cartCount) {
      cartCount.textContent = totalQuantity.toString();
    }

    if (cartTotal) {
      cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
  };

  renderCart();
});
