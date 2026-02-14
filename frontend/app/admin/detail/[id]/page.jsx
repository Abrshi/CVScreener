"use client";
import { useParams } from "next/navigation";

function Page() {
  const { id } = useParams();

  return (
    <>
      {/* Header */}
      <div className="h-20 flex items-center justify-between text-white font-bold text-2xl px-20 border-b bg-gray-700">
        <div>
          <p>Admin Page</p>
        </div>
        <div>
          <p>Detail for user ID: {id}</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="overflow-x-auto mx-20 mt-10 p-6 rounded-2xl bg-gray-700">

        {/* Info Rows */}
        <div className="divide-y divide-gray-400">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 min-h-15">
            <p className="text-lg font-semibold">Name: Abebe Beso Bela</p>
            <p className="text-lg font-semibold">Email: abebebeso@gmail.com</p>
            <p className="text-lg font-semibold">Phone: 0912345678</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 min-h-15">
            <p className="text-lg font-semibold">Education: Bachelor Degree in Computer Science</p>
            <p className="text-lg font-semibold rounded-2xl p-2 bg-gray-600">GPA: 3.75</p>
          </div>

          <div className="flex flex-col py-4 min-h-15">
            <p>
              Primary Skills: Programming languages (Python, Java, C++), Web development (HTML, CSS, JavaScript), Database management (SQL), Data analysis (Excel, R)
            </p>
          </div>

          <div className="flex flex-col py-4 min-h-15">
            <p>Tools and Technologies: Git, Docker, AWS, Linux</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 min-h-15">
            <p className="text-lg font-semibold">Project Link: www.test.com</p>
            <p className="text-lg font-semibold">GitHub URL: https://github.com/test</p>
            <p className="text-lg font-semibold">Salary: 5000 ETB</p>
          </div>

          <div className="flex flex-col py-4 min-h-15">
            <p>
              Why you are here: I am here to learn and grow as a software developer, and to contribute to the tech community with my skills and knowledge.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 min-h-15">
            <p>CV Link: www.test.com/cv</p>
            <p className="text-lg font-semibold">Position: Software Developer</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Page;
