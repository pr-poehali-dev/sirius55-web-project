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
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'vip' | null>(null);
  const [paymentStep, setPaymentStep] = useState<'payment' | 'checking' | 'recipe'>('payment');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleBuyRecipe = (plan: 'basic' | 'premium' | 'vip') => {
    setSelectedPlan(plan);
    setPaymentStep('payment');
    setIsPaymentOpen(true);
  };

  const handlePaymentConfirm = () => {
    setPaymentStep('checking');
    setTimeout(() => {
      setPaymentStep('recipe');
    }, 7000);
  };

  const getRecipeContent = () => {
    if (selectedPlan === 'basic') {
      return {
        title: 'Базовые рецепты хорошего настроения',
        recipes: [
          {
            name: '☀️ Утренний энергетик',
            ingredients: ['1 стакан теплой воды', '1 ч.л. меда', 'Долька лимона', 'Щепотка корицы'],
            steps: 'Смешайте все ингредиенты в теплой воде. Выпейте натощак за 20 минут до завтрака. Этот напиток запустит метаболизм и подарит заряд бодрости на весь день!'
          },
          {
            name: '🎵 Музыкальная медитация',
            ingredients: ['Наушники', 'Ваша любимая песня', '5 минут времени'],
            steps: 'Закройте глаза, включите любимую музыку на полную громкость. Сосредоточьтесь только на звуках. Позвольте музыке наполнить вас эмоциями.'
          },
          {
            name: '🌳 Прогулка осознанности',
            ingredients: ['Парк или тихая улица', '15 минут', 'Комфортная обувь'],
            steps: 'Выйдите на улицу без телефона. Обращайте внимание на детали: цвета, звуки, запахи. Почувствуйте землю под ногами. Дышите глубоко.'
          }
        ]
      };
    } else if (selectedPlan === 'premium') {
      return {
        title: 'Премиум рецепты хорошего настроения',
        recipes: [
          {
            name: '✨ Магический смузи счастья',
            ingredients: ['1 банан', '1 стакан черники', '1 ч.л. какао', '200мл миндального молока', '1 ст.л. арахисовой пасты', 'Лед'],
            steps: 'Взбейте все в блендере до однородности. Этот напиток активирует выработку серотонина благодаря сочетанию триптофана и природных антиоксидантов!'
          },
          {
            name: '🎨 Арт-терапия за 10 минут',
            ingredients: ['Лист бумаги А4', 'Цветные карандаши или маркеры', 'Таймер'],
            steps: 'Поставьте таймер на 10 минут. Рисуйте свои эмоции абстрактными линиями и формами. Не думайте о результате - только процесс!'
          },
          {
            name: '🧘 Дыхание 4-7-8',
            ingredients: ['Удобное место', 'Тишина', '5 минут'],
            steps: 'Вдох через нос на 4 счета → Задержка дыхания на 7 счетов → Выдох через рот на 8 счетов. Повторите 4 раза. Техника снижает кортизол на 30%!'
          },
          {
            name: '☕️ Ритуал благодарности',
            ingredients: ['Любимый напиток', 'Блокнот', 'Ручка'],
            steps: 'Каждое утро за чашкой кофе/чая записывайте 3 вещи, за которые благодарны сегодня. Научно доказано: это повышает уровень счастья на 25%!'
          },
          {
            name: '🌅 Золотой час',
            ingredients: ['Рассвет или закат', 'Место с видом на небо', 'Камера телефона'],
            steps: 'Найдите красивое место на закате или рассвете. Сделайте 5-10 фото неба. Сохраните лучшие для трудных дней.'
          },
          {
            name: '🎯 Микро-победы',
            ingredients: ['Стикеры', 'Список маленьких дел', 'Таймер 25 минут'],
            steps: 'Выберите 3 маленьких задачи. Выполните каждую за 25 минут по технике Pomodoro. Отмечайте галочкой. Каждая победа повышает дофамин!'
          },
          {
            name: '💃 Танец без правил',
            ingredients: ['Закрытая комната', 'Энергичная музыка', '10 минут'],
            steps: 'Включите громко музыку и танцуйте как хотите. Без стеснения, без правил. Движение высвобождает эндорфины мгновенно!'
          }
        ]
      };
    } else {
      return {
        title: 'VIP рецепты хорошего настроения',
        recipes: [
          {
            name: '🌟 Эликсир радости шефа',
            ingredients: ['2 см свежего имбиря', '1 ч.л. куркумы', '1 апельсин', '300мл кокосовой воды', '1 ч.л. меда манука', '3 листика мяты', 'Черный перец на кончике ножа'],
            steps: 'Натрите имбирь, выжмите сок апельсина. Смешайте с куркумой и черным перцем (он усиливает усвоение куркумы на 2000%). Добавьте кокосовую воду, мед и мяту. Выпейте медленно. Этот напиток - мощнейший природный антидепрессант!'
          },
          {
            name: '🎭 Театр одного актера',
            ingredients: ['Зеркало в полный рост', '30 минут', 'Список из 5 эмоций'],
            steps: 'Встаньте перед зеркалом. Изобразите каждую эмоцию (радость, грусть, восторг, умиротворение, сила) в течение 5 минут. Проживите ее телом. Исследования показывают: мимика меняет химию мозга!'
          },
          {
            name: '🧬 Биохакинг сна',
            ingredients: ['Магний цитрат 400мг', 'Мелатонин 1-3мг', 'Лаванда (аромамасло)', 'Маска для сна', 'Затемненная комната 18-20°C'],
            steps: 'За час до сна примите добавки. Нанесите каплю лаванды на подушку. Создайте идеальные условия. Качественный сон - основа хорошего настроения!'
          },
          {
            name: '🏔️ Визуализация мечты',
            ingredients: ['Медитативная музыка', 'Удобное кресло', '20 минут', 'Блокнот после'],
            steps: 'Закройте глаза. Представьте свою жизнь через год в мельчайших деталях: запахи, звуки, эмоции. Визуализируйте 15 минут. Запишите ощущения. Практикуйте ежедневно!'
          },
          {
            name: '🍫 Церемония какао',
            ingredients: ['30г сырого какао', '250мл растительного молока', '1 ч.л. кокосового масла', 'Корица, ваниль, кайенский перец', 'Тишина и спокойствие'],
            steps: 'Подогрейте молоко, добавьте какао и специи. Взбейте. Пейте медленно, осознанно, с благодарностью. Теобромин в какао - природный стимулятор счастья!'
          },
          {
            name: '📿 108 благодарностей',
            ingredients: ['Четки или 108 камешков', 'Тихое место', '30-40 минут', 'Список благодарностей'],
            steps: 'Перебирайте четки/камешки, на каждый называя то, за что благодарны. От больших вещей до мелочей. Эта практика перепрограммирует мозг на позитив!'
          },
          {
            name: '🎪 Спонтанное приключение',
            ingredients: ['Свободные 3 часа', 'Случайное направление', 'Открытость новому', 'Телефон для фото'],
            steps: 'Выйдите из дома. На каждом перекрестке подбрасывайте монетку: орел-направо, решка-налево. Исследуйте незнакомое место. Новизна активирует центры удовольствия!'
          },
          {
            name: '🔥 Письмо и огонь',
            ingredients: ['Бумага и ручка', 'Безопасное место для костра', 'Спички', 'Металлическая чаша'],
            steps: 'Напишите все негативные мысли и переживания на бумагу. Затем сожгите ее в безопасном месте. Наблюдайте, как проблемы превращаются в дым. Символический ритуал освобождения!'
          },
          {
            name: '🌊 Ледяная медитация Вима Хофа',
            ingredients: ['Холодный душ', '3 минуты', 'Правильное дыхание', 'Сила воли'],
            steps: 'Начните с теплого душа. Затем 30 секунд холодной воды, фокусируясь на дыхании. Постепенно доведите до 3 минут. Холод запускает выброс эндорфинов и норадреналина!'
          },
          {
            name: '📞 Звонок из прошлого',
            ingredients: ['Телефон', '30 минут времени', 'Контакт человека, который важен'],
            steps: 'Позвоните тому, с кем давно не общались, но кто был важен. Скажите, что вспомнили о нем. Поделитесь благодарностью. Социальные связи - ключ к счастью!'
          },
          {
            name: '🎁 Анонимная доброта',
            ingredients: ['Небольшая сумма денег или подарок', 'Незнакомый человек', 'Анонимность'],
            steps: 'Сделайте доброе дело незнакомцу: оплатите чей-то кофе, оставьте приятную записку, помогите бескорыстно. Не ждите благодарности. Альтруизм повышает счастье сильнее, чем получение!'
          },
          {
            name: '🧠 Нейропластичность через новое',
            ingredients: ['Новое хобби', '30 дней практики', 'Ежедневные 20 минут'],
            steps: 'Выберите то, чего никогда не делали: жонглирование, новый язык, музыкальный инструмент. Практикуйте ежедневно. Новые нейронные связи = новые источники радости!'
          },
          {
            name: '🌙 Ночной дневник сновидений',
            ingredients: ['Блокнот у кровати', 'Ручка', 'Намерение запомнить сны'],
            steps: 'Перед сном скажите себе: "Я запомню свои сны". Просыпаясь, сразу записывайте все, что помните. Анализ снов открывает подсознание!'
          },
          {
            name: '🏃 Интервальная эйфория',
            ingredients: ['Беговая дорожка или улица', '20 минут', 'Пульсометр (опционально)'],
            steps: '30 сек спринт → 90 сек легкий бег. Повторите 8 раз. Такой режим максимально активирует выброс эндорфинов - естественного морфина организма!'
          },
          {
            name: '🎨 Коллаж будущего',
            ingredients: ['Журналы', 'Ножницы', 'Клей', 'Большой лист картона', '2 часа'],
            steps: 'Вырезайте образы вашего идеального будущего: места, эмоции, достижения. Создайте визуальную карту мечты. Повесьте на видное место. Смотрите ежедневно!'
          }
        ]
      };
    }
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
            <a href="#recipes" className="text-foreground hover:text-primary transition-colors">
              Рецепты
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
                  Сайт обновляется регулярно дополняя новыми материалами.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="recipes" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Приватные рецепты от шефа
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
            Эксклюзивные рецепты хорошего настроения, доступные для покупки
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Star" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Базовый</h3>
                <p className="text-center text-muted-foreground mb-6 leading-relaxed">
                  3 эксклюзивных рецепта для поднятия настроения на каждый день
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-primary">20₽</span>
                </div>
                <Button className="w-full" onClick={() => handleBuyRecipe('basic')}>
                  Купить рецепты
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary hover:border-secondary transition-all duration-300 hover:shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
                Популярный
              </div>
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Award" size={32} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Премиум</h3>
                <p className="text-center text-muted-foreground mb-6 leading-relaxed">
                  7 уникальных рецептов + секретные ингредиенты для особых случаев
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-secondary">40₽</span>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => handleBuyRecipe('premium')}>
                  Купить рецепты
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Crown" size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">VIP</h3>
                <p className="text-center text-muted-foreground mb-6 leading-relaxed">
                  15 авторских рецептов + личная консультация шефа + бонусы
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-accent">100₽</span>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => handleBuyRecipe('vip')}>
                  Купить рецепты
                </Button>
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

      <Dialog open={isPaymentOpen} onOpenChange={(open) => {
        setIsPaymentOpen(open);
        if (!open) {
          setPaymentStep('payment');
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary mb-4">
              {paymentStep === 'payment' && '💳 Оплата рецептов'}
              {paymentStep === 'checking' && '⏳ Проверка платежа'}
              {paymentStep === 'recipe' && `✨ ${getRecipeContent().title}`}
            </DialogTitle>
            <DialogDescription className="text-base">
              {paymentStep === 'payment' && (
                <div className="space-y-6">
                  <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
                    <h3 className="font-bold text-lg text-foreground mb-4">Реквизиты для оплаты:</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Номер карты:</p>
                        <p className="text-2xl font-mono font-bold text-foreground tracking-wider">
                          2202 2081 1781 4872
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Банк:</p>
                        <p className="text-lg font-semibold text-foreground">Сбер Банк</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Получатель:</p>
                        <p className="text-lg font-semibold text-foreground">Артем Сергеевич Б.</p>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground mb-1">Сумма к оплате:</p>
                        <p className="text-3xl font-bold text-primary">
                          {selectedPlan === 'basic' && '20₽'}
                          {selectedPlan === 'premium' && '40₽'}
                          {selectedPlan === 'vip' && '100₽'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                    <p className="text-sm text-muted-foreground text-center">
                      После перевода нажмите кнопку "Я оплатил(а)" ниже
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handlePaymentConfirm}
                  >
                    <Icon name="Check" className="mr-2" size={20} />
                    Я оплатил(а)
                  </Button>
                </div>
              )}
              
              {paymentStep === 'checking' && (
                <div className="py-12 text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Проверяем ваш платеж...
                    </h3>
                    <p className="text-muted-foreground">
                      Это займет несколько секунд
                    </p>
                  </div>
                </div>
              )}
              
              {paymentStep === 'recipe' && (
                <div className="space-y-6 py-4">
                  <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg text-center">
                    <p className="text-green-700 font-bold text-lg">
                      ✅ Платеж подтвержден! Спасибо за покупку!
                    </p>
                  </div>
                  
                  {getRecipeContent().recipes.map((recipe, index) => (
                    <div key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border-2 border-primary/20">
                      <h3 className="text-2xl font-bold text-foreground mb-4">{recipe.name}</h3>
                      
                      <div className="mb-4">
                        <h4 className="font-bold text-foreground mb-2 flex items-center">
                          <Icon name="ShoppingBasket" className="mr-2" size={18} />
                          Ингредиенты:
                        </h4>
                        <ul className="space-y-1 ml-6">
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i} className="text-muted-foreground">• {ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-foreground mb-2 flex items-center">
                          <Icon name="BookOpen" className="mr-2" size={18} />
                          Способ приготовления:
                        </h4>
                        <p className="text-muted-foreground leading-relaxed ml-6">
                          {recipe.steps}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground italic">
                      Приятного настроения! 🌟
                    </p>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;