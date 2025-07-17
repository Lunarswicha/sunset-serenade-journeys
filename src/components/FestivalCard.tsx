import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Music, Users } from "lucide-react";
import { format } from "date-fns";

interface Festival {
  id: string;
  name: string;
  description: string;
  location: string;
  date_start: string;
  date_end: string;
  image_url?: string;
}

interface FestivalCardProps {
  festival: Festival;
}

export const FestivalCard = ({ festival }: FestivalCardProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getDuration = () => {
    const start = new Date(festival.date_start);
    const end = new Date(festival.date_end);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary group overflow-hidden">
      {festival.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={festival.image_url} 
            alt={festival.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
              {festival.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2">
              {festival.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {getDuration()} {getDuration() === 1 ? 'Day' : 'Days'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{festival.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(festival.date_start)} - {formatDate(festival.date_end)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Music className="w-4 h-4" />
              <span>Multiple Genres</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Festival</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};