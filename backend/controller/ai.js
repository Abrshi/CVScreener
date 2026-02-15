import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function processAI(input, jobpost) {
  try {
    const prompt = `
Read the candidate’s data and the job description.

Evaluate the candidate using only the following criteria:

Education level: Match the degree requirement in the job description.
GPA: Consider higher GPA as a positive factor.
Skill match: How well primarySkill matches required skills.
Tools match: How well toolsAndTechnologies matches required tools.
GitHub presence: Consider activity or relevance if github is provided.
Project quality: Evaluate projectDescription and projectLink.
Salary expectation: Compare salaryExpectation to role expectations.
Position relevance: Check if applied position matches role.

Assign a score from 1-10.
Provide only the score and nothing else.

Candidate Data: ${JSON.stringify(input)}
Job Description: ${JSON.stringify(jobpost)}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();

    return text;

  } catch (err) {
    console.error("AI processing error:", err);
    return "Error in processing AI";
  }
}
