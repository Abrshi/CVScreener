export default function LandingPage() {
  const roles = [
    {
      title: "Frontend Developer",
      description: "React, TypeScript, Modern UI",
    },
    {
      title: "Backend Developer",
      description: "Node.js, APIs, Databases",
    },
    {
      title: "Full Stack Developer",
      description: "MERN Stack, End-to-End Systems",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Hero */}
      <section
        className="h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
        }}
      >
        <div className="bg-black/60 p-10 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build Your Career With Us 🚀
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Explore open roles and apply today.
          </p>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-6 bg-gray-50 flex-1">
        <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
              <p className="text-gray-600 mb-6">{role.description}</p>
              <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Apply
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        © {new Date().getFullYear()} CV Screener. All rights reserved.
      </footer>
    </div>
  );
}
