document.addEventListener("DOMContentLoaded", () => {
  const imgThumbnails = document.querySelectorAll<HTMLImageElement>(
    ".thumbnails .thumbnail"
  );
  const mainImages = document.querySelectorAll<HTMLImageElement>(
    ".image-container .main-image"
  );
  const imageContainer =
    document.querySelector<HTMLDivElement>(".image-container");
  const thumbnails = document.querySelector<HTMLDivElement>(".thumbnails");
  const containerSlider =
    document.querySelector<HTMLDivElement>(".container-slide")?.offsetLeft || 0;
  const btnZoom = document.querySelector<HTMLDivElement>(".btn-zoom"); // Nút Zoom

  let currentIndex = 0;

  const updateSlider = (index: number): void => {
    const imageWidth = mainImages[0]?.clientWidth || 0;
    imageContainer?.scrollTo({ left: index * imageWidth, behavior: "smooth" });

    imgThumbnails.forEach((thumb) => thumb.classList.remove("active"));
    imgThumbnails[index]?.classList.add("active");

    const leftSpacing =
      (imgThumbnails[index]?.offsetLeft || 0) -
      containerSlider -
      (thumbnails?.clientWidth || 0) / 2 +
      (imgThumbnails[index]?.clientWidth || 0) / 2;

    thumbnails?.scrollTo({ left: leftSpacing, behavior: "smooth" });
  };

  window.addEventListener("load", () => {
    currentIndex = 0;
    updateSlider(currentIndex);
  });

  mainImages.forEach((image, index) => {
    image.addEventListener("mousemove", (e: MouseEvent) => {
      const { left, width } = image.getBoundingClientRect();
      const mouseX = e.clientX - left;

      image.classList.remove("left-cursor", "right-cursor");
      image.classList.add(mouseX < width / 2 ? "left-cursor" : "right-cursor");
    });

    image.addEventListener("click", (e: MouseEvent) => {
      const { left, width } = image.getBoundingClientRect();
      const mouseX = e.clientX - left;

      currentIndex =
        mouseX < width / 2
          ? Math.max(0, currentIndex - 1)
          : Math.min(mainImages.length - 1, currentIndex + 1);
      updateSlider(currentIndex);
    });
  });

  imgThumbnails.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      updateSlider(currentIndex);
    });
  });

  const lightBox = document.querySelector<HTMLDivElement>(".lightBox");
  const lightBoxMainImg = document.querySelector<HTMLImageElement>(
    ".lightBox-main-img img"
  );
  const closeLightBox =
    document.querySelector<HTMLDivElement>(".close-lightBox");
  const btnLeft = document.querySelector<HTMLDivElement>(
    ".btn-lightBox.btn-left"
  );
  const btnRight = document.querySelector<HTMLDivElement>(
    ".btn-lightBox.btn-right"
  );

  const updateLightBoxImage = (index: number): void => {
    if (lightBoxMainImg) lightBoxMainImg.src = mainImages[index]?.src || "";
  };

  btnZoom?.addEventListener("click", () => {
    updateLightBoxImage(currentIndex);
    lightBox?.classList.add("openLightBox");
  });

  closeLightBox?.addEventListener("click", () => {
    lightBox?.classList.remove("openLightBox");
  });

  lightBox?.addEventListener("click", (e: MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest(".lightBox-main-img") &&
      !(e.target as HTMLElement).closest(".btn-lightBox")
    ) {
      lightBox?.classList.remove("openLightBox");
    }
  });

  btnLeft?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateLightBoxImage(currentIndex);
    }
  });

  btnRight?.addEventListener("click", () => {
    if (currentIndex < mainImages.length - 1) {
      currentIndex++;
      updateLightBoxImage(currentIndex);
    }
  });
});

// SLide Auto Infinity
document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.getElementById(
    "slider-container"
  ) as HTMLElement;
  const sliderTrack = document.getElementById("slider-track") as HTMLElement;
  const originalSlides = Array.from(
    document.querySelectorAll(".slide")
  ) as HTMLElement[];

  let isAnimating = true;
  let isPausedByHover = false;
  let animationId: number;
  let currentPosition = 0;
  const scrollSpeed = 0.4;
  let totalWidth = 0;

  const cloneSlides = (times = 2): void => {
    for (let i = 0; i < times; i++) {
      originalSlides.forEach((slide) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        sliderTrack.appendChild(clone);
      });
    }
    updateTotalWidth();
  };

  const updateTotalWidth = () => {
    totalWidth = Array.from(sliderTrack.children).reduce((width, slide) => {
      return (
        width +
        (slide as HTMLElement).offsetWidth +
        parseInt(getComputedStyle(slide as HTMLElement).marginRight)
      );
    }, 0);
  };

  cloneSlides();

  const animateScroll = (): void => {
    if (!isAnimating) return;

    currentPosition -= scrollSpeed;

    if (Math.abs(currentPosition) >= totalWidth / 2) {
      cloneSlides(1);
    }

    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    animationId = requestAnimationFrame(animateScroll);
  };

  animateScroll();

  sliderContainer.addEventListener("mouseenter", () => {
    isPausedByHover = true;
    updateAnimationState();
  });

  sliderContainer.addEventListener("mouseleave", () => {
    isPausedByHover = false;
    updateAnimationState();
  });

  const updateAnimationState = (): void => {
    if (!isPausedByHover && !isAnimating) {
      isAnimating = true;
      animateScroll();
    } else if (isPausedByHover && isAnimating) {
      isAnimating = false;
      cancelAnimationFrame(animationId);
    }
  };
});

// Slide Drag
document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".swiper") as HTMLElement;
  const sliderTrack = document.querySelector(".swiper-wrapper") as HTMLElement;
  const slides = Array.from(
    document.querySelectorAll(".swiper-slide")
  ) as HTMLElement[];

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  if (sliderContainer && sliderTrack) {
    sliderContainer.style.overflow = "hidden";
    sliderContainer.style.display = "flex";
    sliderContainer.style.alignItems = "center";
    sliderContainer.style.userSelect = "none";

    sliderTrack.style.display = "flex";
    sliderTrack.style.gap = "10px";

    slides.forEach((slide) => {
      const clone = slide.cloneNode(true) as HTMLElement;
      sliderTrack.appendChild(clone);
    });

    sliderContainer.addEventListener("mousedown", (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - sliderContainer.offsetLeft;
      scrollLeft = sliderContainer.scrollLeft;
    });

    sliderContainer.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    sliderContainer.addEventListener("mouseup", () => {
      isDragging = false;
    });

    sliderContainer.addEventListener("mousemove", (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - sliderContainer.offsetLeft;
      const walk = (x - startX) * 2;
      sliderContainer.scrollLeft = scrollLeft - walk;

      if (sliderContainer.scrollLeft <= 0) {
        sliderContainer.scrollLeft = sliderContainer.scrollWidth / 2;
      }
      if (sliderContainer.scrollLeft >= sliderContainer.scrollWidth / 2) {
        sliderContainer.scrollLeft = 0;
      }
    });
  }
});
