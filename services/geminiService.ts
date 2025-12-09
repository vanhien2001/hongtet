import { GoogleGenAI, Type } from "@google/genai";
import { QnA } from '../types';

const apiKey = process.env.API_KEY;

// Initialize Gemini client only if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateEventDetails = async (eventName: string): Promise<QnA[]> => {
  if (!ai) {
    console.warn("API Key not found, returning empty details.");
    return [];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Hãy đóng vai một chuyên gia văn hóa Việt Nam. Hãy tạo ra 4 câu hỏi và trả lời ngắn gọn, thú vị về sự kiện: "${eventName}". 
      Tập trung vào nguồn gốc, ý nghĩa, và các hoạt động thú vị. 
      Trả về định dạng JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QnA[];
    }
    return [];
  } catch (error) {
    console.error("Error generating event details:", error);
    return [];
  }
};