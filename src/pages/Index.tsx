import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-foreground">
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
          <Button size="sm" onClick={() => setIsContactOpen(true)} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <span className="hidden sm:inline">Связаться</span>
            <span className="sm:hidden">☎️</span>
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
              <Button size="lg" variant="outline" className="border-2" onClick={() => setIsRecipeOpen(true)}>
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
            <span className="font-bold">sirius55</span> — Сделано с любовью
          </p>
          <p className="text-sm opacity-80">
            © 2025 Все права защищены
          </p>
        </div>
      </footer>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary mb-4">
              📞 Контакты
            </DialogTitle>
            <DialogDescription className="text-base space-y-4">
              <div className="text-center py-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Телефон для связи:</p>
                  <a 
                    href="tel:+79025747783" 
                    className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    +7 (902) 574-77-83
                  </a>
                </div>
                <div className="flex flex-col gap-3 mt-6">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => window.location.href = 'tel:+79025747783'}
                  >
                    <Icon name="Phone" className="mr-2" size={20} />
                    Позвонить
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2"
                    onClick={() => window.open('https://wa.me/79025747783', '_blank')}
                  >
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    WhatsApp
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2"
                    onClick={() => window.open('https://t.me/79025747783', '_blank')}
                  >
                    <Icon name="Send" className="mr-2" size={20} />
                    Telegram
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isRecipeOpen} onOpenChange={setIsRecipeOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary mb-4">
              🌟 Рецепт хорошего настроения
            </DialogTitle>
            <DialogDescription className="text-base space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Ингредиенты:</h3>
                <ul className="space-y-2 ml-4">
                  <li>☀️ <strong>1 чашка утреннего солнечного света</strong> — начните день с улыбки и позитивных мыслей</li>
                  <li>🎵 <strong>2 столовые ложки любимой музыки</strong> — включите треки, которые заряжают энергией</li>
                  <li>💚 <strong>3 порции благодарности</strong> — вспомните 3 вещи, за которые вы благодарны сегодня</li>
                  <li>🚶 <strong>30 минут движения</strong> — прогулка, танцы или легкая зарядка</li>
                  <li>📚 <strong>1 глава интересной книги</strong> — или любимый подкаст для вдохновения</li>
                  <li>☕ <strong>Чашка ароматного напитка</strong> — кофе, чай или горячий шоколад</li>
                  <li>💬 <strong>Щепотка общения</strong> — позвоните другу или обнимите близкого человека</li>
                  <li>🌱 <strong>15 минут любимого хобби</strong> — рисование, вязание, игра на инструменте</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Способ приготовления:</h3>
                <ol className="space-y-3 ml-4 list-decimal">
                  <li>
                    <strong>Шаг 1:</strong> Проснувшись, потянитесь и улыбнитесь. Добавьте порцию солнечного света — откройте шторы или выйдите на балкон.
                  </li>
                  <li>
                    <strong>Шаг 2:</strong> Включите любимую музыку и начните утро в ритме позитива. Пусть мелодия настроит на нужную волну.
                  </li>
                  <li>
                    <strong>Шаг 3:</strong> Возьмите блокнот и запишите 3 вещи, за которые благодарны. Это могут быть простые радости: вкусный завтрак, уютная постель, звонок от друга.
                  </li>
                  <li>
                    <strong>Шаг 4:</strong> Добавьте движение — сделайте зарядку, прогуляйтесь или потанцуйте. Физическая активность усиливает выработку эндорфинов.
                  </li>
                  <li>
                    <strong>Шаг 5:</strong> Заварите любимый напиток и насладитесь моментом. Медленно, с удовольствием.
                  </li>
                  <li>
                    <strong>Шаг 6:</strong> Посвятите время общению — позвоните родным, напишите другу или просто обнимите того, кто рядом.
                  </li>
                  <li>
                    <strong>Шаг 7:</strong> Уделите 15 минут любимому занятию. Это ваше личное время для души.
                  </li>
                  <li>
                    <strong>Шаг 8:</strong> Перед сном вспомните лучшие моменты дня и улыбнитесь.
                  </li>
                </ol>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">✨ Секретный совет шеф-повара:</h3>
                <p className="text-foreground">
                  Настроение — как тесто: чем больше вы его "замешиваете" позитивными мыслями и действиями, 
                  тем лучше оно "поднимается". Не забывайте добавлять щепотку юмора и не бойтесь экспериментировать 
                  с ингредиентами — у каждого свой идеальный рецепт счастья!
                </p>
              </div>

              <div className="text-center pt-4">
                <p className="text-lg font-semibold text-secondary">
                  Приятного настроения! 🎉
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;