"use strict";
const divider = document.querySelector(".divider");
const handle = document.querySelector(".handle");
const afterImage = document.querySelector(".after");
const imgCompare = document.querySelector(".img_compare");
let isDragging = false;
// Hàm bắt đầu kéo
const startDrag = (event) => {
    isDragging = true;
    document.body.style.cursor = "ew-resize";
};
// Hàm xử lý khi kéo
const onDrag = (event) => {
    var _a;
    if (!isDragging)
        return;
    const rect = imgCompare.getBoundingClientRect();
    let clientX = (_a = event.clientX) !== null && _a !== void 0 ? _a : event.touches[0].clientX;
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
