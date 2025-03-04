document.addEventListener("DOMContentLoaded", (): void => {
  const listArcodion: NodeListOf<HTMLElement> =
    document.querySelectorAll(".arcodion-item");

  listArcodion.forEach((el) => {
    const promt = el.querySelector(".promt") as HTMLDivElement | null;
    const img = el.querySelector(".plus img") as HTMLImageElement | null;
    const title = el.querySelector(".title") as HTMLImageElement | null;

    if (!promt || !img) return;

    el.addEventListener("click", () => {
      const isOpen = promt.classList.contains("open");

      listArcodion.forEach((item) => {
        const itemPromt = item.querySelector(".promt") as HTMLDivElement;
        const itemImg = item.querySelector(".plus img") as HTMLImageElement;
        const title = item.querySelector(".title") as HTMLImageElement;

        itemPromt.style.maxHeight = "0";
        itemPromt.classList.remove("open");
        itemImg.src = "./assets/images/plus.png";
        title.classList.remove("active");
      });

      if (!isOpen) {
        promt.style.maxHeight = promt.scrollHeight + 16 + "px";
        promt.classList.add("open");
        img.src = "./assets/images/minus.png";
        title?.classList.add("active");
      }
    });
  });
});
