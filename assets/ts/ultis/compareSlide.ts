const divider = document.querySelector(".divider") as HTMLElement;
const handle = document.querySelector(".handle") as HTMLElement;
const afterImage = document.querySelector(".after") as HTMLElement;
const imgCompare = document.querySelector(".img_compare") as HTMLElement;

let isDragging = false;

// Hàm bắt đầu kéo
const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging = true;
  document.body.style.cursor = "ew-resize";
};

// Hàm xử lý khi kéo
const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging) return;

  const rect = imgCompare.getBoundingClientRect();
  let clientX =
    (event as MouseEvent).clientX ?? (event as TouchEvent).touches[0].clientX;
  let offsetX = clientX - rect.left;
  let percent = (offsetX / rect.width) * 100;

  percent = Math.max(0, Math.min(100, percent));

  afterImage.style.width = `${percent}%`;
  divider.style.left = `${percent}%`;
};

// Hàm kết thúc kéo
const stopDrag = () => {
  isDragging = false;
  document.body.style.cursor = "default";
};

// Sự kiện chuột
divider.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", stopDrag);

// Sự kiện cảm ứng
divider.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", onDrag);
document.addEventListener("touchend", stopDrag);
