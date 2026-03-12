import { GoogleGenAI } from "@google/genai";

async function getYouTubeVideoIds() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Please provide a list of at least 10 YouTube video IDs for the channel 'Kevekha Kevin Zehol' (@kevekhakevinzehol9688). Return only the IDs as a comma-separated list.",
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  console.log(response.text);
}

getYouTubeVideoIds();
