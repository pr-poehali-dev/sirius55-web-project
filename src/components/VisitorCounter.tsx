import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const VisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedCount = localStorage.getItem('visitor_count');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 1247;
    
    const newCount = initialCount + 1;
    localStorage.setItem('visitor_count', newCount.toString());
    
    let currentCount = 0;
    const increment = Math.ceil(newCount / 50);
    const duration = 2000;
    const stepTime = duration / 50;

    setIsAnimating(true);
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= newCount) {
        setVisitors(newCount);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setVisitors(currentCount);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="fixed top-24 left-8 z-40 hidden md:block">
      <Card className="border-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Посетителей</p>
              <p className={`text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${isAnimating ? 'animate-pulse' : ''}`}>
                {formatNumber(visitors)}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
            <Icon name="TrendingUp" size={12} />
            <span>+12 сегодня</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorCounter;
