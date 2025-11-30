import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export interface TaxExplanation {
  explanation: string;
  legalContext: string;
}

export const getTaxExplanation = async (grossSalary: number): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const prompt = `
      I have a gross annual salary (Bruto) of £${grossSalary.toLocaleString()}.
      Based on the latest UK tax laws for the 2024/2025 tax year (Finance Act 2024), please provide:
      1. A concise calculation of the estimated Net Salary (Neto).
      2. A breakdown of Income Tax and National Insurance contributions.
      3. Reference the specific tax bands and personal allowance rules used.
      
      Format the response using Markdown. Keep it professional but easy to understand.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert UK Tax Accountant and Legal Advisor. You provide accurate calculations based on the Finance Act and HMRC guidelines. You focus on the 2024/2025 tax year rates.",
        temperature: 0.3,
      }
    });

    return response.text || "Could not generate an explanation.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while fetching the tax explanation. Please try again later.";
  }
};