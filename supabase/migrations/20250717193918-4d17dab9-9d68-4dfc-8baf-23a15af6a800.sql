-- Create festivals table
CREATE TABLE public.festivals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create artists table
CREATE TABLE public.artists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  genre TEXT,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create festival_artists junction table
CREATE TABLE public.festival_artists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  festival_id UUID NOT NULL,
  artist_id UUID NOT NULL,
  performance_date DATE,
  stage TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (festival_id) REFERENCES public.festivals(id) ON DELETE CASCADE,
  FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE
);

-- Create destinations table for AI suggestions
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  music_scene TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user queries table for chatbot history
CREATE TABLE public.user_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  response TEXT,
  query_type TEXT, -- 'destination', 'event', 'music'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festival_artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_queries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Festivals are publicly readable" 
ON public.festivals FOR SELECT 
USING (true);

CREATE POLICY "Artists are publicly readable" 
ON public.artists FOR SELECT 
USING (true);

CREATE POLICY "Festival artists are publicly readable" 
ON public.festival_artists FOR SELECT 
USING (true);

CREATE POLICY "Destinations are publicly readable" 
ON public.destinations FOR SELECT 
USING (true);

CREATE POLICY "User queries are publicly readable" 
ON public.user_queries FOR SELECT 
USING (true);

-- Create policies for insert (for future admin functionality)
CREATE POLICY "Anyone can insert user queries" 
ON public.user_queries FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_festivals_updated_at
  BEFORE UPDATE ON public.festivals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_artists_updated_at
  BEFORE UPDATE ON public.artists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();