import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface RecipeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecipeDialog = ({ isOpen, onOpenChange }: RecipeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                  <strong>Шаг 5:</strong> Прочитайте главу книги или послушайте вдохновляющий подкаст. Наполните разум новыми идеями.
                </li>
                <li>
                  <strong>Шаг 6:</strong> Приготовьте и насладитесь чашкой любимого напитка. Пейте медленно, наслаждаясь моментом.
                </li>
                <li>
                  <strong>Шаг 7:</strong> Позвоните другу, напишите близкому или обнимите того, кто рядом. Человеческое тепло — важный ингредиент!
                </li>
                <li>
                  <strong>Шаг 8:</strong> Завершите рецепт, занявшись любимым делом хотя бы 15 минут. Это ваше время для души.
                </li>
              </ol>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20 mt-6">
              <h3 className="text-lg font-bold text-foreground mb-2">💡 Совет шефа:</h3>
              <p className="text-muted-foreground leading-relaxed">
                Этот рецепт работает лучше всего при регулярном использовании. Повторяйте ежедневно, 
                добавляя свои уникальные ингредиенты. Помните: хорошее настроение — это не случайность, 
                а результат правильных привычек!
              </p>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground italic">
                Приятного настроения! 🌈✨
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDialog;
