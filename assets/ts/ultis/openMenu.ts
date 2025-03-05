document.addEventListener("DOMContentLoaded", () => {
  const iconOpen: HTMLElement | null = document.querySelector(".nav-rp img");
  const menu: HTMLDivElement | null = document.querySelector(".nav-hidden");

  iconOpen?.addEventListener("click", (event) => {
    event.stopPropagation();
    menu?.classList.toggle("open-menu");
  });

  document.addEventListener("click", (event) => {
    if (menu?.classList.contains("open-menu")) {
      const target = event.target as HTMLElement;
      if (menu && !menu.contains(target) && target !== iconOpen) {
        menu.classList.remove("open-menu");
      }
    }
  });
});
