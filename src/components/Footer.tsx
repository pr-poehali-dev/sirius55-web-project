import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8 px-6">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-2">
          <span className="font-bold">Sirius55</span> — Сделано с любовью
        </p>
        <p className="text-sm opacity-80 mb-3">
          © 2025 Все права защищены
        </p>
        <Link 
          to="/login" 
          className="text-xs opacity-50 hover:opacity-100 transition-opacity"
        >
          Админ
        </Link>
      </div>
    </footer>
  );
};

export default Footer;