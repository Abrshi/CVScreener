import { z } from "zod";

export const applicationSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  age: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  gpa: z.string().optional(),
  primarySkill: z.string().min(1, "Primary skill is required"),
  toolsAndTechnologies: z.string().optional(),
  github: z.string().optional(),
  aiExperience: z.string().optional(),
  project: z.string().optional(),
  projectDescription: z.string().optional(),
  salaryExpectation: z.string().min(1, "Salary expectation is required"),
  cv: z.string().min(1, "CV path or URL is required"),
  whyHireYou: z.string().optional(),
  position: z.string().min(1, "Position is required"),
});
