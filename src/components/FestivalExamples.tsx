import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('Groove Project').select('*').limit(6);
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
    return <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">
              <span className="gradient-sunset bg-clip-text text-transparent">{t('festival_examples.title')}</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('festival_examples.loading')}
            </p>
          </div>
        </div>
      </section>;
  }
  return;
};
export default FestivalExamples;