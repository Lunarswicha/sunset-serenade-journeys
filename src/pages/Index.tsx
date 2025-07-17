import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Music, Search, Sparkles, Calendar, Users } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen gradient-night">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold gradient-sunset bg-clip-text text-transparent">
                GrooveFest
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#festivals" className="text-muted-foreground hover:text-primary transition-colors">
                Festivals
              </a>
              <a href="#destinations" className="text-muted-foreground hover:text-primary transition-colors">
                Destinations
              </a>
              <a href="#artists" className="text-muted-foreground hover:text-primary transition-colors">
                Artists
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Discover Your Next
              <br />
              <span className="gradient-sunset bg-clip-text text-transparent animate-gradient">
                Festival Adventure
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let AI guide you to the perfect festival destinations. Find amazing events, discover new music, and create unforgettable memories.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Ask AI: 'Find me electronic festivals in Europe this summer'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
              <Button 
                size="lg" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 glow-primary"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Ask AI
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary group">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg group-hover:text-primary transition-colors">
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Destinations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover festival hotspots around the world
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-secondary group">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg group-hover:text-secondary transition-colors">
                    <Calendar className="w-5 h-5 mr-2" />
                    Browse Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Find festivals happening near you
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent group">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg group-hover:text-accent transition-colors">
                    <Users className="w-5 h-5 mr-2" />
                    Discover Artists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Explore new music and favorite performers
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">
              Powered by <span className="gradient-sunset bg-clip-text text-transparent">AI Intelligence</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI assistant helps you discover the perfect festival experience based on your preferences, location, and musical tastes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-primary" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get personalized festival suggestions based on your music taste, budget, and travel preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border/50 hover:border-secondary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-secondary" />
                  Global Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discover festivals from around the world with detailed location information and travel tips.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border/50 hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="w-6 h-6 mr-2 text-accent" />
                  Music Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find new artists and genres while exploring festivals that match your musical journey.
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
              <Music className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">GrooveFest</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover your next festival adventure with AI-powered recommendations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
