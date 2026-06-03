import { useEffect, useRef } from 'react';

export default function SpaceCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    const stars = Array.from({ length: 130 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.9 + 0.1,
      size: index % 13 === 0 ? Math.random() * 1.8 + 1.2 : Math.random() * 1.2 + 0.25,
      speed: Math.random() * 0.0008 + 0.0002,
      hue: index % 4 === 0 ? 190 : index % 7 === 0 ? 38 : 0,
    }));

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const move = (event) => {
      pointerX = event.clientX / Math.max(width, 1);
      pointerY = event.clientY / Math.max(height, 1);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const driftX = (pointerX - 0.5) * 24;
      const driftY = (pointerY - 0.5) * 18;

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > 1.05) {
          star.y = -0.04;
          star.x = Math.random();
        }

        const x = star.x * width + driftX * star.z;
        const y = star.y * height + driftY * star.z;
        const alpha = 0.22 + star.z * 0.65;
        ctx.beginPath();
        ctx.fillStyle = star.hue
          ? `hsla(${star.hue}, 100%, 62%, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(x, y, star.size * star.z, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return <canvas ref={canvasRef} className="space-canvas" aria-hidden="true" />;
}
