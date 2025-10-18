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
    const { prompt, apiKey } = await req.json();
    console.log('Generating video with prompt:', prompt);

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    if (!apiKey) {
      throw new Error('Replicate API key is required');
    }

    // Use Replicate API for video generation
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "6a8f9e26c8b5c26dea5f1f34e45b9c4f2c4d1234", // This is a placeholder, use actual model version
        input: {
          prompt: prompt,
          num_frames: 24,
          num_inference_steps: 20,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Replicate API error:', response.status, errorText);
      
      if (response.status === 401) {
        return new Response(
          JSON.stringify({ error: 'Invalid API key. Please check your Replicate API key in settings.' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`Replicate API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('Video generation started:', data);

    return new Response(
      JSON.stringify({ 
        predictionId: data.id,
        status: data.status,
        message: 'Video generation started. This may take a few minutes.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in generate-video function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
