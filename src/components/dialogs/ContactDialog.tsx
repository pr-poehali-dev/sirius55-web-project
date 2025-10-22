import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ isOpen, onOpenChange }: ContactDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default ContactDialog;
