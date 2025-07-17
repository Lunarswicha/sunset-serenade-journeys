import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, query_type } = await req.json();
    
    console.log('Received query:', query, 'Type:', query_type);

    // Store the user query
    const { error: insertError } = await supabase
      .from('user_queries')
      .insert({
        query: query,
        query_type: query_type || 'general',
        response: null
      });

    if (insertError) {
      console.error('Error storing query:', insertError);
    }

    // Mock AI response for now - will be replaced with actual AI integration
    let mockResponse = '';
    
    switch (query_type) {
      case 'destination':
        mockResponse = `Based on your request "${query}", I recommend checking out these amazing festival destinations:
        
        🎵 **Berlin, Germany** - Known for its electronic music scene with festivals like Love Parade and Fusion Festival
        🎪 **Barcelona, Spain** - Home to Primavera Sound and Sonar, perfect for indie and electronic music lovers
        🎸 **Austin, Texas** - The live music capital with SXSW and Austin City Limits Music Festival
        
        Would you like more details about any of these destinations?`;
        break;
        
      case 'event':
        mockResponse = `Here are some exciting festivals based on "${query}":
        
        🎶 **Coachella 2024** - April 12-14 & 19-21, Indio, California
        🎵 **Tomorrowland** - July 19-21 & 26-28, Boom, Belgium  
        🎸 **Glastonbury** - June 26-30, Somerset, England
        
        Each offers unique artists and experiences. Which style interests you most?`;
        break;
        
      case 'music':
        mockResponse = `Discovering music based on "${query}":
        
        🎧 **Trending Artists**: Check out these artists performing at upcoming festivals
        🎼 **Similar Genres**: Based on your taste, you might enjoy these genres
        🎤 **Festival Lineups**: Here are festivals featuring similar artists
        
        Want me to find festivals where these artists are performing?`;
        break;
        
      default:
        mockResponse = `I'd be happy to help you with "${query}"! I can assist you with:
        
        🗺️ **Festival Destinations** - Find the perfect location for your next festival adventure
        🎪 **Event Discovery** - Discover festivals matching your music taste and schedule
        🎵 **Music Exploration** - Find new artists and genres through festival lineups
        
        What would you like to explore first?`;
    }

    // Update the stored query with the response
    const { error: updateError } = await supabase
      .from('user_queries')
      .update({ response: mockResponse })
      .eq('query', query)
      .eq('query_type', query_type || 'general');

    if (updateError) {
      console.error('Error updating query response:', updateError);
    }

    return new Response(JSON.stringify({ 
      response: mockResponse,
      query_type: query_type || 'general'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});