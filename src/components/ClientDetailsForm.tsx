import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, DollarSign, Music, MapPin, Send } from "lucide-react";

interface ClientDetailsFormProps {
  onSubmit: (data: ClientFormData) => void;
  aiResponse?: string;
}

export interface ClientFormData {
  // Contact Info
  name: string;
  email: string;
  phone: string;
  
  // Trip Details
  budget: string;
  numTravelers: string;
  travelDates: string;
  duration: string;
  
  // Preferences
  musicGenres: string[];
  accommodationType: string;
  transportNeeds: string;
  dietaryRequirements: string;
  accessibility: string;
  
  // Special Requests
  specialRequests: string;
  previousFestivals: string;
  
  // AI Context
  originalQuery: string;
  aiRecommendation: string;
}

const ClientDetailsForm = ({ onSubmit, aiResponse = "" }: ClientDetailsFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    budget: "",
    numTravelers: "",
    travelDates: "",
    duration: "",
    musicGenres: [],
    accommodationType: "",
    transportNeeds: "",
    dietaryRequirements: "",
    accessibility: "",
    specialRequests: "",
    previousFestivals: "",
    originalQuery: "",
    aiRecommendation: aiResponse
  });

  const musicGenreOptions = [
    "Electronic/EDM", "Rock", "Pop", "Hip-Hop", "Indie", "Classical", 
    "Jazz", "Folk", "Country", "Reggae", "Techno", "House", "Alternative"
  ];

  const handleGenreChange = (genre: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      musicGenres: checked 
        ? [...prev.musicGenres, genre]
        : prev.musicGenres.filter(g => g !== genre)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.budget || !formData.numTravelers) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSubmit(formData);
      toast({
        title: "Information Submitted",
        description: "We'll create a personalized quote for you and send it via email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your information. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Send className="w-6 h-6 mr-3 text-primary" />
          Get Your Personalized Festival Quote
        </CardTitle>
        <CardDescription>
          Complete this form to receive a customized quote and recommendations based on your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Trip Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range (EUR) *</Label>
                <Select 
                  value={formData.budget} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500-1000">€500 - €1,000</SelectItem>
                    <SelectItem value="1000-2500">€1,000 - €2,500</SelectItem>
                    <SelectItem value="2500-5000">€2,500 - €5,000</SelectItem>
                    <SelectItem value="5000-10000">€5,000 - €10,000</SelectItem>
                    <SelectItem value="10000+">€10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers *</Label>
                <Select 
                  value={formData.numTravelers} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, numTravelers: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How many people?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3-4">3-4 people</SelectItem>
                    <SelectItem value="5-8">5-8 people</SelectItem>
                    <SelectItem value="9+">9+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dates">Preferred Travel Dates</Label>
                <Input
                  id="dates"
                  value={formData.travelDates}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelDates: e.target.value }))}
                  placeholder="e.g., July 2024, Summer 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Trip Duration</Label>
                <Select 
                  value={formData.duration} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How long?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2days">1-2 days</SelectItem>
                    <SelectItem value="3-4days">3-4 days</SelectItem>
                    <SelectItem value="5-7days">5-7 days</SelectItem>
                    <SelectItem value="1week+">1 week+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Music Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Music className="w-5 h-5 mr-2 text-primary" />
              Music Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {musicGenreOptions.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={genre}
                    checked={formData.musicGenres.includes(genre)}
                    onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                  />
                  <Label htmlFor={genre} className="text-sm">{genre}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Accommodation & Transport */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Accommodation & Transport
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accommodation">Accommodation Preference</Label>
                <Select 
                  value={formData.accommodationType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, accommodationType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camping">Camping</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="apartment">Apartment/Airbnb</SelectItem>
                    <SelectItem value="luxury">Luxury Resort</SelectItem>
                    <SelectItem value="mixed">Mixed Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transport">Transport Needs</Label>
                <Select 
                  value={formData.transportNeeds} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, transportNeeds: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Transport preferences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flights">Flights included</SelectItem>
                    <SelectItem value="ground">Ground transport only</SelectItem>
                    <SelectItem value="rental">Car rental</SelectItem>
                    <SelectItem value="public">Public transport</SelectItem>
                    <SelectItem value="private">Private transport</SelectItem>
                    <SelectItem value="self">Self-arranged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Special Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Requirements</Label>
                <Input
                  id="dietary"
                  value={formData.dietaryRequirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, dietaryRequirements: e.target.value }))}
                  placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessibility">Accessibility Needs</Label>
                <Input
                  id="accessibility"
                  value={formData.accessibility}
                  onChange={(e) => setFormData(prev => ({ ...prev, accessibility: e.target.value }))}
                  placeholder="Any accessibility requirements"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="previous">Previous Festival Experience</Label>
              <Textarea
                id="previous"
                value={formData.previousFestivals}
                onChange={(e) => setFormData(prev => ({ ...prev, previousFestivals: e.target.value }))}
                placeholder="Tell us about festivals you've enjoyed before..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="special">Special Requests or Notes</Label>
              <Textarea
                id="special"
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Any special celebrations, group requirements, or other requests..."
                rows={3}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Get My Personalized Quote
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClientDetailsForm;