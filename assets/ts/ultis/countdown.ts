const hourEl = document.querySelector<HTMLDivElement>(
  ".box-countDown:nth-child(1) .time"
);
const minuteEl = document.querySelector<HTMLDivElement>(
  ".box-countDown:nth-child(3) .time"
);
const secondEl = document.querySelector<HTMLDivElement>(
  ".box-countDown:nth-child(5) .time"
);

let totalSeconds = 1 * 3600 + 20 * 60 + 59;

const updateCountdown = () => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (secondEl) secondEl.textContent = ("0" + seconds).slice(-2);
  if (minuteEl) minuteEl.textContent = ("0" + minutes).slice(-2);
  if (hourEl) hourEl.textContent = ("0" + hours).slice(-2);

  if (totalSeconds > 0) {
    totalSeconds--;
  } else {
    clearInterval(timer);
  }
};

const timer = setInterval(updateCountdown, 1000);
updateCountdown();
