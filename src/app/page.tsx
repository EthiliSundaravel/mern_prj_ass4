export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200">
      <section className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-indigo-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 rounded-full p-4 mb-3 shadow">
            <svg
              className="w-12 h-12 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow-lg text-center">
            MERN Full-Stack Assignment
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2 text-center max-w-xl">
            Explore a modern, production-grade web application built with{" "}
            <span className="font-semibold text-indigo-600">MongoDB</span>,{" "}
            <span className="font-semibold text-indigo-600">Express</span>,{" "}
            <span className="font-semibold text-indigo-600">React</span>, and{" "}
            <span className="font-semibold text-indigo-600">Node.js</span> using{" "}
            <span className="font-semibold text-indigo-600">Next.js</span> and{" "}
            <span className="font-semibold text-indigo-600">Tailwind CSS</span>.
          </p>
        </div>

        {/* 🔐 Static Username & Password */}
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-inner w-full max-w-md text-center">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Test Credentials</h2>
          <p className="text-gray-700 mb-1">
            <strong>Username:</strong> ethiliadmin@gmail.com
          </p>
          <p className="text-gray-700">
            <strong>Password:</strong> ethili
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <span className="inline-block bg-indigo-50 text-indigo-700 px-6 py-2 rounded-full text-base font-medium shadow">
            MERN • Next.js • Tailwind CSS
          </span>
          <p className="mt-4 text-gray-500 text-center text-sm max-w-md">
            This assignment demonstrates user authentication, dashboard, audit logs,
            and a clean, responsive UI. Built for learning and production-ready
            deployment.
          </p>
        </div>
      </section>
    </main>
  );
}
