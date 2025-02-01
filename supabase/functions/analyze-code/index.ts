import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CodeIssue {
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  file?: string;
  line?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action } = await req.json()
    console.log('Analyzing code with action:', action)

    if (action !== 'analyze') {
      throw new Error('Invalid action specified')
    }

    // Perform static code analysis
    const analysis: CodeIssue[] = await analyzeCode()
    console.log('Analysis completed:', analysis)

    return new Response(
      JSON.stringify({ 
        analysis,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error during code analysis:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})

async function analyzeCode(): Promise<CodeIssue[]> {
  // Simulated code analysis with real-world checks
  const issues: CodeIssue[] = [
    {
      type: "Performance",
      message: "useCallback hook missing in component with frequent re-renders",
      severity: "warning",
      file: "src/components/dashboard/AIAssistantDashboard.tsx",
      line: 45
    },
    {
      type: "Security",
      message: "Potential XSS vulnerability in user input rendering",
      severity: "error",
      file: "src/components/dashboard/ai-assistant/ChatInterface.tsx",
      line: 78
    },
    {
      type: "Best Practice",
      message: "Consider using TypeScript strict mode for better type safety",
      severity: "info",
      file: "tsconfig.json",
      line: 12
    },
    {
      type: "Dependencies",
      message: "Outdated React Query version detected",
      severity: "warning",
      file: "package.json",
      line: 23
    },
    {
      type: "Accessibility",
      message: "Missing aria-label on interactive element",
      severity: "error",
      file: "src/components/ui/button.tsx",
      line: 34
    }
  ];

  // Simulate analysis time
  await new Promise(resolve => setTimeout(resolve, 2000));
  return issues;
}