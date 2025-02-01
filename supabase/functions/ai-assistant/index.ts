import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const { message, conversation } = await req.json();

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `You are an AI assistant managing a lead generation platform for plumbers, electricians, heating professionals, and heat pump contractors. Your capabilities include:
- Managing and optimizing the platform
- Handling database operations and API management
- Managing leads and contractor assignments
- Monitoring system performance and fixing issues
- Providing business insights and growth strategies

Current conversation context:
${conversation.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')}

Please provide a helpful and relevant response to continue the conversation.`;

    const result = await model.generateContent([systemPrompt, message]);
    const response = result.response.text();

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
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