import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">
            <span className="text-primary">sirius</span>55
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Главная
            </a>
            <a href="#advantages" className="text-foreground hover:text-primary transition-colors">
              Преимущества
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Услуги
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Контакты
            </a>
          </div>
          <Button size="sm" className="hidden md:inline-flex">
            Связаться
          </Button>
        </nav>
      </header>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
              Рецепт хорошего настроения
            </h1>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="outline" className="border-2">
                Рецепт
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="advantages" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Преимущества
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300 animate-scale-in">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Доступность круглосуточно</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Доступность круглосуточно, независимо от местоположения пользователя.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Полная информация</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Возможность представить полную информацию о продукте.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Rocket" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Гибкость и масштабируемость</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Сайт можно обновлять и дополнять новыми материалами.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Услуги
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Code" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Разработка сайтов</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Создаем современные веб-сайты с адаптивным дизайном, 
                      оптимизированные для всех устройств и браузеров.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Smartphone" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Мобильная адаптация</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Адаптируем ваш сайт для мобильных устройств, 
                      обеспечивая удобство использования на любом экране.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Search" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">SEO-оптимизация</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Повышаем видимость вашего сайта в поисковых системах, 
                      привлекая больше целевых посетителей.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Wrench" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Поддержка и обслуживание</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Обеспечиваем техническую поддержку и регулярное 
                      обновление вашего веб-сайта.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Контакты
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Свяжитесь с нами, чтобы обсудить ваш проект
            </p>
            <Card className="border-2">
              <CardContent className="pt-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Имя
                    </label>
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Сообщение
                    </label>
                    <Textarea
                      placeholder="Расскажите о вашем проекте..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-2 min-h-[150px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-2">
            <span className="font-bold">sirius55</span> — Веб-разработка
          </p>
          <p className="text-sm opacity-80">
            © 2025 Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;