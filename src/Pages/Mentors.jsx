import React, { useState } from "react";
import "./Mentors.css";

// Reusable component for a single mentor card
const MentorCard = ({ mentor, onProfileClick }) => (
  <div className="mentor-card">
    <div className="mentor-header">
      <img src={mentor.profilePic} alt={`${mentor.name}'s profile`} className="profile-pic" />
      <div className="mentor-info">
        <h2 className="mentor-name">{mentor.name}</h2>
        <p className="mentor-title">{mentor.title}</p>
      </div>
    </div>
    <p className="specialization-text">{mentor.specialization}</p>
    <div className="tags-container">
      {mentor.tags.map((tag, tagIndex) => (
        <span key={tagIndex} className="tag">
          {tag}
        </span>
      ))}
    </div>
    <button onClick={onProfileClick} className="view-profile-btn">
      View Profile →
    </button>
  </div>
);

// Reusable component for a single plan card
const PlanCard = ({ plan, isPopular, onChooseClick, isCurrent }) => (
  <div className={`plan-card ${plan.name.toLowerCase()} ${isCurrent ? "current-plan" : ""}`}>
    {isPopular && <div className="most-popular">Most Popular</div>}
    <h2>{plan.name}</h2>
    <div className="price">
      {plan.price}
      <span className="per-month">{plan.period}</span>
    </div>
    <ul>
      {plan.features.map((feature, index) => (
        <li key={index}>✔️ {feature}</li>
      ))}
    </ul>
    {isCurrent ? (
      <button className="current-plan-btn">Current Plan</button>
    ) : (
      <button onClick={onChooseClick} className="choose-btn">
        Choose {plan.name}
      </button>
    )}
  </div>
);

const Mentors = () => {
  const [showPlans, setShowPlans] = useState(false);

  const mentors = [
    {
      name: "Dr. Alisha Vance",
      title: "Educational Psychologist",
      specialization: "Specializes in creating personalized learning strategies for young minds with dyslexia.",
      tags: ["Cognitive Behavioral Therapy", "Learning Strategies", "IEP Navigation"],
      profilePic:
        "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Ben Carter",
      title: "Dyslexia Advocate & Technologist",
      specialization: "Helps adults leverage technology and advocate for themselves in the workplace.",
      tags: ["Assistive Technology", "Workplace Accommodations", "Self-Advocacy"],
      profilePic:
        "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const plans = [
    { name: "Free", price: "$0", period: "/month", features: ["Browse mentor directory", "Read success stories", "Access community resources"] },
    {
      name: "Monthly",
      price: "$25",
      period: "/month",
      features: ["Full access to mentor profiles", "Direct messaging with mentors", "Personalized mentor matching", "Priority support"],
    },
    {
      name: "Yearly",
      price: "$250",
      period: "/year",
      features: ["All features from Monthly plan", "Two months free", "Exclusive access to webinars", "Annual progress review"],
    },
  ];

  if (showPlans) {
    return (
      <div className="app-container plans-page">
        <h1 className="main-title">Choose Your Plan</h1>
        <p className="subtitle">Unlock your potential with full access to our network of experienced mentors.</p>
        <div className="plans-container">
          <PlanCard plan={plans[0]} isCurrent={true} />
          <PlanCard plan={plans[1]} isPopular={true} onChooseClick={() => alert("Monthly plan selected!")} />
          <PlanCard plan={plans[2]} onChooseClick={() => alert("Yearly plan selected!")} />
        </div>
        <button onClick={() => setShowPlans(false)} className="back-btn">
          ← Back to Mentors
        </button>
      </div>
    );
  }

  return (
    <div className="app-container mentor-page">
      <div className="search-section">
        <h1 className="main-title">Find Your Mentor with AI</h1>
        <p className="subtitle">Describe what you're looking for in a mentor, and our AI will find the best matches for you.</p>
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="e.g., 'I am a university student looking for help with study strategies and assistive technology for writing papers.'"
          />
          <div className="search-buttons">
            <button className="clear-btn">Clear</button>
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>
      <div className="mentors-container">
        {mentors.map((mentor, index) => (
          <MentorCard key={index} mentor={mentor} onProfileClick={() => setShowPlans(true)} />
        ))}
      </div>
    </div>
  );
};

export default Mentors;
