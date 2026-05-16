const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const parseDocumentWithGemini = async (text, documentType) => {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Extract structured JSON from this ${documentType}.

Return ONLY valid JSON.

Document text:
${text}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();

  } catch (error) {

    console.log(error);

    return {
      error: "Gemini parsing failed"
    };
  }
};

module.exports = parseDocumentWithGemini;