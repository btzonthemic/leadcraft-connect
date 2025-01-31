import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

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
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { type, topic, tone = 'professional' } = await req.json();
    console.log('Generating content for:', { type, topic, tone });
    
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

    console.log('Sending request to Gemini with prompt:', prompt);

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response:', text);
    
    if (!text) {
      console.error('No content in Gemini response');
      throw new Error('No content generated');
    }

    return new Response(
      JSON.stringify({ 
        content: text,
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