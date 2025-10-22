import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface RecipesSectionProps {
  onBuyRecipe: (plan: 'basic' | 'premium' | 'vip') => void;
}

const RecipesSection = ({ onBuyRecipe }: RecipesSectionProps) => {
  return (
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
              <Button className="w-full" onClick={() => onBuyRecipe('basic')}>
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
              <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => onBuyRecipe('premium')}>
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
              <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => onBuyRecipe('vip')}>
                Купить рецепты
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
