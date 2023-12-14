let isDragging = false;
let initialY = 0;
let initialTop = 0;

function startDragging(event) {
  if (event.button !== 0) return; // Only start dragging on left click
  
  isDragging = true;
  initialY = event.clientY;
  const indicator = event.currentTarget.querySelector('.indicator');
  initialTop = parseFloat(getComputedStyle(indicator).bottom) || 0;
  
  document.addEventListener('mousemove', dragIndicator);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('mouseleave', stopDragging);
}

function dragIndicator(event) {
  if (!isDragging) return;
  
  const bar = event.currentTarget;
  const barRect = bar.getBoundingClientRect();
  const barHeight = bar.offsetHeight;
  const mouseY = event.clientY - barRect.top;
  const newTop = Math.max(0, Math.min(mouseY, barHeight));

  const attackPower = ((1 - newTop / barHeight) * 10);
  
  const indicator = bar.querySelector('.indicator');
  indicator.style.bottom = `${barHeight - newTop}px`;
  
  const blueBar = bar.querySelector('.blue-bar');
  blueBar.style.height = `${newTop}px`;
  
  document.getElementById('attackText').textContent = `Attack Power: ${attackPower.toFixed(1)}`;
}

function stopDragging() {
  isDragging = false;
  document.removeEventListener('mousemove', dragIndicator);
  document.removeEventListener('mouseup', stopDragging);
  document.removeEventListener('mouseleave', stopDragging);
}

document.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('.bar');
  bar.addEventListener('mousedown', startDragging);
});
