import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onRecipeClick: () => void;
}

const HeroSection = ({ onRecipeClick }: HeroSectionProps) => {
  return (
    <section id="home" className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
            Рецепт хорошего настроения
          </h1>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="outline" className="border-2" onClick={onRecipeClick}>
              Рецепт
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
