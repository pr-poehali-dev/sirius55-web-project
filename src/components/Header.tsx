import { Button } from "@/components/ui/button";

interface HeaderProps {
  onContactClick: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-bold text-foreground">
          <span className="text-primary">Sirius</span>55
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">
            Главная
          </a>
          <a href="#advantages" className="text-foreground hover:text-primary transition-colors">
            Преимущества
          </a>
          <a href="#recipes" className="text-foreground hover:text-primary transition-colors">
            Рецепты
          </a>
        </div>
        <Button size="sm" onClick={onContactClick} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          <span className="hidden sm:inline">Связаться</span>
          <span className="sm:hidden">☎️</span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;