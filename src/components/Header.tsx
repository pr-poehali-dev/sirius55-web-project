import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

interface HeaderProps {
  onContactClick: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem("user_auth");
      setIsLoggedIn(!!authData);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <img 
              src="https://cdn.poehali.dev/files/ad79537b-a843-44c9-ab02-ceaba0bc59f9.jpg" 
              alt="Sirius55 Logo" 
              className="w-full h-full object-contain transition-transform group-hover:scale-110 group-hover:rotate-12"
            />
          </div>
          <span className="text-xl md:text-2xl font-bold text-foreground">
            <span className="text-primary">Sirius</span>55
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <a 
            href="#home" 
            onClick={(e) => smoothScroll(e, '#home')} 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Главная
          </a>
          <a 
            href="#advantages" 
            onClick={(e) => smoothScroll(e, '#advantages')} 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Преимущества
          </a>
          <a 
            href="#recipes" 
            onClick={(e) => smoothScroll(e, '#recipes')} 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Рецепты
          </a>
          {isLoggedIn && (
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Icon name="User" size={16} />
              Профиль
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button size="sm" asChild className="shrink-0">
              <Link to="/profile">
                <Icon name="User" className="mr-1" size={16} />
                <span className="hidden sm:inline">Профиль</span>
              </Link>
            </Button>
          ) : (
            <Button size="sm" asChild variant="outline" className="shrink-0">
              <Link to="/login">
                <Icon name="LogIn" className="mr-1" size={16} />
                <span className="hidden sm:inline">Войти</span>
              </Link>
            </Button>
          )}
          <Button size="sm" onClick={onContactClick} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <span className="hidden sm:inline">Связаться</span>
            <span className="sm:hidden">☎️</span>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;