interface IActionMedia {
  src: string;
}

const arrMedia: IActionMedia[] = [
  {
    src: "./assets/images/bikini.mp4",
  },
  {
    src: "./assets/images/legs.mp4",
  },
  {
    src: "./assets/images/arm.mp4",
  },
  {
    src: "./assets/images/back.mp4",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const tabs: NodeListOf<HTMLElement> =
    document.querySelectorAll(".tab-action ul li");
  const mainVideo: HTMLVideoElement | null = document.querySelector(
    ".media-action video"
  );

  if (!mainVideo) return;

  tabs.forEach((el, index) => {
    el.addEventListener("click", () => {
      tabs.forEach((it) => it.classList.remove("active"));
      el.classList.add("active");

      mainVideo.style.opacity = "0";
      setTimeout(() => {
        mainVideo.src = arrMedia[index].src;
        mainVideo.play();
      }, 200);

      mainVideo.addEventListener("loadeddata", () => {
        mainVideo.style.opacity = "1";
      });
    });
  });
});
