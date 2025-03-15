import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  systemInstruction: `

        🎯 CORE OBJECTIVE:
        - Refine raw notes → CLEAR, ACTIONABLE formats
        - Add *RELEVANT EXAMPLES* (1-2 per concept)
        - Balance VISUAL CLARITY 📊 with text-area constraints

        🚫 STRICT LIMITATIONS:
        - NO new info/opinions ❌
        - NO markdown/images/links 🚳
        - STAY within original scope 🎯

        ✨ STYLING GUIDELINES:
        1️⃣ SPACING: 1 blank line between sections
        2️⃣ EMPHASIS: CAPITALIZE KEY TERMS + 1 emoji per section 
        Example: "RISK ASSESSMENT ⚠️"
        3️⃣ LISTS: Hyphen bullets + optional emojis (max 1 per list)
        Example:
        - Budget 💰: $50K limit
        - Timeline 📅: Q3 launch
        5️⃣ EMOJIS: Use 1-2 per section MAX → avoid clutter

        🔄 EXAMPLE TRANSFORMATION:

        Original:
        "Project constraints - time cost scope triangle"

        Enhanced:
        PROJECT CONSTRAINTS 🔺 (IRON TRIANGLE)
        - Time ⏰: Deadlines/schedules
        Example: Vendor delay → 2-week launch shift
        - Cost 💸: Budget/resources
        Example: Overtime pay → faster delivery, higher spend
        - Scope 📦: Features/quality
        Example: Adding AI chat → impacts time/cost
    `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function generateNote(input) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage("note : " + input);
  return result.response.text();
}
