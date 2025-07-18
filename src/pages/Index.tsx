import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Music, Search, Sparkles, Calendar, Users, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import FestivalExamples from "@/components/FestivalExamples";
import PaymentModal from "@/components/PaymentModal";
import ClientExperiences from "@/components/ClientExperiences";
import ClientDetailsForm, { ClientFormData } from "@/components/ClientDetailsForm";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const { toast } = useToast();
  const { submitForm, isSubmitting } = useFormSubmission();
  const { t } = useTranslation();

  const demoFestival = {
    name: "Electric Paradise Festival",
    price: 299,
    dates: "July 15-17, 2024",
    location: "Barcelona, Spain",
    capacity: 50000
  };

  const handleAiQuery = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a question",
        description: "Ask me anything about festivals, destinations, or music!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          query: searchQuery,
          query_type: 'general'
        }
      });

      if (error) throw error;
      
      setAiResponse(data.response);
      toast({
        title: "AI Response Ready",
        description: "I've found some great recommendations for you!",
      });
    } catch (error) {
      console.error('Error calling AI:', error);
      toast({
        title: "Error",
        description: "Sorry, I couldn't process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAiQuery();
    }
  };

  const handleFormSubmit = async (formData: ClientFormData) => {
    try {
      // Add the search query and AI response to the form data
      const completeFormData = {
        ...formData,
        originalQuery: searchQuery,
        aiRecommendation: aiResponse
      };

      await submitForm(completeFormData);
      setShowDetailsForm(false);
      
      toast({
        title: "Quote Request Submitted",
        description: "We'll process your information and send you a personalized quote within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen gradient-night">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/775daf48-10bf-458d-969d-5c45bcd50140.png" 
                alt="Groove Nomad Logo" 
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold gradient-sunset bg-clip-text text-transparent">
                Groove Nomad
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="#festivals" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.festivals')}
                </Link>
                <Link to="#destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.destinations')}
                </Link>
                <Link to="/lockers" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.lockers')}
                </Link>
                <Link to="/playlist-matcher" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.playlist_matcher')}
                </Link>
              </nav>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                {t('hero.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t('hero.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-4 py-6 text-lg bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
                <Button 
                  size="lg" 
                  onClick={handleAiQuery}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 glow-primary disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isLoading ? t('hero.thinking') : t('hero.ask_ai')}
                </Button>
            </div>

            {/* AI Response */}
            {aiResponse && (
              <div className="max-w-4xl mx-auto mb-8">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t('ai_response.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-foreground whitespace-pre-wrap">{aiResponse}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border flex gap-3 flex-wrap">
                      <Button 
                        onClick={() => setShowDetailsForm(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        {t('action.get_quote')}
                      </Button>
                      <Button 
                        onClick={() => setPaymentModalOpen(true)}
                        variant="outline"
                        className="border-primary/50 text-primary hover:bg-primary/10"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {t('action.quick_book')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary group">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg group-hover:text-primary transition-colors">
                    <MapPin className="w-5 h-5 mr-2" />
                    {t('quick_actions.find_destinations')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('quick_actions.find_destinations_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-secondary group cursor-pointer"
                    onClick={() => setShowDetailsForm(true)}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg group-hover:text-secondary transition-colors">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {t('action.get_quote')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('action.personalized')}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent group">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg group-hover:text-accent transition-colors">
                    <Users className="w-5 h-5 mr-2" />
                    {t('quick_actions.discover_artists')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('quick_actions.discover_artists_desc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Client Details Form */}
      {showDetailsForm && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <ClientDetailsForm 
              onSubmit={handleFormSubmit} 
              aiResponse={aiResponse}
            />
            <div className="text-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => setShowDetailsForm(false)}
                className="text-muted-foreground hover:text-primary"
              >
                {t('common.cancel')}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Example Festival Adventures Section */}
      <ClientExperiences />
      
      {/* Featured Festivals Section */}
      <FestivalExamples />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">
              {t('features.title')} <span className="gradient-sunset bg-clip-text text-transparent">{t('features.ai_intelligence')}</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-primary" />
                  {t('features.smart_recommendations')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('features.smart_recommendations_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border/50 hover:border-secondary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-secondary" />
                  {t('features.global_coverage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('features.global_coverage_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border/50 hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="w-6 h-6 mr-2 text-accent" />
                  {t('features.music_discovery')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('features.music_discovery_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/775daf48-10bf-458d-969d-5c45bcd50140.png" 
                alt="Groove Nomad Logo" 
                className="w-6 h-6"
              />
              <span className="text-lg font-semibold">Groove Nomad</span>
            </div>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <div className="flex items-center space-x-4 mb-2">
                <a 
                  href="/legal" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Mentions légales
                </a>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('footer.subtitle')}
              </p>
              <a 
                href="https://discord.gg/SFVTpTDnEA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                {t('footer.discord')}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <PaymentModal 
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        festival={demoFestival}
      />
    </div>
  );
};

export default Index;
