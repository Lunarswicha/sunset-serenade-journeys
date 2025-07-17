import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import festival1 from "../assets/festival-experience-1.jpg";
import festival2 from "../assets/festival-experience-2.jpg";
import festival3 from "../assets/festival-experience-3.jpg";

const experiences = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    location: "Tomorrowland, Belgium",
    rating: 5,
    date: "July 2024",
    review: "The most incredible experience of my life! The energy was electric, and I met amazing people from all over the world. The light shows and stage designs were absolutely mind-blowing. Definitely worth every penny!",
    image: festival1,
    highlight: "The Main Stage performance by Swedish House Mafia was a life-changing moment!"
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    avatar: "CR",
    location: "Coachella, California",
    rating: 4,
    date: "April 2024",
    review: "Perfect weather, incredible lineup, and the art installations were breathtaking. The organization was smooth from transportation to facilities. Only giving 4 stars because food was a bit pricey, but overall an amazing weekend!",
    image: festival2,
    highlight: "The surprise guest performance during Billie Eilish's set had everyone talking!"
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "EW",
    location: "Ultra Music Festival, Miami",
    rating: 5,
    date: "March 2024",
    review: "Ultra Miami was pure magic! The beachside setting with the city skyline backdrop created the most incredible atmosphere. The sound quality was excellent and the crowd's energy was contagious. I've already booked for next year!",
    image: festival3,
    highlight: "Dancing on the beach as the sun set behind the main stage was unforgettable."
  }
];

const ClientExperiences = () => {
  return (
    <section className="py-20 px-4" id="experiences">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">
            <span className="gradient-sunset bg-clip-text text-transparent">Real Festival Experiences</span>
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Read authentic reviews and stories from festival-goers who found their perfect adventure through GrooveFest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <Card key={exp.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/30 backdrop-blur-sm">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={`${exp.name}'s festival experience at ${exp.location}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${exp.id}`} />
                      <AvatarFallback>{exp.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{exp.name}</p>
                      <p className="text-xs text-muted-foreground">{exp.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array(exp.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg text-primary">{exp.location}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm">{exp.review}</p>
                <div className="bg-primary/10 border-l-4 border-primary p-3 rounded">
                  <p className="text-sm italic">{exp.highlight}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Join thousands of music lovers who've discovered their perfect festival experience through our AI-powered recommendations. Your adventure awaits!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientExperiences;