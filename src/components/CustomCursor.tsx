import React, { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  id: number;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Only enable on desktop / fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let pCount = 0;
    const colors = ['#F5D58B', '#F4BBD0', '#C7A9E8', '#FFE082'];

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }

      // Occasional trailing sparkle particle
      if (Math.random() > 0.45) {
        pCount++;
        const newParticle: Particle = {
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.9,
          id: pCount,
        };
        setParticles((prev) => [...prev.slice(-16), newParticle]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle decay animation loop
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y - 0.7,
            opacity: p.opacity - 0.08,
            size: Math.max(0, p.size - 0.25),
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(interval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing sparkle particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 6px ${p.color}`,
            transition: 'opacity 0.08s ease-out',
          }}
        />
      ))}

      {/* Main Cursor: Golden Star / Heart Aura */}
      <div
        className="absolute transition-transform duration-75 ease-out pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.4 : 1})`,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_8px_rgba(245,213,139,0.8)]"
        >
          {isPointer ? (
            // Small heart when hovering interactive element
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#F4BBD0"
              stroke="#FFF6E9"
              strokeWidth="1"
            />
          ) : (
            // Delicate four-point sparkle star
            <path
              d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
              fill="#F5D58B"
              stroke="#FFF6E9"
              strokeWidth="0.8"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
