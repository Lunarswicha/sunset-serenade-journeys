import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin, Calendar, Users, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  festival?: {
    name: string;
    price: number;
    dates: string;
    location: string;
    capacity: number;
  };
}

const PaymentModal = ({ open, onOpenChange, festival }: PaymentModalProps) => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      toast({
        title: t('payment.success_title'),
        description: t('payment.success_description'),
      });
    }, 2000);
  };

  const resetModal = () => {
    setPaymentComplete(false);
    onOpenChange(false);
  };

  if (!festival) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!paymentComplete ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary" />
                {t('payment.complete_booking')}
              </DialogTitle>
              <DialogDescription>
                {t('payment.secure_spot', { festival: festival.name })}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Festival Details */}
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{festival.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {festival.dates}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {festival.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {t('payment.capacity', { count: festival.capacity })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('payment.email')}</Label>
                  <Input id="email" type="email" placeholder={t('payment.email_placeholder')} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card">{t('payment.card_number')}</Label>
                  <Input id="card" placeholder={t('payment.card_number_placeholder')} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">{t('payment.expiry')}</Label>
                    <Input id="expiry" placeholder={t('payment.expiry_placeholder')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">{t('payment.cvc')}</Label>
                    <Input id="cvc" placeholder={t('payment.cvc_placeholder')} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>{t('payment.total')}</span>
                <span className="text-primary">€{festival.price}</span>
              </div>

              {/* Payment Button */}
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('payment.processing')}
                  </div>
                ) : (
                  t('payment.pay_amount', { amount: festival.price })
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-600">{t('payment.success_title')}</h3>
              <p className="text-muted-foreground">
                {t('payment.success_message', { festival: festival.name })}
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>🎫 {t('payment.confirmation_sent')}</p>
              <p>📱 {t('payment.digital_tickets')}</p>
              <p>🎉 {t('payment.get_ready')}</p>
            </div>

            <Button onClick={resetModal} className="w-full">
              {t('payment.done')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;