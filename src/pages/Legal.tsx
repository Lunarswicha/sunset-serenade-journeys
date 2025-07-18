import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Shield, FileText, HelpCircle, ArrowLeft } from 'lucide-react';

const Legal = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center mb-4">
            <Button asChild variant="ghost" className="absolute left-4">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Mentions Légales
          </h1>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Conditions générales, protection des données et informations légales
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="cgv" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="cgv" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              CGV
            </TabsTrigger>
            <TabsTrigger value="rgpd" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              RGPD
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* CGV Tab */}
          <TabsContent value="cgv">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Conditions Générales de Vente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">1. Objet</h3>
                  <p className="text-muted-foreground">
                    Les présentes conditions générales de vente régissent les relations entre Groove Nomad et ses clients dans le cadre de la vente de services de voyage et d'événements musicaux.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">2. Services proposés</h3>
                  <p className="text-muted-foreground mb-2">
                    Groove Nomad propose les services suivants :
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Recommandations personnalisées de festivals musicaux</li>
                    <li>Billetterie pour événements musicaux</li>
                    <li>Services de voyage et d'hébergement</li>
                    <li>Conseils et assistance pour l'organisation de voyages musicaux</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">3. Prix et paiement</h3>
                  <p className="text-muted-foreground">
                    Les prix sont indiqués en euros TTC. Le paiement s'effectue en ligne de manière sécurisée. Nous acceptons les cartes bancaires et PayPal. Les prix peuvent être modifiés à tout moment mais ne s'appliquent qu'aux commandes futures.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">4. Annulation et remboursement</h3>
                  <p className="text-muted-foreground">
                    Les conditions d'annulation varient selon le type de service. Pour les billets de festival, l'annulation est possible jusqu'à 48h avant l'événement avec remboursement de 80% du montant. Pour les services de voyage, les conditions des prestataires s'appliquent.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">5. Responsabilité</h3>
                  <p className="text-muted-foreground">
                    Groove Nomad agit en tant qu'intermédiaire entre les clients et les organisateurs d'événements. Notre responsabilité est limitée au montant des services vendus. Nous ne sommes pas responsables des annulations d'événements par les organisateurs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RGPD Tab */}
          <TabsContent value="rgpd">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Protection des Données (RGPD)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">1. Responsable du traitement</h3>
                  <p className="text-muted-foreground">
                    Groove Nomad, société par actions simplifiée au capital de 10 000€, immatriculée au RCS de Paris sous le numéro 123 456 789, dont le siège social est situé au 123 Rue de la Musique, 75001 Paris.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">2. Données collectées</h3>
                  <p className="text-muted-foreground mb-2">
                    Nous collectons les données suivantes :
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Données d'identification (nom, prénom, email)</li>
                    <li>Données de navigation (cookies, IP)</li>
                    <li>Préférences musicales et de voyage</li>
                    <li>Données de paiement (via processeurs sécurisés)</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">3. Finalités du traitement</h3>
                  <p className="text-muted-foreground mb-2">
                    Vos données sont utilisées pour :
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>La fourniture de nos services</li>
                    <li>L'amélioration de nos recommandations</li>
                    <li>La communication marketing (avec votre consentement)</li>
                    <li>Le respect de nos obligations légales</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">4. Vos droits</h3>
                  <p className="text-muted-foreground">
                    Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité de vos données et d'opposition au traitement. Pour exercer ces droits, contactez-nous à privacy@groovenomad.com.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">5. Conservation des données</h3>
                  <p className="text-muted-foreground">
                    Nous conservons vos données pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, et dans le respect des délais légaux de conservation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-6 h-6" />
                  Questions Fréquemment Posées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Comment fonctionne Groove Nomad ?</h3>
                  <p className="text-muted-foreground">
                    Groove Nomad utilise l'intelligence artificielle pour analyser vos goûts musicaux et vous recommander les festivals qui vous correspondent le mieux. Il suffit de renseigner vos artistes préférés et vos contraintes de voyage.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">Les recommandations sont-elles vraiment personnalisées ?</h3>
                  <p className="text-muted-foreground">
                    Oui ! Notre algorithme analyse votre profil musical, vos préférences de voyage, votre budget et vos disponibilités pour vous proposer les événements les plus adaptés.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">Puis-je annuler ma réservation ?</h3>
                  <p className="text-muted-foreground">
                    Les conditions d'annulation dépendent du type de service. Pour les billets de festival, vous pouvez généralement annuler jusqu'à 48h avant l'événement. Consultez nos CGV pour plus de détails.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">Groove Nomad organise-t-il directement les festivals ?</h3>
                  <p className="text-muted-foreground">
                    Non, nous agissons comme intermédiaire entre vous et les organisateurs d'événements. Nous vous aidons à découvrir et réserver, mais nous ne sommes pas les organisateurs des festivals.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">Comment puis-je contacter le support ?</h3>
                  <p className="text-muted-foreground">
                    Vous pouvez nous contacter via notre Discord communautaire, par email à support@groovenomad.com, ou utiliser le chat en direct sur notre site web.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3">Mes données personnelles sont-elles sécurisées ?</h3>
                  <p className="text-muted-foreground">
                    Absolument. Nous respectons strictement le RGPD et utilisons des technologies de chiffrement avancées pour protéger vos données. Consultez notre politique de confidentialité pour plus d'informations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Legal;