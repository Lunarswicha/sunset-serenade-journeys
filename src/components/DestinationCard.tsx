import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Music, Globe } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  music_scene: string;
  image_url?: string;
}

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Card className="gradient-card border-border/50 hover:border-accent/50 transition-all duration-300 hover:glow-accent group overflow-hidden">
      {destination.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={destination.image_url} 
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors">
              {destination.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-3">
              {destination.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2 border-accent/50 text-accent">
            <Globe className="w-3 h-3 mr-1" />
            {destination.country}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{destination.country}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Music className="w-4 h-4" />
            <span>{destination.music_scene}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <strong>Music Scene:</strong> {destination.music_scene}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-accent/50 text-accent hover:bg-accent/10"
          >
            Explore
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};