// Bubble animation effect for Seamen
// Creates floating bubbles in the background

export function createBubbles(container, count = 50) {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    // Random size (3px to 20px)
    const size = Math.random() * 17 + 3;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random horizontal position
    bubble.style.left = `${Math.random() * 100}%`;

    // Random animation duration (6s to 20s)
    const duration = Math.random() * 14 + 6;
    bubble.style.animationDuration = `${duration}s`;

    // Random start delay
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    // Opacity based on size (smaller = more transparent)
    bubble.style.opacity = Math.min(0.8, size / 20);

    container.appendChild(bubble);
  }
}

export function addBubbleEffect(container, x, y) {
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.style.width = '8px';
  bubble.style.height = '8px';
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.animationDuration = '4s';
  bubble.style.opacity = '0.7';

  container.appendChild(bubble);

  // Remove after animation
  setTimeout(() => {
    if (bubble.parentNode) {
      bubble.parentNode.removeChild(bubble);
    }
  }, 4000);
}
