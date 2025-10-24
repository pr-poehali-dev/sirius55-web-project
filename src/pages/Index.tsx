import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import RecipesSection from "@/components/RecipesSection";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/dialogs/ContactDialog";
import RecipeDialog from "@/components/dialogs/RecipeDialog";
import PaymentDialog from "@/components/dialogs/PaymentDialog";
import FloatingWasabi from "@/components/FloatingWasabi";

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

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBuyRecipe = (plan: 'basic' | 'premium' | 'vip') => {
    setSelectedPlan(plan);
    setPaymentStep('payment');
    setIsPaymentOpen(true);
  };

  const handlePaymentConfirm = async () => {
    if (!selectedPlan) return;
    
    const authData = localStorage.getItem("user_auth");
    let userId = null;
    
    if (authData) {
      const { user } = JSON.parse(authData);
      userId = user.id;
    }
    
    try {
      const response = await fetch('https://functions.poehali.dev/d96bb7ad-f8bd-44f3-b361-075be7fd0e8f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          user_contact: formData.email || formData.name,
          user_id: userId
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const userIdText = userId ? `%0AID%20пользователя:%20${userId}` : '';
        const telegramUrl = `https://t.me/79836232746?text=Заказ%20${data.order_id}%20-%20${selectedPlan}%20план%20(${data.amount}₽)${userIdText}`;
        window.open(telegramUrl, '_blank');
        setIsPaymentOpen(false);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handlePaymentDialogChange = (open: boolean) => {
    setIsPaymentOpen(open);
    if (!open) {
      setPaymentStep('payment');
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingWasabi />
      <Header onContactClick={() => setIsContactOpen(true)} />
      
      <HeroSection onRecipeClick={() => setIsRecipeOpen(true)} />
      
      <AdvantagesSection />
      
      <RecipesSection onBuyRecipe={handleBuyRecipe} />
      
      <Footer />

      <ContactDialog 
        isOpen={isContactOpen} 
        onOpenChange={setIsContactOpen} 
      />

      <RecipeDialog 
        isOpen={isRecipeOpen} 
        onOpenChange={setIsRecipeOpen} 
      />

      <PaymentDialog
        isOpen={isPaymentOpen}
        onOpenChange={handlePaymentDialogChange}
        selectedPlan={selectedPlan}
        paymentStep={paymentStep}
        onPaymentConfirm={handlePaymentConfirm}
      />
    </div>
  );
};

export default Index;