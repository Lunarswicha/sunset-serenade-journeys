import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Euro, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Festival {
  "Festival Name": string;
  City: string;
  Country: string;
  Genre: string;
  Dates: string;
  Venue: string;
  Capacity: number;
  "Ticket Price (EUR)": number;
  "Nearest Airport": string;
  "Accommodation Options": string;
  Atmosphere: string;
  Website: string;
}

const FestivalExamples = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const { data, error } = await supabase
          .from('Groove Project')
          .select('*')
          .limit(6);

        if (error) throw error;
        setFestivals(data || []);
      } catch (error) {
        console.error('Error fetching festivals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">
              <span className="gradient-sunset bg-clip-text text-transparent">Featured Festival Adventures</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Loading amazing festival experiences...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">
            <span className="gradient-sunset bg-clip-text text-transparent">Featured Festival Adventures</span>
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover what your perfect festival adventure could look like. Real destinations, real experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {festivals.map((festival, index) => (
            <Card key={index} className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {festival.Genre}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Euro className="w-4 h-4 mr-1" />
                    {festival["Ticket Price (EUR)"]}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {festival["Festival Name"]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  {festival.City}, {festival.Country}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 text-secondary" />
                  {festival.Dates}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2 text-accent" />
                  {festival.Capacity.toLocaleString()} capacity
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Plane className="w-4 h-4 mr-2 text-primary" />
                  {festival["Nearest Airport"]}
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Venue:</strong> {festival.Venue}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Atmosphere:</strong> {festival.Atmosphere}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Stay:</strong> {festival["Accommodation Options"]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {festivals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No festival data available. Add some festivals to your Groove Project table to see examples here!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FestivalExamples;