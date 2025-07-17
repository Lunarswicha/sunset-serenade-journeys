-- Create user_queries table to store chat history
CREATE TABLE public.user_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  query_type TEXT NOT NULL DEFAULT 'general',
  response TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_queries ENABLE ROW LEVEL SECURITY;

-- Create policy for edge functions to insert and update
CREATE POLICY "Allow edge function to manage queries" 
ON public.user_queries 
FOR ALL 
USING (true);

-- Create updated_at trigger
CREATE TRIGGER set_user_queries_updated_at
BEFORE UPDATE ON public.user_queries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();