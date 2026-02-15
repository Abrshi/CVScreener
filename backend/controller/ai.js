const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.processAI = async (input, jobpost) => {
  try {
    // Dynamic import for ESM package
    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    const apiKey = process.env.GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Read the candidate’s data and the job description.

Evaluate and assign a score from 1-10.
Provide only the number.

Candidate: ${JSON.stringify(input)}
Job: ${JSON.stringify(jobpost)}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("AI Response:", text);

    return text;

  } catch (err) {
    console.error("AI processing error:", err);
    return "Error in processing AI";
  }
};
