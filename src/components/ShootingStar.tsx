import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const ShootingStar = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStar = () => {
      const newStar: Star = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 50,
        delay: 0,
        duration: Math.random() * 1 + 1.5,
      };

      setStars((prev) => [...prev, newStar]);

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, newStar.duration * 1000 + 100);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createStar();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full shooting-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDuration: `${star.duration}s`,
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 4px rgba(168, 85, 247, 0.6)',
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStar;
