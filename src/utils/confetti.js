import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ea580c', '#f97316', '#fb923c', '#10b981', '#f59e0b'],
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.error("Confetti error:", err);
  }
};

export const triggerSuperConfetti = () => {
  try {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#ea580c', '#f97316', '#fb923c', '#34d399'];

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
