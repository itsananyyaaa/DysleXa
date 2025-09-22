import React from "react";

export default function LandingPage() {
  const sections = [
    {
      title: "Let's Start Learning",
      description: "Jump into our reading-assistance app and enhance your skills.",
      buttonText: "Start Learning",
      href: "/exercise",
    },
    {
      title: "Quiz Section",
      description: "Test your knowledge and track your progress with fun quizzes.",
      buttonText: "Take a Quiz",
      href: "/quiz",
    },
    {
      title: "Community Hub",
      description: "Share your achievements and connect with fellow learners.",
      buttonText: "Join Community",
      href: "/quiz",
    },
    {
      title: "Expert Mentors",
      description: "Get personalized guidance from our expert mentors for $100/month.",
      buttonText: "Find a Mentor",
      href: "/quiz",
    },
  ];

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
    fontFamily: "Arial, sans-serif",
    color: "#111",
    padding: "40px 20px",
    boxSizing: "border-box",
  };

  const headerStyle = {
    marginBottom: "40px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "64px",
    fontWeight: "bold",
    margin: 0,
    background: "linear-gradient(to right, #2563eb, #7c3aed, #f59e0b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const subtitleStyle = {
    marginTop: "16px",
    fontSize: "22px",
    color: "#444",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.5",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    width: "100%",
    maxWidth: "1100px",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "24px",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    minHeight: "250px",
  };

  const cardTitle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
  };

  const cardDesc = {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#555",
    lineHeight: "1.4",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background 0.3s",
  };

  const footerStyle = {
    marginTop: "60px",
    padding: "20px",
    color: "#666",
    fontSize: "14px",
    textAlign: "center",
    width: "100%",
    borderTop: "1px solid #ddd",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>DysleXa</h1>
        <p style={subtitleStyle}>Your AI-powered companion for joyful and confident reading.</p>
      </div>

      {/* Sections */}
      <div style={gridStyle}>
        {sections.map((section, idx) => (
          <div
            key={idx}
            style={cardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)")}
          >
            <div>
              <h2 style={cardTitle}>{section.title}</h2>
              <p style={cardDesc}>{section.description}</p>
            </div>
            <a
              href={section.href}
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
            >
              {section.buttonText}
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} DysleXa. All rights reserved.</p>
      </footer>
    </div>
  );
}
