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
      // Extract useful information from the query
      const keywords = query.toLowerCase().split(' ');
      const hasLocationKeyword = keywords.some(word => 
        ['europe', 'asia', 'america', 'africa', 'australia', 'france', 'spain', 'germany', 'italy', 'uk'].includes(word));
      const hasGenreKeyword = keywords.some(word => 
        ['edm', 'electronic', 'rock', 'jazz', 'pop', 'techno', 'house', 'indie', 'hip-hop', 'classical'].includes(word));
      const hasTimeKeyword = keywords.some(word => 
        ['summer', 'winter', 'spring', 'autumn', 'fall', 'january', 'february', 'march', 'april', 'may', 'june', 
        'july', 'august', 'september', 'october', 'november', 'december', '2024', '2025'].includes(word));
      const hasBudgetKeyword = keywords.some(word => 
        ['cheap', 'budget', 'affordable', 'expensive', 'luxury', 'price', 'cost'].includes(word));
        
      switch (query_type) {
        case 'destination':
          // Filter festivals based on detected location if present
          let filteredDestinations = festivals;
          if (hasLocationKeyword) {
            filteredDestinations = festivals.filter(f => 
              keywords.some(word => 
                f.Country.toLowerCase().includes(word) || 
                f.City.toLowerCase().includes(word))
            );
          }
          
          // If no matches, use all festivals
          if (filteredDestinations.length === 0) {
            filteredDestinations = festivals;
          }
          
          const destinations = filteredDestinations.slice(0, 3).map(f => 
            `🎵 ${f.City}, ${f.Country} - ${f['Festival Name']} (${f.Genre})
📅 Dates: ${f.Dates}
💰 Price: €${f['Ticket Price (EUR)']}
🏟️ Venue: ${f.Venue}
✈️ Airport: ${f['Nearest Airport']}
🛌 Accommodation: ${f['Accommodation Options']}
${f.Notes ? `📝 Notes: ${f.Notes}` : ''}`
          ).join('\n\n');
          
          mockResponse = `Based on your request "${query}", here are amazing festival destinations:

${destinations}

${hasLocationKeyword ? `I've selected these options specifically in your preferred location. They offer a range of experiences from intimate venues to large-scale productions.` : `Each destination offers unique experiences with different genres and atmospheres.`}

${hasBudgetKeyword ? `Looking at your budget considerations, prices range from €${Math.min(...filteredDestinations.map(f => f['Ticket Price (EUR)']))} to €${Math.max(...filteredDestinations.map(f => f['Ticket Price (EUR)']))}. Would you like me to filter for more affordable options?` : `Ready to book your adventure? I can help with accommodation recommendations and travel tips for any of these destinations.`}`;
          break;
          
        case 'event':
          // Filter events based on detected time period if present
          let filteredEvents = festivals;
          if (hasTimeKeyword) {
            filteredEvents = festivals.filter(f => 
              keywords.some(word => f.Dates.toLowerCase().includes(word))
            );
          }
          
          // If no matches or not enough, use genre as secondary filter
          if (filteredEvents.length < 2 && hasGenreKeyword) {
            filteredEvents = festivals.filter(f => 
              keywords.some(word => f.Genre.toLowerCase().includes(word))
            );
          }
          
          // If still no matches, use all festivals
          if (filteredEvents.length === 0) {
            filteredEvents = festivals;
          }
          
          const events = filteredEvents.slice(0, 3).map(f => 
            `🎶 ${f['Festival Name']} - ${f.Genre}
📅 When: ${f.Dates}
📍 Where: ${f.City}, ${f.Country}
💰 Tickets: €${f['Ticket Price (EUR)']}
👥 Capacity: ${f.Capacity.toLocaleString()} people
🎪 Atmosphere: ${f.Atmosphere}
🌐 Website: ${f.Website}
${f['Accommodation Options'] ? `🏨 Accommodation: ${f['Accommodation Options']}` : ''}`
          ).join('\n\n');
          
          mockResponse = `Here are exciting festivals based on "${query}":

${events}

${hasTimeKeyword ? `I've focused on events happening during your preferred time. ` : ''}${hasGenreKeyword ? `These festivals feature your favorite genre and similar styles. ` : ''}Each offers unique artists and experiences.

Would you like more details about any specific festival? I can help with ticket purchasing, accommodation options, or travel arrangements.`;
          break;
          
        case 'music':
          // Prioritize filtering by genre
          let musicFestivals = festivals;
          if (hasGenreKeyword) {
            musicFestivals = festivals.filter(f => 
              keywords.some(word => f.Genre.toLowerCase().includes(word))
            );
          }
          
          // If no matches, search in festival names and notes
          if (musicFestivals.length === 0) {
            musicFestivals = festivals.filter(f => 
              f.Genre.toLowerCase().includes(query.toLowerCase()) || 
              f['Festival Name'].toLowerCase().includes(query.toLowerCase()) ||
              (f.Notes && f.Notes.toLowerCase().includes(query.toLowerCase()))
            );
          }
          
          // If still no matches, use all festivals
          if (musicFestivals.length === 0) {
            musicFestivals = festivals;
          }
          
          const musicResults = musicFestivals.slice(0, 3).map(f => 
            `🎧 ${f['Festival Name']} - ${f.Genre}
📍 Location: ${f.City}, ${f.Country}
📅 Dates: ${f.Dates}
💰 From: €${f['Ticket Price (EUR)']}
🎭 Experience: ${f.Atmosphere}
${f.Notes ? `🎵 Highlights: ${f.Notes}` : ''}`
          ).join('\n\n');
          
          mockResponse = `Discovering festivals based on "${query}":

${musicResults}

${hasGenreKeyword ? `I've selected festivals featuring your preferred music style. ` : ''}${hasTimeKeyword ? `These events align with your timing preferences. ` : ''}${hasLocationKeyword ? `They're located in your desired region. ` : ''}

Want me to find more festivals like these? I can help you:
• Compare ticket prices and VIP packages
• Plan your travel itinerary
• Find accommodation near the venue
• Discover similar artists you might enjoy

Just let me know what interests you most!`;
          break;
          
        default:
          // Smart filtering based on detected keywords
          let filteredFestivals = festivals;
          
          // Apply combined filters if keywords are detected
          if (hasLocationKeyword || hasGenreKeyword || hasTimeKeyword || hasBudgetKeyword) {
            filteredFestivals = festivals.filter(f => {
              const matchesLocation = !hasLocationKeyword || 
                keywords.some(word => f.Country.toLowerCase().includes(word) || f.City.toLowerCase().includes(word));
              
              const matchesGenre = !hasGenreKeyword || 
                keywords.some(word => f.Genre.toLowerCase().includes(word));
              
              const matchesTime = !hasTimeKeyword || 
                keywords.some(word => f.Dates.toLowerCase().includes(word));
              
              // For budget, compare to the festival's price tier
              const matchesBudget = !hasBudgetKeyword || 
                (keywords.includes('cheap') && f['Ticket Price (EUR)'] < 100) ||
                (keywords.includes('affordable') && f['Ticket Price (EUR)'] < 200) ||
                (keywords.includes('expensive') && f['Ticket Price (EUR)'] > 300) ||
                (keywords.includes('luxury') && f['Ticket Price (EUR)'] > 500);
              
              return matchesLocation && matchesGenre && matchesTime && matchesBudget;
            });
          }
          
          // If filtered results are too few, fall back to all festivals
          if (filteredFestivals.length < 2) {
            filteredFestivals = festivals;
          }
          
          const randomFestivals = filteredFestivals.slice(0, 3).map(f => 
            `🎪 ${f['Festival Name']} - ${f.Genre}
📍 ${f.City}, ${f.Country}
📅 ${f.Dates}
💰 €${f['Ticket Price (EUR)']}
🎭 ${f.Atmosphere}
${f.Notes ? `💫 ${f.Notes}` : ''}`
          ).join('\n\n');
          
          // Generate more personalized response
          let intro = `I'd be happy to help you find the perfect festival experience based on "${query}"!`;
          
          if (hasLocationKeyword) {
            intro += ` I see you're interested in festivals in specific locations.`;
          }
          if (hasGenreKeyword) {
            intro += ` Your music preferences are an important part of finding the right festival.`;
          }
          if (hasTimeKeyword) {
            intro += ` The timing you mentioned will help narrow down the best options.`;
          }
          if (hasBudgetKeyword) {
            intro += ` I've considered your budget concerns in these recommendations.`;
          }
          
          mockResponse = `${intro} Here are some tailored festival suggestions:

${randomFestivals}

I can help you dive deeper with:
🗺️ Festival Destinations - Find the perfect location based on your preferences
🎪 Event Discovery - Get personalized recommendations matching your music taste
🎵 Music Exploration - Discover new artists and lineups you'll love
💰 Budget Planning - Compare prices and find the best value options
✈️ Travel Arrangements - Get help with flights, accommodations, and local transport

What aspect of festival planning would you like to explore first?`;
      }
    } else {
      // Even if we have no festivals, we can still provide an intelligent response
      // based on the query content
      const keywords = query.toLowerCase().split(' ');
      const hasLocationKeyword = keywords.some(word => 
        ['europe', 'asia', 'america', 'africa', 'australia', 'france', 'spain', 'germany', 'italy', 'uk'].includes(word));
      const hasGenreKeyword = keywords.some(word => 
        ['edm', 'electronic', 'rock', 'jazz', 'pop', 'techno', 'house', 'indie', 'hip-hop', 'classical'].includes(word));
      const hasTimeKeyword = keywords.some(word => 
        ['summer', 'winter', 'spring', 'autumn', 'fall', 'january', 'february', 'march', 'april', 'may', 'june', 
        'july', 'august', 'september', 'october', 'november', 'december', '2024', '2025'].includes(word));
      const hasBudgetKeyword = keywords.some(word => 
        ['cheap', 'budget', 'affordable', 'expensive', 'luxury', 'price', 'cost'].includes(word));
      
      let intro = `I'd be happy to help you with "${query}"!`;
      
      if (hasLocationKeyword) {
        intro += ` I notice you're interested in festivals in specific locations.`;
      }
      if (hasGenreKeyword) {
        intro += ` Your music preferences will help me find the perfect festival for you.`;
      }
      if (hasTimeKeyword) {
        intro += ` The timing you mentioned will be important for your festival planning.`;
      }
      if (hasBudgetKeyword) {
        intro += ` I understand budget considerations are important to you.`;
      }
      
      mockResponse = `${intro} I can assist you with:
        
🗺️ **Festival Destinations** - Find the perfect location for your next festival adventure
${hasLocationKeyword ? '  • Personalized recommendations for your preferred regions' : ''}
${hasLocationKeyword ? '  • Local travel tips and cultural highlights' : ''}

🎪 **Event Discovery** - Discover festivals matching your music taste and schedule
${hasGenreKeyword ? '  • Curated selections based on your favorite music genres' : ''}
${hasTimeKeyword ? '  • Events aligned with your preferred timing' : ''}

🎵 **Music Exploration** - Find new artists and genres through festival lineups
${hasGenreKeyword ? '  • Similar artists to expand your musical horizons' : ''}
${hasGenreKeyword ? '  • Emerging talent in your favorite genres' : ''}

${hasBudgetKeyword ? '💰 **Budget Planning** - Options for every price point from budget-friendly to luxury\n' : ''}

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