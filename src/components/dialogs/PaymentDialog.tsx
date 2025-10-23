import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { getRecipeContentByPlan } from "@/utils/recipeContent";

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: 'basic' | 'premium' | 'vip' | null;
  paymentStep: 'payment' | 'checking' | 'recipe';
  onPaymentConfirm: () => void;
}

const PaymentDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedPlan, 
  paymentStep, 
  onPaymentConfirm 
}: PaymentDialogProps) => {
  const recipeContent = selectedPlan ? getRecipeContentByPlan(selectedPlan) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-4">
            {paymentStep === 'payment' && '💳 Оплата рецептов'}
            {paymentStep === 'checking' && '⏳ Проверка платежа'}
            {paymentStep === 'recipe' && recipeContent && `✨ ${recipeContent.title}`}
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
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-500/30">
                  <div className="flex items-start gap-3 mb-4">
                    <Icon name="MessageCircle" className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Отправьте чек в Telegram:</h4>
                      <p className="text-sm text-muted-foreground">
                        После оплаты перейдите в наш Telegram и отправьте скриншот чека. 
                        Мы проверим платеж и сразу вышлем вам рецепты!
                      </p>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={onPaymentConfirm}
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить чек в Telegram
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
            
            {paymentStep === 'recipe' && recipeContent && (
              <div className="space-y-6 py-4">
                <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg text-center">
                  <p className="text-green-700 font-bold text-lg">
                    ✅ Платеж подтвержден! Спасибо за покупку!
                  </p>
                </div>
                
                {recipeContent.recipes.map((recipe, index) => (
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
  );
};

export default PaymentDialog;