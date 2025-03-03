const divider = document.querySelector('.divider') as HTMLElement;
const handle = document.querySelector('.handle') as HTMLElement;
const afterImage = document.querySelector('.after') as HTMLElement;
const imgCompare = document.querySelector('.img_compare') as HTMLElement;

let isDragging = false;

divider.addEventListener('mousedown', (event: MouseEvent) => {
  isDragging = true;
  document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (event: MouseEvent) => {
  if (!isDragging) return;

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
