import { useEffect, useState } from 'react';

interface WasabiParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingWasabi = () => {
  const [particles, setParticles] = useState<WasabiParticle[]>([]);

  useEffect(() => {
    const newParticles: WasabiParticle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute opacity-5 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
            <path d="M50 10 C30 10 20 25 20 40 C20 60 35 75 50 90 C65 75 80 60 80 40 C80 25 70 10 50 10 Z M50 30 C55 30 60 35 60 40 C60 45 55 50 50 50 C45 50 40 45 40 40 C40 35 45 30 50 30 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingWasabi;
