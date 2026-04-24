import { useEffect, useRef } from "react";

interface Props {
  opacity?: number;
  nodeCount?: number;
}

export default function NeuralBackground({ opacity = 0.3, nodeCount = 50 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Color palette: blue, cyan, purple
      const palette = [
        { r: 59, g: 130, b: 246 },   // electric blue
        { r: 34, g: 211, b: 238 },   // cyan
        { r: 139, g: 92, b: 246 },   // neon purple
      ];

      // Draw connections
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            const c = palette[(i + j) % palette.length];
            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const c = palette[i % palette.length];
        const glow = 0.5 + Math.sin(n.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${glow})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${glow * 0.4})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", () => { resize(); });

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
