import { useEffect, useState } from 'react';

interface SiriusParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const FloatingWasabi = () => {
  const [particles, setParticles] = useState<SiriusParticle[]>([]);

  useEffect(() => {
    const newParticles: SiriusParticle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute opacity-[0.03] animate-float-logo"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        >
          <img 
            src="https://cdn.poehali.dev/files/ad79537b-a843-44c9-ab02-ceaba0bc59f9.jpg" 
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingWasabi;