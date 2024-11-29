import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generatePaletteFromText(text: string): Promise<string[]> {
  const prompt = `Generate a harmonious color palette of 5 colors based on the text: "${text}". 
                 Return only the hex codes in a JSON array format.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const colors: string[] = JSON.parse(response.text());
  
  return colors.map(color => color.toLowerCase());
}