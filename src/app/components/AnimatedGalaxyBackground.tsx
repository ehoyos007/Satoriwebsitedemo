import { useEffect, useRef, useState } from 'react';

// Configuration object for easy customization
interface GalaxyConfig {
  // Animation settings
  speed: number; // 0.1 - 2.0, affects all motion
  gridSize: number; // px between grid lines
  particleCount: number; // number of triangles/particles
  glowIntensity: number; // 0 - 1, opacity of glow gradients
  
  // Visual settings
  styleVariant: 'grid' | 'triangles' | 'galaxy'; // galaxy = grid + triangles + glow
  gridOpacity: number; // 0 - 1
  particleOpacity: number; // 0 - 1
  
  // Performance
  targetFPS: number; // 60 by default
  maxDPR: number; // cap device pixel ratio for performance
}

const defaultConfig: GalaxyConfig = {
  speed: 0.3,
  gridSize: 60,
  particleCount: 40,
  glowIntensity: 0.15,
  styleVariant: 'galaxy',
  gridOpacity: 0.08,
  particleOpacity: 0.12,
  targetFPS: 60,
  maxDPR: 2,
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export function AnimatedGalaxyBackground({ config = defaultConfig }: { config?: Partial<GalaxyConfig> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const mergedConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Setup canvas with device pixel ratio (capped for performance)
    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, mergedConfig.maxDPR);
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      return { width: rect.width, height: rect.height };
    };

    const { width, height } = setupCanvas();

    // Initialize particles/triangles
    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile 
        ? Math.floor(mergedConfig.particleCount * 0.5) 
        : mergedConfig.particleCount;

      const colors = ['#22d3ee', '#a78bfa', '#34d399']; // cyan, violet, emerald
      
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * mergedConfig.speed * 0.3,
        vy: (Math.random() - 0.5) * mergedConfig.speed * 0.3,
        size: Math.random() * 3 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02 * mergedConfig.speed,
        opacity: Math.random() * mergedConfig.particleOpacity + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    initParticles();

    // Draw base gradient
    const drawBaseGradient = () => {
      const width = canvas.offsetWidth || canvas.width;
      const height = canvas.offsetHeight || canvas.height;

      // Radial gradient from center
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      
      gradient.addColorStop(0, '#0f0f1a');
      gradient.addColorStop(0.5, '#0a0a0f');
      gradient.addColorStop(1, '#050508');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Draw animated grid
    const drawGrid = (offset: { x: number; y: number }) => {
      if (mergedConfig.styleVariant === 'triangles') return;

      const width = canvas.offsetWidth || canvas.width;
      const height = canvas.offsetHeight || canvas.height;
      const gridSize = mergedConfig.gridSize;

      ctx.strokeStyle = `rgba(34, 211, 238, ${mergedConfig.gridOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      // Vertical lines
      for (let x = (offset.x % gridSize); x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      // Horizontal lines
      for (let y = (offset.y % gridSize); y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();
    };

    // Draw glow gradients
    const drawGlowGradients = (time: number) => {
      if (mergedConfig.glowIntensity === 0) return;

      const width = canvas.offsetWidth || canvas.width;
      const height = canvas.offsetHeight || canvas.height;

      // Animated glow positions
      const glow1X = width * 0.3 + Math.sin(time * 0.0002) * 100;
      const glow1Y = height * 0.3 + Math.cos(time * 0.0003) * 100;
      
      const glow2X = width * 0.7 + Math.sin(time * 0.00025) * 150;
      const glow2Y = height * 0.6 + Math.cos(time * 0.0002) * 120;

      // Glow 1 - Cyan
      const gradient1 = ctx.createRadialGradient(glow1X, glow1Y, 0, glow1X, glow1Y, 300);
      gradient1.addColorStop(0, `rgba(34, 211, 238, ${mergedConfig.glowIntensity * 0.3})`);
      gradient1.addColorStop(0.5, `rgba(34, 211, 238, ${mergedConfig.glowIntensity * 0.1})`);
      gradient1.addColorStop(1, 'rgba(34, 211, 238, 0)');
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      // Glow 2 - Violet
      const gradient2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, 250);
      gradient2.addColorStop(0, `rgba(167, 139, 250, ${mergedConfig.glowIntensity * 0.25})`);
      gradient2.addColorStop(0.5, `rgba(167, 139, 250, ${mergedConfig.glowIntensity * 0.08})`);
      gradient2.addColorStop(1, 'rgba(167, 139, 250, 0)');
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);
    };

    // Draw particles/triangles
    const drawParticles = () => {
      if (mergedConfig.styleVariant === 'grid') return;

      const width = canvas.offsetWidth || canvas.width;
      const height = canvas.offsetHeight || canvas.height;

      particlesRef.current.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        // Draw as triangle
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.lineTo(particle.size * 0.866, particle.size * 0.5);
        ctx.lineTo(-particle.size * 0.866, particle.size * 0.5);
        ctx.closePath();

        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
        ctx.fill();

        // Subtle stroke
        ctx.strokeStyle = particle.color.replace(')', `, ${particle.opacity * 0.5})`).replace('rgb', 'rgba');
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();

        // Update particle position
        if (!prefersReducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.rotation += particle.rotationSpeed;

          // Wrap around screen
          if (particle.x < -20) particle.x = width + 20;
          if (particle.x > width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = height + 20;
          if (particle.y > height + 20) particle.y = -20;
        }
      });
    };

    // Draw vignette overlay
    const drawVignette = () => {
      const width = canvas.offsetWidth || canvas.width;
      const height = canvas.offsetHeight || canvas.height;

      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.3,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      
      gradient.addColorStop(0, 'rgba(10, 10, 15, 0)');
      gradient.addColorStop(0.7, 'rgba(10, 10, 15, 0.3)');
      gradient.addColorStop(1, 'rgba(10, 10, 15, 0.6)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Animation loop
    let lastTime = 0;
    const frameInterval = 1000 / mergedConfig.targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      // Throttle to target FPS
      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);

        // Update grid offset (slow drift)
        if (!prefersReducedMotion) {
          offsetRef.current.x += mergedConfig.speed * 0.15;
          offsetRef.current.y += mergedConfig.speed * 0.1;
        }

        // Clear and draw layers
        drawBaseGradient();
        drawGlowGradients(currentTime);
        drawGrid(offsetRef.current);
        drawParticles();
        drawVignette();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      setupCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [mergedConfig, prefersReducedMotion]);

  // Static fallback for reduced motion or if canvas fails
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(167, 139, 250, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #0f0f1a 0%, #0a0a0f 50%, #050508 100%)
          `,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}