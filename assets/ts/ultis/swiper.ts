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

  // 🚀 **Chỉ mở lightbox khi nhấn vào nút Zoom**
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
