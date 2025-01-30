import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, topic, tone = 'professional' } = await req.json();
    
    let prompt = '';
    switch (type) {
      case 'title':
        prompt = `Generate a compelling blog post title about ${topic} for a heat pump installation company. The tone should be ${tone}.`;
        break;
      case 'excerpt':
        prompt = `Write a brief, engaging excerpt (2-3 sentences) about ${topic} for a heat pump installation company blog post. The tone should be ${tone}.`;
        break;
      case 'content':
        prompt = `Write a detailed, informative blog post about ${topic} for a heat pump installation company. Include technical details while remaining accessible to homeowners. The tone should be ${tone}. Structure the content with clear sections.`;
        break;
      default:
        throw new Error('Invalid content type requested');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert HVAC content writer specializing in heat pump installations and energy efficiency. Your content is accurate, engaging, and optimized for both homeowners and professionals.'
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    console.log('AI Response:', data);
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('No content generated');
    }

    return new Response(
      JSON.stringify({ 
        content: data.choices[0].message.content,
        type 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating content:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});