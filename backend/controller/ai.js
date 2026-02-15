import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const apiKey = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI({ apiKey }); 
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function processAI(input, jobpost) {
    try {
        const prompt = `Read the candidate’s data and the job description.

Evaluate the candidate using only the following criteria:

Education level: Match the degree requirement in the job description.

GPA: Consider higher GPA as a positive factor.

Skill match: How well primarySkill matches the required skills.

Tools match: How well toolsAndTechnologies matches the required tools/technologies.

GitHub presence: Consider activity, projects, or relevance if github is provided.

Project quality: Evaluate projectDescription and projectLink for relevance, impact, and complexity.

Salary expectation: Compare salaryExpectation to the market/role expectations; too high may slightly reduce the score.

Position relevance: Check if the position applied matches the role in the job description.

Assign a score from 1-10, where 10 is the best fit.

Provide only the score and nothing else. ${input} Job Description: ${jobpost}`;

        const result = await model.generateContent({ prompt });

        
        const output = result?.candidates?.[0]?.content || result?.text || "No output";

        return output;
    } catch (err) {
        console.error("AI processing error:", err);
        return "Error in processing AI";
    }
}
