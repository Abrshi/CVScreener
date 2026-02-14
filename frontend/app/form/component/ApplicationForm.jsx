"use client";

import React, { useState } from "react";
import axios from "axios";
// import { applicationSchema } from "./validationSchema";
import { applicationSchema } from "../../validationSchema";

// Shadcn UI components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    phoneNumber: "",
    educationLevel: "",
    gpa: "",
    primarySkill: "",
    toolsAndTechnologies: "",
    github: "",
    aiExperience: "",
    project: "",
    salaryExpectation: "",
    cv: "",
    whyHireYou: "",
    position: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing again
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError("");

    const result = applicationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/applications", formData);
      alert("Application Submitted Successfully!");
      setFormData({
        fullname: "",
        email: "",
        age: "",
        phoneNumber: "",
        educationLevel: "",
        gpa: "",
        primarySkill: "",
        toolsAndTechnologies: "",
        github: "",
        aiExperience: "",
        project: "",
        salaryExpectation: "",
        cv: "",
        whyHireYou: "",
        position: "",
      });
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          "Failed to submit. Check your connection.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-3 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold  bg-clip-text text-transparent">
            Job Application
          </h1>
          <p className="text-gray-600">
            Complete the form below to submit your application
          </p>
        </div>

        {serverError && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* section one */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <Input
                  name="fullname"
                  placeholder="John Doe"
                  onChange={handleChange}
                  value={formData.fullname}
                  className="border-gray-300 focus:border-blue-500"
                />
                {errors.fullname && (
                  <p className="text-xs text-red-600">{errors.fullname}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  onChange={handleChange}
                  value={formData.email}
                  className="border-gray-300 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Age</label>
                <Input
                  name="age"
                  type="number"
                  placeholder="25"
                  onChange={handleChange}
                  value={formData.age}
                  className="border-gray-300 focus:border-blue-500"
                />
                {errors.age && (
                  <p className="text-xs text-red-600">{errors.age}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <Input
                  name="phoneNumber"
                  placeholder="+1234567890"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  className="border-gray-300 focus:border-blue-500"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* section two */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Education Level <span className="text-red-500">*</span>
                </label>

                <Select
                  value={formData.educationLevel}
                  onValueChange={(val) =>
                    setFormData({ ...formData, educationLevel: val })
                  }
                >
                  <SelectTrigger className="h-10 border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:ring-offset-1 transition-shadow">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>

                  <SelectContent className="max-h-60">
                    {[
                      "High School",
                      "Diploma",
                      "Bachelor's",
                      "Master's",
                      "PhD",
                      "Other",
                    ].map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.educationLevel && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.educationLevel}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  GPA (0-4)
                </label>
                <Input
                  name="gpa"
                  type="number"
                  step="0.01"
                  placeholder="3.5"
                  onChange={handleChange}
                  value={formData.gpa}
                  className="border-gray-300 focus:border-purple-500"
                />
                {errors.gpa && (
                  <p className="text-xs text-red-600">{errors.gpa}</p>
                )}
              </div>
            </div>
          </div>

          {/* section three */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              Skills & Experience
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Primary Skill *
                </label>
                <Input
                  name="primarySkill"
                  placeholder="e.g., JavaScript, Python, Java"
                  onChange={handleChange}
                  value={formData.primarySkill}
                  className="border-gray-300 focus:border-indigo-500"
                />
                {errors.primarySkill && (
                  <p className="text-xs text-red-600">{errors.primarySkill}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tools & Technologies
                </label>
                <Input
                  name="toolsAndTechnologies"
                  placeholder="e.g., React, Node.js, Docker"
                  onChange={handleChange}
                  value={formData.toolsAndTechnologies}
                  className="border-gray-300 focus:border-indigo-500"
                />
                {errors.toolsAndTechnologies && (
                  <p className="text-xs text-red-600">
                    {errors.toolsAndTechnologies}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    GitHub Profile
                  </label>
                  <Input
                    name="github"
                    placeholder="https://github.com/username"
                    onChange={handleChange}
                    value={formData.github}
                    className="border-gray-300 focus:border-indigo-500"
                  />
                  {errors.github && (
                    <p className="text-xs text-red-600">{errors.github}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    AI Experience
                  </label>
                  <Input
                    name="aiExperience"
                    placeholder="e.g., 2 years"
                    onChange={handleChange}
                    value={formData.aiExperience}
                    className="border-gray-300 focus:border-indigo-500"
                  />
                  {errors.aiExperience && (
                    <p className="text-xs text-red-600">
                      {errors.aiExperience}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Project
                </label>
                <Input
                  name="project"
                  placeholder="Notable project or portfolio link"
                  onChange={handleChange}
                  value={formData.project}
                  className="border-gray-300 focus:border-indigo-500"
                />
                {errors.project && (
                  <p className="text-xs text-red-600">{errors.project}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                4
              </span>
              Position & Compensation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Position *
                </label>
                <Input
                  name="position"
                  placeholder="e.g., Software Engineer"
                  onChange={handleChange}
                  value={formData.position}
                  className="border-gray-300 focus:border-green-500"
                />
                {errors.position && (
                  <p className="text-xs text-red-600">{errors.position}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Salary Expectation *
                </label>
                <Input
                  name="salaryExpectation"
                  type="number"
                  placeholder="80000"
                  onChange={handleChange}
                  value={formData.salaryExpectation}
                  className="border-gray-300 focus:border-green-500"
                />
                {errors.salaryExpectation && (
                  <p className="text-xs text-red-600">
                    {errors.salaryExpectation}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                5
              </span>
              Additional Information
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  CV/Resume URL *
                </label>
                <Input
                  name="cv"
                  placeholder="https://drive.google.com/..."
                  onChange={handleChange}
                  value={formData.cv}
                  className="border-gray-300 focus:border-orange-500"
                />
                {errors.cv && (
                  <p className="text-xs text-red-600">{errors.cv}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Why should we hire you?
                </label>
                <Textarea
                  name="whyHireYou"
                  placeholder="Tell us what makes you a great fit..."
                  onChange={handleChange}
                  value={formData.whyHireYou}
                  rows={4}
                  className="border-gray-300 focus:border-orange-500 resize-none"
                />
                {errors.whyHireYou && (
                  <p className="text-xs text-red-600">{errors.whyHireYou}</p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
