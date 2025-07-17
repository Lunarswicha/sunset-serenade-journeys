import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Headphones } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  genre: string;
  bio: string;
  image_url?: string;
}

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Card className="gradient-card border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-secondary group overflow-hidden">
      {artist.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={artist.image_url} 
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-secondary transition-colors">
              {artist.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-3">
              {artist.bio}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2 border-secondary/50 text-secondary">
            {artist.genre}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Music className="w-4 h-4" />
            <span>{artist.genre}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-secondary/50 text-secondary hover:bg-secondary/10"
            >
              <Headphones className="w-4 h-4 mr-1" />
              Listen
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-secondary/50 text-secondary hover:bg-secondary/10"
            >
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};