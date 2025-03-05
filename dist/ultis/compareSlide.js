"use strict";
const divider = document.querySelector('.divider');
const handle = document.querySelector('.handle');
const afterImage = document.querySelector('.after');
const imgCompare = document.querySelector('.img_compare');
let isDragging = false;
divider.addEventListener('mousedown', (event) => {
    isDragging = true;
    document.body.style.cursor = 'ew-resize';
});
document.addEventListener('mousemove', (event) => {
    if (!isDragging)
        return;
    const rect = imgCompare.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;
    let percent = (offsetX / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    afterImage.style.width = `${percent}%`;
    divider.style.left = `${percent}%`;
});
document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
});
