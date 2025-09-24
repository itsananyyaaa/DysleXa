import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const sections = [
    {
      title: "Start Learning",
      description: "Jump into our reading-assistance section and enhance your skills with interactive exercises.",
      buttonText: "Start Learning",
      href: "/exercise",
      icon: "📚",
      color: "linear-gradient(135deg, #FFC7A7, #B87C4C)",
    },
    {
      title: "Take a Quiz",
      description: "Test your knowledge and track your progress with our fun and engaging quizzes.",
      buttonText: "Take a Quiz",
      href: "/quiz",
      icon: "📝",
      color: "linear-gradient(135deg, #C6D870, #FFC7A7)",
    },
    {
      title: "Join the Community",
      description: "Share your achievements and connect with a supportive community of fellow learners.",
      buttonText: "Join Community",
      href: "/community",
      icon: "👥",
      color: "linear-gradient(135deg, #B87C4C, #C6D870)",
    },
    {
      title: "Find a Mentor",
      description: "Get personalized, one-on-one guidance from our expert mentors to reach your goals.",
      buttonText: "Find a Mentor",
      href: "/mentors",
      icon: "🧑‍🏫",
      color: "linear-gradient(135deg, #B87C4C, #FFC7A7)",
    },
  ];

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <h1 className="landing-title">DysleXa</h1>
        <p className="landing-subtitle">Your AI-powered companion for joyful and confident reading.</p>
      </header>

      {/* Sections */}
      <section className="sections-grid">
        {sections.map((section, idx) => (
          <div key={idx} className="card">
            <div className="card-blob" style={{ background: section.color }}></div>

            <div className="card-icon">{section.icon}</div>
            <h2 className="card-title">{section.title}</h2>
            <p className="card-description">{section.description}</p>
            <div className="card-button-container">
              <a href={section.href} className="card-button" style={{ background: section.color }}>
                {section.buttonText}
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} DysleXa. All rights reserved.</p>
      </footer>
    </div>
  );
}
