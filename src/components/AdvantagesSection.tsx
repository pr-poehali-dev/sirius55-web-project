import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const AdvantagesSection = () => {
  return (
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
  );
};

export default AdvantagesSection;
