"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const [rankedApplicants, setRankedApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankedApplicants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/applications/ranked",
        );
        setRankedApplicants(response.data.data);
      } catch (error) {
        console.error("Error fetching ranked applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankedApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-20 bg-white shadow-sm border-b">
        <p className="text-2xl font-bold">Admin Dashboard</p>
        <p className="text-gray-500">
          Total Ranked:{" "}
          <span className="font-semibold">{rankedApplicants.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="mx-20 mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <p className="p-10 text-center text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b text-gray-600 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {rankedApplicants.map((applicant, index) => (
                  <tr
                    key={applicant._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {applicant.fullname}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {applicant.position}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                        {applicant.score}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/detail/${applicant._id}`}
                        className="inline-block px-4 py-2 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition"
                      >
                        View Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
