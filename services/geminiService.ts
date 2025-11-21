import { GoogleGenAI } from "@google/genai";

// Helper to manage the API Key selection for Veo
export const ensureApiKey = async (): Promise<void> => {
  if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }
  }
};

export const generateVideoFromImage = async (
  imageBase64: string,
  prompt: string
): Promise<string> => {
  // Always ensure we have a key before starting
  await ensureApiKey();

  // Re-initialize with the potentially newly selected key available in process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // 1. Start the video generation operation
    // We use fast-generate-preview for quicker feedback, or remove 'fast-' for higher quality
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: {
        imageBytes: imageBase64,
        mimeType: 'image/jpeg', // Assuming JPEG for simplicity from canvas/input
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16', // Vertical video for mobile style memories
      }
    });

    // 2. Poll for completion
    while (!operation.done) {
      // Wait 5 seconds before polling again
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
      console.log('Polling video status...', operation.metadata);
    }

    // 3. Extract result
    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
      throw new Error("No video URI returned from API.");
    }

    // 4. Append API key for playback
    return `${videoUri}&key=${process.env.API_KEY}`;

  } catch (error: any) {
    console.error("Video generation failed:", error);
    // Handle the specific "Requested entity was not found" race condition
    if (error.message && error.message.includes("Requested entity was not found")) {
        if ((window as any).aistudio) {
             await (window as any).aistudio.openSelectKey();
             throw new Error("Sessão expirada. Por favor, selecione sua chave novamente e tente de novo.");
        }
    }
    throw error;
  }
};

// Helper to convert File to Base64 (stripped of header)
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove "data:image/jpeg;base64," prefix
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};