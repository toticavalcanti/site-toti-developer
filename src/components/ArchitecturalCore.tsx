'use client';

import React, { useRef, useEffect } from 'react';

export default function ArchitecturalCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 60;
    const maxDistance = 180;
    let mouse = { x: 0, y: 0 };

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;

      constructor() {
        this.reset();
        // Give some initial spread
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = width / 2 + (Math.random() - 0.5) * 400;
        this.y = height / 2 + (Math.random() - 0.5) * 400;
        this.z = Math.random() * 400;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 0.5;
        this.radius = 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Interaction with mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 250) {
          const force = (250 - dist) / 250;
          this.x += dx * force * 0.02;
          this.y += dy * force * 0.02;
        }

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.z < 0 || this.z > 800) {
          this.reset();
        }
      }

      draw() {
        const perspective = 600 / (600 + this.z);
        const drawX = (this.x - width / 2) * perspective + width / 2;
        const drawY = (this.y - height / 2) * perspective + height / 2;
        const drawR = this.radius * perspective;

        ctx!.beginPath();
        ctx!.arc(drawX, drawY, drawR, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(20, 184, 166, ${0.4 * perspective})`; // Teal color
        ctx!.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const perspective = 600 / (600 + (p1.z + p2.z) / 2);
            const x1 = (p1.x - width / 2) * perspective + width / 2;
            const y1 = (p1.y - height / 2) * perspective + height / 2;
            const x2 = (p2.x - width / 2) * perspective + width / 2;
            const y2 = (p2.y - height / 2) * perspective + height / 2;

            const opacity = (1 - dist / maxDistance) * 0.25 * perspective;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
            ctx.lineWidth = 0.8 * perspective;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 -z-10 w-full h-full pointer-events-none opacity-60"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}
