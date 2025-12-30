import { useEffect, useRef } from "react";

export function DNAHelix() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // 3D projection helper
    const project3D = (x, y, z, tiltAngle = 0.3) => {
      // Apply tilt rotation around X axis
      const cosTilt = Math.cos(tiltAngle);
      const sinTilt = Math.sin(tiltAngle);
      const yt = y * cosTilt - z * sinTilt;
      const zt = y * sinTilt + z * cosTilt;
      
      // Perspective projection
      const distance = 400;
      const scale = distance / (distance + zt);
      return {
        x: x * scale + canvas.width / 2,
        y: yt * scale + canvas.height / 2,
        scale: scale,
        z: zt
      };
    };

    const render = () => {
      time += 0.02; // Continuous rotation speed
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = 60;
      const helixHeight = canvas.height * 0.8;
      const helixRadius = Math.min(80, canvas.width * 0.15);
      const centerY = canvas.height / 2;
      const spacing = helixHeight / particles;

      // Rotation around Y axis for 3D effect
      const rotationY = time * 0.5;

      ctx.lineWidth = 2;

      for (let i = 0; i < particles; i++) {
        const t = (i / particles) * Math.PI * 4 + rotationY;
        const y = centerY - helixHeight / 2 + i * spacing;
        
        // 3D helix coordinates
        const x1 = Math.cos(t) * helixRadius;
        const z1 = Math.sin(t) * helixRadius;
        const y1 = y - centerY;
        
        const x2 = Math.cos(t + Math.PI) * helixRadius;
        const z2 = Math.sin(t + Math.PI) * helixRadius;
        const y2 = y - centerY;

        // Project to 2D with tilt
        const p1 = project3D(x1, y1, z1, 0.4);
        const p2 = project3D(x2, y2, z2, 0.4);

        // Depth-based alpha and size
        const depth1 = (p1.z + 200) / 400; // Normalize depth
        const depth2 = (p2.z + 200) / 400;
        const alpha1 = Math.max(0.3, Math.min(1, depth1));
        const alpha2 = Math.max(0.3, Math.min(1, depth2));
        const size1 = 4 + depth1 * 6;
        const size2 = 4 + depth2 * 6;

        // Gradient colors - blue to purple
        const color1 = `rgba(93, 95, 239, ${alpha1})`; // #5D5FEF
        const color2 = `rgba(139, 92, 246, ${alpha2})`; // Purple

        // Draw shadows for depth
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * (1 - depth1)})`;
        ctx.arc(p1.x + 2, p1.y + 2, size1, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * (1 - depth2)})`;
        ctx.arc(p2.x + 2, p2.y + 2, size2, 0, Math.PI * 2);
        ctx.fill();

        // Draw strand 1 (front)
        ctx.beginPath();
        ctx.fillStyle = color1;
        ctx.shadowBlur = 20 * depth1;
        ctx.shadowColor = "rgba(93, 95, 239, 0.5)";
        ctx.arc(p1.x, p1.y, size1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw strand 2 (back)
        ctx.beginPath();
        ctx.fillStyle = color2;
        ctx.shadowBlur = 20 * depth2;
        ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
        ctx.arc(p2.x, p2.y, size2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connectors (rungs)
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(203, 213, 225, ${Math.min(alpha1, alpha2) * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{
          transform: 'perspective(1000px) rotateX(15deg) rotateY(-10deg)',
          transformStyle: 'preserve-3d'
        }}
      />
    </div>
  );
}


