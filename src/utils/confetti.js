import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#4f46e5', '#6366f1', '#10b981', '#f59e0b', '#ec4899'],
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.error("Confetti error:", err);
  }
};

export const triggerSuperConfetti = () => {
  try {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#4f46e5', '#818cf8', '#34d399', '#fbbf24'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  } catch (err) {
    console.error("Super confetti error:", err);
  }
};
