document.addEventListener("DOMContentLoaded", () => {
  const progressCircles: NodeListOf<HTMLElement> =
    document.querySelectorAll(".circleBarWrapper");

  progressCircles.forEach((circle) => {
    const percentElement = circle.querySelector(".circleBarPercent span");
    if (!percentElement) return;

    const percentage = parseInt(percentElement.textContent || "0");
    const angle = (percentage / 100) * 360;

    circle.style.background = `conic-gradient(
          rgb(112, 105, 188) 0deg,
          rgb(112, 105, 188) ${angle}deg,
          rgb(227, 210, 253) ${angle}deg
      )`;
  });
});
