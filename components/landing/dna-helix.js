function DNAHelix() {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            time += 0.015; // Slightly slower for elegance
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const particles = 45;
            const height = canvas.height * 0.7; // Taller strand
            const width = Math.min(300, canvas.width * 0.4);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const spacing = height / particles;
            const startY = centerY - height / 2;

            ctx.lineWidth = 3;

            for (let i = 0; i < particles; i++) {
                const y = startY + i * spacing;
                // Double helix twist
                const phase = (i / particles) * Math.PI * 3 + time;
                const xOffset = Math.sin(phase) * width / 2;
                
                // Colors - Gradient from Purple to Blue
                const depth = (Math.sin(phase) + 1) / 2; // 0 to 1
                const alpha = 0.4 + depth * 0.6; // 0.4 to 1.0 opacity
                
                // Use a soft blue-purple gradient
                // Front strand
                const colorFront = `rgba(139, 92, 246, ${alpha})`; // Violet
                // Back strand
                const colorBack = `rgba(59, 130, 246, ${alpha})`; // Blue

                // Shadow for depth
                ctx.beginPath();
                ctx.fillStyle = `rgba(0,0,0,${0.05 * depth})`;
                ctx.arc(centerX + xOffset + 10, y + 10, 8, 0, Math.PI * 2);
                ctx.fill();

                // Draw strands
                
                // Strand 1 (Front-ish)
                ctx.beginPath();
                ctx.fillStyle = colorFront;
                ctx.shadowBlur = 15;
                ctx.shadowColor = "rgba(139, 92, 246, 0.4)";
                ctx.arc(centerX + xOffset, y, 6 + (depth * 3), 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0; // Reset

                // Strand 2 (Back-ish)
                ctx.beginPath();
                ctx.fillStyle = colorBack;
                ctx.arc(centerX - xOffset, y, 6 + ((1-depth) * 3), 0, Math.PI * 2);
                ctx.fill();

                // Connectors
                if (i % 2 === 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(203, 213, 225, 0.5)`; // Slate-300
                    ctx.moveTo(centerX + xOffset, y);
                    ctx.lineTo(centerX - xOffset, y);
                    ctx.stroke();
                }
            }

            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}

window.DNAHelix = DNAHelix;