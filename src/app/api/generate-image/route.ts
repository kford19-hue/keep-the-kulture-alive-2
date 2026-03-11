import { buildImagePrompt, type OracleInput } from "@/lib/oracleLookBuilder";
import { NextResponse } from "next/server";

interface ImageData {
  b64_json?: string;
}

interface OpenAIImageResponse {
  data?: ImageData[];
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY. Add it to your environment before generating images." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as OracleInput;
    const promptInputs = {
      mood: body.mood?.trim() || "Commanding",
      eventType: body.eventType?.trim() || "Dinner Event",
      aesthetic: body.aesthetic?.trim() || "Futuristic Femme"
    };

    const prompts = [0, 1, 2].map((variant) => buildImagePrompt(promptInputs, variant));
    const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";

    const responses = await Promise.all(
      prompts.map(async (prompt) => {
        const openAIResponse = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            prompt,
            size: "1024x1536",
            quality: "medium"
          })
        });

        if (!openAIResponse.ok) {
          const errorText = await openAIResponse.text();
          throw new Error(`OpenAI image generation failed: ${errorText}`);
        }

        const payload = (await openAIResponse.json()) as OpenAIImageResponse;
        const image = payload.data?.[0]?.b64_json;

        if (!image) {
          throw new Error("OpenAI image generation returned no image data.");
        }

        return {
          prompt,
          imageUrl: `data:image/png;base64,${image}`
        };
      })
    );

    return NextResponse.json({ images: responses });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
