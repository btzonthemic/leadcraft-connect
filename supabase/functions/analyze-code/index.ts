import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Mock analysis results for demonstration
    // In a real implementation, this would analyze actual code
    const mockAnalysis = [
      {
        type: "Performance",
        message: "Consider memoizing expensive calculations in ComponentX",
        severity: "warning",
        file: "src/components/ComponentX.tsx",
        line: 45
      },
      {
        type: "Best Practice",
        message: "Use const instead of let for values that aren't reassigned",
        severity: "info",
        file: "src/utils/helpers.ts",
        line: 23
      },
      {
        type: "Security",
        message: "Potential XSS vulnerability in user input handling",
        severity: "error",
        file: "src/components/Form.tsx",
        line: 78
      }
    ];

    // Add some random delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    return new Response(
      JSON.stringify({ 
        analysis: mockAnalysis
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})