import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const VisitorCounter = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const getOrCreateVisitorId = () => {
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('visitor_id', visitorId);
      }
      return visitorId;
    };

    const trackVisitor = async () => {
      const visitorId = getOrCreateVisitorId();
      
      try {
        const response = await fetch('https://functions.poehali.dev/fb3e9453-64b3-4196-82ca-df7b05ac6ecf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Visitor-Id': visitorId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          animateCount(data.total_visitors, setTotalVisitors);
          setTodayVisitors(data.today_visitors);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    const animateCount = (targetCount: number, setter: (value: number) => void) => {
      let currentCount = 0;
      const increment = Math.ceil(targetCount / 50);
      const duration = 2000;
      const stepTime = duration / 50;

      setIsAnimating(true);
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          setter(targetCount);
          setIsAnimating(false);
          clearInterval(timer);
        } else {
          setter(currentCount);
        }
      }, stepTime);
    };

    trackVisitor();
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
                {formatNumber(totalVisitors)}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
            <Icon name="TrendingUp" size={12} />
            <span>+{todayVisitors} сегодня</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorCounter;
