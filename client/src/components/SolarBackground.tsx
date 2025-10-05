import React, { useEffect, useRef } from "react";

const SolarBackground = ({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (height === 0) return; // Don't resize if container has no height
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const baseCellSize = 220;
    let cols = Math.ceil((container.clientWidth) / baseCellSize);
    let rows = Math.ceil((container.clientHeight) / baseCellSize);

    const colors = [
      { primary: "#FFD700", secondary: "#FFA500" },
      { primary: "#FFA500", secondary: "#FF6B35" },
      { primary: "#FF8C00", secondary: "#FFD700" },
      { primary: "#FFE5B4", secondary: "#FFD700" },
    ];

    const sizes = [60, 80, 100, 120, 140];

    interface Square {
      opacity: number;
      targetOpacity: number;
      color: { primary: string; secondary: string };
      fadeSpeed: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
    }

    let squares: Square[] = [];
    const initSquares = () => {
      cols = Math.ceil((container.clientWidth) / baseCellSize);
      rows = Math.ceil((container.clientHeight) / baseCellSize);
      squares = [];
      for (let i = 0; i < cols * rows; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const isEdge = col < 2 || col >= cols - 2 || row < 2 || row >= rows - 2;

        squares.push({
          opacity: isEdge ? Math.random() * 0.3 : Math.random() * 0.1,
          targetOpacity: isEdge ? Math.random() * 0.4 : 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          fadeSpeed: 0.001 + Math.random() * 0.002,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        });
      }
    };
    initSquares();

    let last = 0;
    const targetFps = 20;
    const frameInterval = 1000 / targetFps;
    let rafId = 0;

    const animate = (now: number) => {
      if (now - last < frameInterval) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      last = now;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      if (height === 0) { // Don't animate if container has no height
          rafId = requestAnimationFrame(animate);
          return;
      }

      ctx.fillStyle = "#FFF8E7";
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          if (!squares[index]) continue;
          const square = squares[index];

          const col = i;
          const row = j;
          const isEdge = col < 2 || col >= cols - 2 || row < 2 || row >= rows - 2;
          const triggerChance = isEdge ? 0.001 : 0.0005;

          if (Math.random() < triggerChance) {
            square.targetOpacity = Math.random() * 0.6 + 0.1;
            square.color = colors[Math.floor(Math.random() * colors.length)];
            square.size = sizes[Math.floor(Math.random() * sizes.length)];
          }

          square.rotation += square.rotationSpeed;

          if (square.opacity < square.targetOpacity) {
            square.opacity = Math.min(square.opacity + square.fadeSpeed, square.targetOpacity);
          } else {
            square.opacity = Math.max(square.opacity - square.fadeSpeed, 0);
            if (square.opacity === 0) square.targetOpacity = 0;
          }

          if (square.opacity > 0) {
            const x = i * baseCellSize;
            const y = j * baseCellSize;
            const offset = (baseCellSize - square.size) / 2;
            const centerX = x + offset + square.size / 2;
            const centerY = y + offset + square.size / 2;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate((square.rotation * Math.PI) / 180);

            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, square.size / 2);
            gradient.addColorStop(0, square.color.primary);
            gradient.addColorStop(1, square.color.secondary);

            ctx.fillStyle = gradient;
            ctx.globalAlpha = square.opacity;

            ctx.shadowColor = square.color.primary;
            ctx.shadowBlur = 15 + square.size / 8;

            ctx.beginPath();
            ctx.rect(-square.size / 2, -square.size / 2, square.size, square.size);
            ctx.fill();

            ctx.restore();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };
    
    const resizeObserver = new ResizeObserver(() => {
        resize();
        initSquares();
    });
    resizeObserver.observe(container);

    rafId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.unobserve(container);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}

export default SolarBackground;