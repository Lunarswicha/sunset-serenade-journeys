import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, Search, Loader2, Upload, ClipboardList, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PlaylistMatcher = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [playlistText, setPlaylistText] = useState("");
  const [artists, setArtists] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [includeArtists, setIncludeArtists] = useState(true);
  const [includeGenres, setIncludeGenres] = useState(true);
  const [festivalMatches, setFestivalMatches] = useState<any[]>([]);
  const { toast } = useToast();

  // Parse playlist text into artists and genres
  const parsePlaylist = () => {
    if (!playlistText.trim()) {
      toast({
        title: "Empty playlist",
        description: "Please paste your playlist or enter artists/genres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simple parsing logic for demonstration
      // In a real app, this would be more sophisticated
      const lines = playlistText.split('\n');
      
      // Extract potential artists (assuming first word of each line might be artist)
      const extractedArtists = lines
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          // Try to extract artist name from common formats
          // e.g., "Artist - Song Title" or "1. Artist - Song Title"
          const artistMatch = line.match(/(?:\d+\.\s*)?([^-–—]+)(?:[-–—])/);
          return artistMatch ? artistMatch[1].trim() : line.split(' ')[0];
        });
      
      // Extract potential genres (using a predefined list)
      const commonGenres = [
        "rock", "pop", "electronic", "edm", "techno", "house", "dance", "hip-hop", 
        "rap", "r&b", "jazz", "blues", "country", "folk", "indie", "alternative", 
        "metal", "punk", "classical", "ambient", "trance", "reggae", "disco"
      ];
      
      const extractedGenres = commonGenres.filter(genre => 
        playlistText.toLowerCase().includes(genre)
      );

      setArtists(Array.from(new Set(extractedArtists)).slice(0, 10)); // Limit to 10 unique artists
      setGenres(extractedGenres);
      
      // After parsing, automatically find matches
      findFestivalMatches(extractedArtists, extractedGenres);
    } catch (error) {
      console.error("Error parsing playlist:", error);
      toast({
        title: "Parsing error",
        description: "Couldn't process your playlist. Try a different format or enter artists manually.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Find matching festivals based on artists and genres
  const findFestivalMatches = async (artistList: string[], genreList: string[]) => {
    try {
      // Fetch festivals from database
      const { data: fetchedFestivals, error } = await supabase
        .from('Groove Project')
        .select('*');
      
      if (error) throw error;
      
      // Use sample data if no festivals found in the database
      const festivals = fetchedFestivals && fetchedFestivals.length > 0 ? fetchedFestivals : [
        {
          'Festival Name': 'Tomorrowland',
          'Genre': 'Electronic, EDM, House, Techno',
          'City': 'Boom',
          'Country': 'Belgium',
          'Dates': 'July 19-28, 2024',
          'Ticket Price (EUR)': 350,
          'Capacity': 400000,
          'Atmosphere': 'Magical, Immersive, High-energy',
          'Venue': 'De Schorre Recreation Area',
          'Notes': 'Features top DJs like David Guetta, Martin Garrix, and Armin van Buuren',
          'Nearest Airport': 'Brussels Airport',
          'Accommodation Options': 'Camping, Hotels, Dreamville Festival Lodging',
          'Website': 'https://www.tomorrowland.com'
        },
        {
          'Festival Name': 'Glastonbury Festival',
          'Genre': 'Rock, Indie, Electronic, Pop, Hip-Hop',
          'City': 'Pilton',
          'Country': 'UK',
          'Dates': 'June 26-30, 2024',
          'Ticket Price (EUR)': 320,
          'Capacity': 210000,
          'Atmosphere': 'Legendary, Diverse, Muddy',
          'Venue': 'Worthy Farm',
          'Notes': 'One of the world\'s most famous festivals with diverse artists across all genres',
          'Nearest Airport': 'Bristol Airport',
          'Accommodation Options': 'Camping, Glamping, Local B&Bs',
          'Website': 'https://www.glastonburyfestivals.co.uk'
        },
        {
          'Festival Name': 'Coachella',
          'Genre': 'Pop, Rock, Hip-Hop, Electronic, Indie',
          'City': 'Indio, California',
          'Country': 'USA',
          'Dates': 'April 12-21, 2024',
          'Ticket Price (EUR)': 450,
          'Capacity': 125000,
          'Atmosphere': 'Trendy, Desert, Instagram-worthy',
          'Venue': 'Empire Polo Club',
          'Notes': 'Known for fashion, celebrity sightings, and diverse musical lineup',
          'Nearest Airport': 'Palm Springs International Airport',
          'Accommodation Options': 'Camping, Hotels, Vacation Rentals',
          'Website': 'https://www.coachella.com'
        },
        {
          'Festival Name': 'Primavera Sound',
          'Genre': 'Indie, Electronic, Rock, Experimental',
          'City': 'Barcelona',
          'Country': 'Spain',
          'Dates': 'May 29 - June 2, 2024',
          'Ticket Price (EUR)': 280,
          'Capacity': 80000,
          'Atmosphere': 'Urban, Coastal, Progressive',
          'Venue': 'Parc del Fòrum',
          'Notes': 'Features cutting-edge artists and forward-thinking lineup',
          'Nearest Airport': 'Barcelona–El Prat Airport',
          'Accommodation Options': 'Hotels, Hostels, Apartments',
          'Website': 'https://www.primaverasound.com'
        },
        {
          'Festival Name': 'Ultra Music Festival',
          'Genre': 'EDM, House, Techno, Trance, Dubstep',
          'City': 'Miami',
          'Country': 'USA',
          'Dates': 'March 28-30, 2024',
          'Ticket Price (EUR)': 380,
          'Capacity': 165000,
          'Atmosphere': 'High-energy, Urban, Waterfront',
          'Venue': 'Bayfront Park',
          'Notes': 'Premier electronic music festival with spectacular stage production',
          'Nearest Airport': 'Miami International Airport',
          'Accommodation Options': 'Hotels, Airbnb, Resorts',
          'Website': 'https://ultramusicfestival.com'
        }
      ];

      // Simple matching algorithm for demonstration
      const matches = festivals.map(festival => {
        let score = 0;
        let matchedArtists: string[] = [];
        let matchedGenres: string[] = [];
        
        // Match artists (checking if festival notes/name contains artist names or common associations)
        if (includeArtists) {
          // Add common artist associations for more matches
          const artistAssociations = {
            'David Guetta': ['EDM', 'Electronic', 'House', 'Tomorrowland'],
            'Daft Punk': ['Electronic', 'House', 'Dance'],
            'Swedish House Mafia': ['EDM', 'Progressive House', 'Tomorrowland'],
            'The Killers': ['Rock', 'Indie', 'Glastonbury'],
            'Tame Impala': ['Indie', 'Psychedelic', 'Coachella'],
            'Arctic Monkeys': ['Rock', 'Indie', 'Glastonbury'],
            'Beyoncé': ['Pop', 'R&B', 'Coachella'],
            'Kendrick Lamar': ['Hip-Hop', 'Rap'],
            'Coldplay': ['Pop', 'Rock'],
            'Florence': ['Indie', 'Rock', 'Glastonbury']
          };
          
          artistList.forEach(artist => {
            const artistLower = artist.toLowerCase();
            
            // Direct match in festival info
            if (
              (festival.Notes && festival.Notes.toLowerCase().includes(artistLower)) ||
              festival['Festival Name'].toLowerCase().includes(artistLower)
            ) {
              score += 3;
              matchedArtists.push(artist);
            } 
            // Match based on known artist associations
            else {
              const artistKey = Object.keys(artistAssociations).find(key => 
                key.toLowerCase().includes(artistLower) || artistLower.includes(key.toLowerCase())
              );
              
              if (artistKey) {
                const associations = artistAssociations[artistKey as keyof typeof artistAssociations];
                const matchesAssociation = associations.some(assoc => 
                  festival.Genre.toLowerCase().includes(assoc.toLowerCase()) || 
                  festival['Festival Name'].toLowerCase().includes(assoc.toLowerCase()) ||
                  (festival.Notes && festival.Notes.toLowerCase().includes(assoc.toLowerCase()))
                );
                
                if (matchesAssociation) {
                  score += 2;
                  matchedArtists.push(artist);
                }
              }
            }
          });
        }
        
        // Match genres
        if (includeGenres) {
          genreList.forEach(genre => {
            if (festival.Genre.toLowerCase().includes(genre.toLowerCase())) {
              score += 2; // Score for genre match
              matchedGenres.push(genre);
            }
          });
          
          // Additional score for matching atmosphere with genres
          genreList.forEach(genre => {
            if (festival.Atmosphere.toLowerCase().includes(genre.toLowerCase())) {
              score += 1;
            }
          });
        }
        
        return {
          festival,
          score,
          matchedArtists,
          matchedGenres
        };
      });
      
      // Sort by score and take top 5
      const topMatches = matches
        .filter(match => match.score > 0) // Only include actual matches
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      
      setFestivalMatches(topMatches);
    } catch (error) {
      console.error("Error finding festival matches:", error);
      toast({
        title: "Matching error",
        description: "Couldn't match your playlist with festivals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a single artist or genre manually
  const addItem = (type: 'artist' | 'genre', value: string) => {
    if (!value.trim()) return;
    
    if (type === 'artist') {
      setArtists(prev => [...prev, value.trim()]);
    } else {
      setGenres(prev => [...prev, value.trim()]);
    }
  };

  // Remove an artist or genre
  const removeItem = (type: 'artist' | 'genre', index: number) => {
    if (type === 'artist') {
      setArtists(prev => prev.filter((_, i) => i !== index));
    } else {
      setGenres(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Run matching with current artists and genres
  const runMatching = () => {
    if ((includeArtists && artists.length === 0) && (includeGenres && genres.length === 0)) {
      toast({
        title: "No data to match",
        description: "Please add at least one artist or genre before matching.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    findFestivalMatches(artists, genres);
  };

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
      <section className="relative py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-sunset bg-clip-text text-transparent animate-gradient">
                {t('playlist_matcher.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('playlist_matcher.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <ClipboardList className="w-5 h-5 mr-2 text-primary" />
                    Your Playlist
                  </CardTitle>
                  <CardDescription>
                    Paste your playlist or enter artists/genres manually
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Paste your playlist here... (Song titles, artists, albums)"
                    className="min-h-[200px] bg-background/50"
                    value={playlistText}
                    onChange={(e) => setPlaylistText(e.target.value)}
                  />
                  <Button 
                    onClick={parsePlaylist} 
                    className="w-full"
                    disabled={isLoading || !playlistText.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Analyze Playlist
                      </>
                    )}
                  </Button>
                  
                  {/* Sample Playlist Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 text-sm"
                    onClick={() => setPlaylistText(`1. David Guetta - Titanium
2. Daft Punk - One More Time
3. Swedish House Mafia - Don't You Worry Child
4. The Killers - Mr. Brightside
5. Tame Impala - The Less I Know The Better
6. Arctic Monkeys - Do I Wanna Know?
7. Beyoncé - BREAK MY SOUL
8. Kendrick Lamar - HUMBLE.
9. Coldplay - A Sky Full of Stars
10. Florence + The Machine - Dog Days Are Over`)}
                  >
                    Load Sample Playlist
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Music className="w-5 h-5 mr-2 text-primary" />
                    Extracted Music Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Artists Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="include-artists" className="text-lg font-medium">Artists</Label>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="include-artists" 
                          checked={includeArtists} 
                          onCheckedChange={setIncludeArtists}
                        />
                        <Label htmlFor="include-artists">Include in search</Label>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {artists.map((artist, index) => (
                        <Badge 
                          key={`artist-${index}`} 
                          variant="outline"
                          className="py-1 px-3 bg-primary/10 hover:bg-primary/20 cursor-pointer"
                          onClick={() => removeItem('artist', index)}
                        >
                          {artist} ×
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input 
                        id="add-artist"
                        placeholder="Add artist manually"
                        className="bg-background/50"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addItem('artist', e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const input = document.getElementById('add-artist') as HTMLInputElement;
                          addItem('artist', input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  {/* Quick add popular artists */}
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-2">Popular artists:</p>
                    <div className="flex flex-wrap gap-2">
                      {["David Guetta", "Daft Punk", "The Killers", "Arctic Monkeys", "Coldplay"].map((artist) => (
                        <Badge 
                          key={artist}
                          variant="outline"
                          className="py-1 px-2 bg-primary/5 hover:bg-primary/15 cursor-pointer"
                          onClick={() => {
                            if (!artists.includes(artist)) {
                              setArtists(prev => [...prev, artist]);
                            }
                          }}
                        >
                          + {artist}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Genres Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="include-genres" className="text-lg font-medium">Genres</Label>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="include-genres" 
                          checked={includeGenres} 
                          onCheckedChange={setIncludeGenres}
                        />
                        <Label htmlFor="include-genres">Include in search</Label>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {genres.map((genre, index) => (
                        <Badge 
                          key={`genre-${index}`} 
                          variant="outline"
                          className="py-1 px-3 bg-secondary/10 hover:bg-secondary/20 cursor-pointer"
                          onClick={() => removeItem('genre', index)}
                        >
                          {genre} ×
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input 
                        id="add-genre"
                        placeholder="Add genre manually"
                        className="bg-background/50"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addItem('genre', e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const input = document.getElementById('add-genre') as HTMLInputElement;
                          addItem('genre', input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    
                    {/* Quick add popular genres */}
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-2">Popular genres:</p>
                      <div className="flex flex-wrap gap-2">
                        {["electronic", "rock", "pop", "hip-hop", "indie"].map((genre) => (
                          <Badge 
                            key={genre}
                            variant="outline"
                            className="py-1 px-2 bg-secondary/5 hover:bg-secondary/15 cursor-pointer"
                            onClick={() => {
                              if (!genres.includes(genre)) {
                                setGenres(prev => [...prev, genre]);
                              }
                            }}
                          >
                            + {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={runMatching} 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Finding matches...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Find Matching Festivals
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Results Section */}
            <div>
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Music className="w-5 h-5 mr-2 text-primary" />
                    Festival Matches
                  </CardTitle>
                  <CardDescription>
                    Festivals that match your music taste
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                      <p className="text-muted-foreground">Finding your perfect festivals...</p>
                    </div>
                  ) : festivalMatches.length > 0 ? (
                    <div className="space-y-6">
                      {festivalMatches.map((match, index) => (
                        <Card key={index} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300">
                          <CardHeader className="bg-card/50 pb-2">
                            <CardTitle className="text-lg flex justify-between">
                              <span>{match.festival['Festival Name']}</span>
                              <Badge variant="outline" className="ml-2 bg-primary/20">
                                Match Score: {match.score}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              {match.festival.City}, {match.festival.Country} • {match.festival.Genre}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Festival Details</p>
                                <ul className="space-y-1 text-sm">
                                  <li>📅 {match.festival.Dates}</li>
                                  <li>💰 €{match.festival['Ticket Price (EUR)']}</li>
                                  <li>🎭 {match.festival.Atmosphere}</li>
                                  <li>🏟️ {match.festival.Venue}</li>
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Why It Matches</p>
                                {match.matchedArtists.length > 0 && (
                                  <div className="mb-2">
                                    <p className="text-xs text-muted-foreground">Artists:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {match.matchedArtists.map((artist: string, i: number) => (
                                        <Badge key={i} variant="secondary" className="text-xs">
                                          {artist}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {match.matchedGenres.length > 0 && (
                                  <div>
                                    <p className="text-xs text-muted-foreground">Genres:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {match.matchedGenres.map((genre: string, i: number) => (
                                        <Badge key={i} variant="outline" className="text-xs">
                                          {genre}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            {match.festival.Website && (
                              <a 
                                href={match.festival.Website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center mt-4 text-sm text-primary hover:underline"
                              >
                                Visit website <ExternalLink className="ml-1 w-3 h-3" />
                              </a>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Music className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No matches found yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Analyze your playlist or add artists and genres manually to find matching festivals
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaylistMatcher;