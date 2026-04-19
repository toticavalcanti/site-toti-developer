"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    motionQuery.addEventListener("change", onMotion);
    mobileQuery.addEventListener("change", onMobile);
    return () => {
      motionQuery.removeEventListener("change", onMotion);
      mobileQuery.removeEventListener("change", onMobile);
    };
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  if (reducedMotion) return null;
  const particleCount = isMobile ? 30 : 60;

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ transform: "translateZ(0)" }}
      aria-hidden="true"
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          detectRetina: true,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 220, links: { opacity: 0.8 } },
              push: { quantity: 2 },
            },
          },
          particles: {
            color: { value: "#0d9488" },
            links: {
              color: "#2563eb",
              distance: 170,
              enable: true,
              opacity: 0.35,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
            },
            number: {
              density: { enable: true, area: 900 },
              value: particleCount,
            },
            opacity: { value: 0.55 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
        }}
        className="h-full w-full"
      />
    </div>
  );
}
