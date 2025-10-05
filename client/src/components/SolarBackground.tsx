import React, { useEffect, useRef } from "react";

export default function SolarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Style size in CSS pixels
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Backing store size in device pixels for crisp rendering
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const gap = 16;
    const baseCellSize = 180; // Slightly larger cells reduces draw calls
    let cols = Math.ceil((canvas.width / dpr) / baseCellSize);
    let rows = Math.ceil((canvas.height / dpr) / baseCellSize);

    const colors = [
      { primary: "#FFD700", secondary: "#FFA500", accent: "#FF8C00" },
      { primary: "#FFA500", secondary: "#FF6B35", accent: "#FFD700" },
      { primary: "#FF8C00", secondary: "#FFD700", accent: "#FFA500" },
      { primary: "#FFE5B4", secondary: "#FFD700", accent: "#FFCC00" },
      { primary: "#FFF9E6", secondary: "#FFA500", accent: "#FF8C00" },
      { primary: "#FFCC00", secondary: "#FF8C00", accent: "#FFD700" },
    ];

    const sizes = [50, 60, 70, 80, 90, 100, 120, 140, 160];

    interface Square {
      opacity: number;
      targetOpacity: number;
      color: { primary: string; secondary: string; accent: string };
      fadeSpeed: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      blur: number;
    }

    let squares: Square[] = [];
    const initSquares = () => {
      cols = Math.ceil((canvas.width / dpr) / baseCellSize);
      rows = Math.ceil((canvas.height / dpr) / baseCellSize);
      squares = [];
      for (let i = 0; i < cols * rows; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // More shapes on edges
        const isEdge = col < 3 || col >= cols - 3 || row < 2 || row >= rows - 2;
        const isCorner = (col < 2 || col >= cols - 2) && (row < 2 || row >= rows - 2);

        squares.push({
          opacity: isCorner ? Math.random() * 0.4 : isEdge ? Math.random() * 0.3 : Math.random() * 0.1,
          targetOpacity: isCorner ? Math.random() * 0.6 : isEdge ? Math.random() * 0.4 : 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          fadeSpeed: 0.002 + Math.random() * 0.003,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.4,
          blur: Math.random() * 2,
        });
      }
    };
    initSquares();

    let last = 0;
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;
    let rafId = 0;

    const animate = (now: number) => {
      if (now - last < frameInterval) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      last = now;
      ctx.fillStyle = "#FFF8E7";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentCols = Math.ceil((canvas.width / dpr) / baseCellSize);
      const currentRows = Math.ceil((canvas.height / dpr) / baseCellSize);
      if (currentCols !== cols || currentRows !== rows) {
        initSquares();
        cols = currentCols;
        rows = currentRows;
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const square = squares[index];

          const col = i;
          const row = j;
          const isEdge = col < 3 || col >= cols - 3 || row < 2 || row >= rows - 2;
          const triggerChance = isEdge ? 0.002 : 0.0008; // More frequent triggers on edges

          if (Math.random() < triggerChance) {
            square.targetOpacity = Math.random() * 0.9 + 0.1;
            square.color = colors[Math.floor(Math.random() * colors.length)];
            square.size = sizes[Math.floor(Math.random() * sizes.length)];
            square.blur = Math.random() * 2;
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

            // Multi-layer gradient
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, square.size / 2);
            gradient.addColorStop(0, square.color.primary);
            gradient.addColorStop(0.6, square.color.secondary);
            gradient.addColorStop(1, square.color.primary + "66");

            ctx.fillStyle = gradient;
            ctx.globalAlpha = square.opacity;

            // Layered glow
            ctx.shadowColor = square.color.primary;
            ctx.shadowBlur = 30 + square.size / 5;
            ctx.filter = `blur(${square.blur}px)`;

            // Sharp square with crisp edges
            ctx.beginPath();
            ctx.rect(-square.size / 2, -square.size / 2, square.size, square.size);
            ctx.fill();

            // Edge border for definition
            ctx.shadowBlur = 0;
            ctx.filter = 'none';
            ctx.strokeStyle = square.color.accent;
            ctx.lineWidth = 2;
            ctx.globalAlpha = square.opacity * 0.6;
            ctx.stroke();

            // Inner highlight for depth
            const highlightGradient = ctx.createLinearGradient(
              -square.size / 2, -square.size / 2,
              square.size / 2, square.size / 2
            );
            highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
            highlightGradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
            ctx.fillStyle = highlightGradient;
            ctx.globalAlpha = square.opacity * 0.5;
            ctx.fill();

            // Diagonal accent line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.globalAlpha = square.opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(-square.size / 2, -square.size / 2);
            ctx.lineTo(square.size / 2, square.size / 2);
            ctx.stroke();

            ctx.restore();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
}