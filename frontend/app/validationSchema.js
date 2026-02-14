import { z } from "zod";

export const applicationSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  age: z.coerce.number().min(16).max(100).optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  educationLevel: z.enum([
    "High School",
    "Diploma",
    "Bachelor",
    "Master",
    "PhD",
    "Other",
  ]),
  gpa: z.coerce.number().min(0).max(4).optional(),
  primarySkill: z.string().min(1, "Primary skill is required"),
  // These will be strings in the UI, converted to arrays on submit
  toolsAndTechnologies: z.string().optional(),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),

  project: z.string().optional(),
  projectDescription: z.string().optional(),
  salaryExpectation: z.coerce.number().min(1, "Salary expectation is required"),
  cv: z.string().min(1, "CV path or URL is required"),
  whyHireYou: z.string().optional(),
  position: z.string().min(1, "Position is required"),
});
