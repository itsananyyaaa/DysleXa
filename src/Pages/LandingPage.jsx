import React from "react";

export default function LandingPage() {
  const sections = [
    {
      title: "Start Learning",
      description: "Jump into our reading-assistance section and enhance your skills with interactive exercises.",
      buttonText: "Start Learning",
      href: "/exercise",
      icon: "📚",
      color: "from-[#FFC7A7] to-[#B87C4C]"
    },
    {
      title: "Take a Quiz",
      description: "Test your knowledge and track your progress with our fun and engaging quizzes.",
      buttonText: "Take a Quiz",
      href: "/quiz",
      icon: "📝",
      color: "from-[#C6D870] to-[#FFC7A7]"
    },
    {
      title: "Join the Community",
      description: "Share your achievements and connect with a supportive community of fellow learners.",
      buttonText: "Join Community",
      href: "/community",
      icon: "👥",
      color: "from-[#B87C4C] to-[#C6D870]"
    },
    {
      title: "Find a Mentor",
      description: "Get personalized, one-on-one guidance from our expert mentors to reach your goals.",
      buttonText: "Find a Mentor",
      href: "/mentors",
      icon: "🧑‍🏫",
      color: "from-[#B87C4C] to-[#FFC7A7]"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-zinc-50 font-sans text-stone-900 p-8 md:p-12 lg:p-16">
      {/* Header */}
      <header className="mb-12 text-center max-w-4xl">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800">
          DysleXa
        </h1>
        <p className="text-lg md:text-xl text-stone-600 font-medium">
          Your AI-powered companion for joyful and confident reading.
        </p>
      </header>

      {/* Sections Grid */}
      <section className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden bg-white p-6 rounded-3xl shadow-lg border border-stone-200 transform transition-transform duration-300 hover:scale-105`}
            >
              {/* Colored background blob for visual effect */}
              <div
                className={`absolute inset-x-0 -top-16 h-48 w-48 mx-auto -z-10 rounded-full blur-2xl opacity-70 bg-gradient-to-br ${section.color}`}
              ></div>

              <div className="text-center mb-4 flex justify-center items-center text-6xl">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
                {section.title}
              </h2>
              <p className="text-sm text-stone-600 mb-6 text-center">
                {section.description}
              </p>
              <div className="flex justify-center">
                <a
                  href={section.href}
                  className={`inline-flex items-center px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r ${section.color}`}
                >
                  {section.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 w-full text-center text-stone-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DysleXa. All rights reserved.</p>
      </footer>
    </div>
  );
}
