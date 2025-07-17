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

    // Query the Groove Project table for real festival data
    const { data: festivals, error: festivalError } = await supabase
      .from('Groove Project')
      .select('*')
      .limit(10);

    if (festivalError) {
      console.error('Error fetching festivals:', festivalError);
    }

    // Generate AI response based on real festival data
    let mockResponse = '';
    
    if (festivals && festivals.length > 0) {
      switch (query_type) {
        case 'destination':
          const destinations = festivals.slice(0, 3).map(f => 
            `🎵 **${f.City}, ${f.Country}** - ${f['Festival Name']} (${f.Genre}) at ${f.Venue}`
          ).join('\n        ');
          
          mockResponse = `Based on your request "${query}", here are amazing festival destinations from our database:
        
        ${destinations}
        
        Each destination offers unique experiences with different genres and atmospheres. Would you like more details about any of these locations?`;
          break;
          
        case 'event':
          const events = festivals.slice(0, 3).map(f => 
            `🎶 **${f['Festival Name']}** - ${f.Dates}, ${f.City}, ${f.Country}\n           Genre: ${f.Genre} | Capacity: ${f.Capacity.toLocaleString()} | €${f['Ticket Price (EUR)']}`
          ).join('\n        ');
          
          mockResponse = `Here are exciting festivals based on "${query}":
        
        ${events}
        
        Each festival offers unique artists and experiences. Which one interests you most?`;
          break;
          
        case 'music':
          const musicFestivals = festivals.filter(f => 
            f.Genre.toLowerCase().includes(query.toLowerCase()) || 
            f['Festival Name'].toLowerCase().includes(query.toLowerCase())
          ).slice(0, 3);
          
          const musicResults = musicFestivals.length > 0 ? 
            musicFestivals.map(f => 
              `🎧 **${f['Festival Name']}** - ${f.Genre} in ${f.City}, ${f.Country}`
            ).join('\n        ') :
            festivals.slice(0, 3).map(f => 
              `🎧 **${f['Festival Name']}** - ${f.Genre} in ${f.City}, ${f.Country}`
            ).join('\n        ');
          
          mockResponse = `Discovering festivals based on "${query}":
        
        ${musicResults}
        
        Want me to find more festivals in these genres or get details about tickets and travel?`;
          break;
          
        default:
          const randomFestivals = festivals.slice(0, 3).map(f => 
            `🎪 **${f['Festival Name']}** - ${f.Genre} in ${f.City}, ${f.Country} (${f.Dates})`
          ).join('\n        ');
          
          mockResponse = `I'd be happy to help you with "${query}"! Here are some featured festivals:
        
        ${randomFestivals}
        
        I can help you with:
        🗺️ **Festival Destinations** - Find the perfect location for your next festival adventure
        🎪 **Event Discovery** - Discover festivals matching your music taste and schedule  
        🎵 **Music Exploration** - Find new artists and genres through festival lineups
        
        What would you like to explore first?`;
      }
    } else {
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