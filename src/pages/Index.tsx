import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import RecipesSection from "@/components/RecipesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/dialogs/ContactDialog";
import RecipeDialog from "@/components/dialogs/RecipeDialog";
import PaymentDialog from "@/components/dialogs/PaymentDialog";

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

  const handlePaymentConfirm = () => {
    setPaymentStep('checking');
    setTimeout(() => {
      setPaymentStep('recipe');
    }, 7000);
  };

  const handlePaymentDialogChange = (open: boolean) => {
    setIsPaymentOpen(open);
    if (!open) {
      setPaymentStep('payment');
    }
  };

  return (
    <div className="min-h-screen">
      <Header onContactClick={() => setIsContactOpen(true)} />
      
      <HeroSection onRecipeClick={() => setIsRecipeOpen(true)} />
      
      <AdvantagesSection />
      
      <RecipesSection onBuyRecipe={handleBuyRecipe} />
      
      <ContactSection 
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      
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
