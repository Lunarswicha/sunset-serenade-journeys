import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Lock, Clock, Shield, CreditCard, PackageCheck, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Lockers = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen gradient-night">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back_to_home')}
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-sunset bg-clip-text text-transparent animate-gradient">
                {t('lockers.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('lockers.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lock className="w-5 h-5 mr-2 text-primary" />
                  {t('lockers.features.secure_storage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('lockers.features.secure_storage_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-secondary" />
                  {t('lockers.features.convenient_locations')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('lockers.features.convenient_locations_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-accent" />
                  {t('lockers.features.flexible_hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('lockers.features.flexible_hours_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            {t('lockers.pricing.title')} <span className="gradient-sunset bg-clip-text text-transparent">{t('lockers.pricing.transparent')}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Small Locker</CardTitle>
                <p className="text-3xl font-bold text-primary">€10</p>
                <p className="text-muted-foreground">per day</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <PackageCheck className="w-4 h-4 mr-2 text-primary" />
                    Perfect for small bags
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    Insurance included
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    24/7 access
                  </li>
                </ul>
                <Button className="w-full mt-6">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Medium Locker</CardTitle>
                <p className="text-3xl font-bold text-secondary">€15</p>
                <p className="text-muted-foreground">per day</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <PackageCheck className="w-4 h-4 mr-2 text-secondary" />
                    Fits backpacks & more
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-secondary" />
                    Premium insurance
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-secondary" />
                    Priority access
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-secondary hover:bg-secondary/90">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Large Locker</CardTitle>
                <p className="text-3xl font-bold text-accent">€20</p>
                <p className="text-muted-foreground">per day</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <PackageCheck className="w-4 h-4 mr-2 text-accent" />
                    Large luggage capacity
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-accent" />
                    Extended insurance
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-accent" />
                    VIP access & support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-accent hover:bg-accent/90">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-20 px-4 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">
            {t('lockers.locations.title')} <span className="gradient-sunset bg-clip-text text-transparent">{t('lockers.locations.lockerz')}</span> {t('lockers.locations.near_you')}
          </h3>
          <p className="text-muted-foreground mb-8">
            {t('lockers.locations.description')}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <MapPin className="w-5 h-5 mr-2" />
            {t('lockers.locations.view_locations')}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Lockers;