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
    const { topic, attempt = 1 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Generating questions for topic: ${topic}, attempt: ${attempt}`);

    const strictness = attempt > 1 ? 'You MUST respond with ONLY valid JSON. No markdown, no code blocks, no explanations.' : '';

    const systemPrompt = `You are a quiz generator. Generate exactly 5 multiple-choice questions about ${topic}. ${strictness}

CRITICAL: Respond with ONLY a valid JSON array. No markdown, no code blocks, no explanations, no additional text.

Each question must follow this exact format:
{"question": "string", "options": ["option1", "option2", "option3", "option4"], "correctIndex": 0}

The correctIndex must be 0, 1, 2, or 3.

Example response format:
[{"question":"What is X?","options":["A","B","C","D"],"correctIndex":0},{"question":"What is Y?","options":["A","B","C","D"],"correctIndex":1}]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate 5 ${topic} quiz questions now.` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI service payment required.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in response:', data);
      throw new Error('No content in AI response');
    }

    console.log('Raw AI response:', content);

    // Clean up the response
    content = content.trim();
    
    // Remove markdown code blocks if present
    if (content.startsWith('```json')) {
      content = content.slice(7);
    } else if (content.startsWith('```')) {
      content = content.slice(3);
    }
    if (content.endsWith('```')) {
      content = content.slice(0, -3);
    }
    content = content.trim();

    // Try to parse JSON
    let questions;
    try {
      questions = JSON.parse(content);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Content that failed to parse:', content);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate structure
    if (!Array.isArray(questions) || questions.length !== 5) {
      console.error('Invalid question count:', questions?.length);
      throw new Error('Expected exactly 5 questions');
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (
        typeof q.question !== 'string' ||
        !Array.isArray(q.options) ||
        q.options.length !== 4 ||
        typeof q.correctIndex !== 'number' ||
        q.correctIndex < 0 ||
        q.correctIndex > 3
      ) {
        console.error(`Invalid question ${i}:`, q);
        throw new Error(`Question ${i + 1} has invalid format`);
      }
    }

    console.log('Successfully generated questions');

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-questions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
