"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

function ApplicantDetail() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/applications/${id}`,
        );
        setApplicant(response.data.data);
      } catch (error) {
        console.error("Error fetching applicant:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplicant();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-700 text-xl">Loading...</p>
      </div>
    );

  if (!applicant)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-700 text-xl">Applicant not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-20 bg-white shadow-sm border-b">
        <p className="text-2xl font-bold text-gray-800">Admin Dashboard</p>
        <p className="text-gray-500">Detail: {applicant.fullname}</p>
      </div>

      {/* Card Container */}
      <div className="max-w-6xl mx-20 mt-10 bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Applicant Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Name:</p>
            <p>{applicant.fullname}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p>{applicant.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Phone:</p>
            <p>{applicant.phoneNumber}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Position:</p>
            <p>{applicant.position}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Education:</p>
            <p>{applicant.educationLevel}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">GPA:</p>
            <p>{applicant.gpa || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Age:</p>
            <p>{applicant.age || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Primary Skill:</p>
            <p>{applicant.primarySkill}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-semibold text-gray-700">Tools & Technologies:</p>
            <p>{applicant.toolsAndTechnologies || "N/A"}</p>
          </div>
          {applicant.project && (
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-700">Project:</p>
              <p>{applicant.project}</p>
            </div>
          )}
          {applicant.projectDescription && (
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-700">
                Project Description:
              </p>
              <p>{applicant.projectDescription}</p>
            </div>
          )}
          {applicant.github && (
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-700">GitHub:</p>
              <a
                href={applicant.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {applicant.github}
              </a>
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-700">Salary Expectation:</p>
            <p>{applicant.salaryExpectation}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">CV:</p>
            <a
              href={applicant.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View CV
            </a>
          </div>
          {applicant.whyHireYou && (
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-700">Why Hire:</p>
              <p>{applicant.whyHireYou}</p>
            </div>
          )}
          {applicant.score && (
            <div>
              <p className="font-semibold text-gray-700">Score:</p>
              <p>{applicant.score}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicantDetail;
