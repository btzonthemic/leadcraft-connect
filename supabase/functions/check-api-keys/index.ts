import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get all API keys
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const HUGGINGFACE_API_KEY = Deno.env.get('HUGGINGFACE_API_KEY');

    // Return the status of each key (true if exists, false if not)
    return new Response(
      JSON.stringify({
        data: {
          DEEPSEEK_API_KEY: !!DEEPSEEK_API_KEY,
          GEMINI_API_KEY: !!GEMINI_API_KEY,
          OPENAI_API_KEY: !!OPENAI_API_KEY,
          HUGGINGFACE_API_KEY: !!HUGGINGFACE_API_KEY,
        }
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error) {
    console.error('Error checking API keys:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});