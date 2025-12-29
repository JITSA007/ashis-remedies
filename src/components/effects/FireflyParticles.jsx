import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function FireflyParticles() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Configuration based on theme
    const isDark = theme === 'dark';
    const particleCount = isDark ? 50 : 30;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Dark: Small dots (fireflies), Light: Larger ovals (leaves)
        this.size = isDark ? Math.random() * 2 + 0.5 : Math.random() * 4 + 2; 
        
        // Dark: Float aimlessly, Light: Fall gently down
        this.speedX = isDark ? Math.random() * 0.5 - 0.25 : Math.random() * 0.5 - 0.25;
        this.speedY = isDark ? Math.random() * 0.5 - 0.25 : Math.random() * 0.5 + 0.2;
        
        this.opacity = Math.random();
        this.angle = Math.random() * 360; // For leaf rotation
        this.spin = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Dark: Twinkle, Light: Steady fade
        this.opacity += isDark ? Math.random() * 0.02 - 0.01 : 0;
        this.angle += this.spin;

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < -10) this.y = canvas.height; // Allow to fall from top
        if (this.y > canvas.height) this.y = -10;
        
        // Clamp opacity
        if (this.opacity < 0) this.opacity = 0;
        if (this.opacity > 1) this.opacity = 1;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity * 0.6;

        if (isDark) {
          // Firefly: Glowing Circle
          ctx.fillStyle = "rgba(255, 255, 200, 1)";
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
          // Glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = "white";
        } else {
          // Herb/Leaf: Green Oval
          ctx.fillStyle = "rgba(86, 146, 104, 0.8)"; // Leaf Green
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}