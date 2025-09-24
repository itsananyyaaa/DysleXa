import React, { useState } from 'react';

// Custom components from the original code, adapted to be single-file
const Card = ({ children, className, onClick }) => (
  <div onClick={onClick} className={`p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col items-center gap-2 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`mt-4 text-xl font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className }) => (
  <div className={`flex-grow mt-4 ${className}`}>{children}</div>
);

// Lucide icons converted to inline SVG to meet the single-file constraint
const ClipboardPenLine = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-pen-line">
    <path d="M12 11h.01" />
    <path d="M16 11h.01" />
    <path d="M7 11h.01" />
    <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const Lightbulb = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 3c-1 2-2 3-2 5a6 6 0 0 0 6 6" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const LineChart = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart">
    <path d="M3 15v4m5-6v6m5-2v2m5-4v4m-12 3h16" />
  </svg>
);

const BookOpen = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const DyslexiaFriendlyText = ({ children, className }) => (
  <p className={`font-sans tracking-wide leading-relaxed ${className}`}>
    {children}
  </p>
);

// Main App Component
const QuizApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);

  // Updated questions for Phonics and English
  const questions = [
    {
      questionText: 'What sound does the letter "A" make?',
      answerOptions: [
        { answerText: 'The /ă/ sound as in "apple"', isCorrect: true },
        { answerText: 'The /k/ sound as in "kite"', isCorrect: false },
        { answerText: 'The /z/ sound as in "zebra"', isCorrect: false },
        { answerText: 'The /m/ sound as in "moon"', isCorrect: false },
      ],
    },
    {
      questionText: 'Which word rhymes with "cat"?',
      answerOptions: [
        { answerText: 'dog', isCorrect: false },
        { answerText: 'hat', isCorrect: true },
        { answerText: 'sun', isCorrect: false },
        { answerText: 'cup', isCorrect: false },
      ],
    },
    {
      questionText: 'How many letters are in the word "dog"?',
      answerOptions: [
        { answerText: 'Two', isCorrect: false },
        { answerText: 'Four', isCorrect: false },
        { answerText: 'Three', isCorrect: true },
        { answerText: 'Five', isCorrect: false },
      ],
    },
    {
      questionText: 'What is the plural of the word "car"?',
      answerOptions: [
        { answerText: 'cars', isCorrect: true },
        { answerText: 'carz', isCorrect: false },
        { answerText: 'care', isCorrect: false },
        { answerText: 'carses', isCorrect: false },
      ],
    },
    {
      questionText: 'Which of these is a common sight word?',
      answerOptions: [
        { answerText: 'banana', isCorrect: false },
        { answerText: 'beautiful', isCorrect: false },
        { answerText: 'the', isCorrect: true },
        { answerText: 'fantastic', isCorrect: false },
      ],
    },
  ];

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setQuizHistory([...quizHistory, { score: score + (isCorrect ? 1 : 0), date: new Date().toLocaleDateString() }]);
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setCurrentView('quiz');
  };

  const LandingPage = () => {
    const features = [
      {
        icon: <ClipboardPenLine className="h-8 w-8 text-[#B87C4C]" />,
        title: "Phonics & English Quiz",
        description: "A friendly quiz to test your knowledge on phonics and basic english.",
        view: 'quiz',
      },
      {
        icon: <Lightbulb className="h-8 w-8 text-[#B87C4C]" />,
        title: "Check Your Score",
        description: "Check your quiz score after completion.",
        view: 'score_history',
      },
      {
        icon: <LineChart className="h-8 w-8 text-[#B87C4C]" />,
        title: "Progress Tracking",
        description: "Visualize your journey and see your progress over time with easy-to-read charts.",
        view: 'progress',
      },
      {
        icon: <BookOpen className="h-8 w-8 text-[#B87C4C]" />,
        title: "Resource Library",
        description: "Access a curated collection of articles, tools, and support for dyslexia.",
        view: 'resources',
      },
    ];

    return (
      <div className="flex flex-col gap-16 py-12 px-4">
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide">
              QUIZZZZ 🚀
            </h2>
            <DyslexiaFriendlyText className="mt-2 sm:mt-4 text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
              Dyslexia is a different way of thinking, not a different way of learning.
            </DyslexiaFriendlyText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center flex flex-col items-center" onClick={() => setCurrentView(feature.view)}>
                <CardHeader>
                  <div className="p-4 bg-[#C6D870] rounded-full inline-flex shadow-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-[#B87C4C] text-2xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <DyslexiaFriendlyText className="text-gray-600 text-base">{feature.description}</DyslexiaFriendlyText>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  };

  // Circular progress bar component
  const CircularProgressBar = ({ progress, size = 80, strokeWidth = 8, color = '#B87C4C' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke="none"
          fill="#333"
          fontSize="24"
          dy=".3em"
          className="transform rotate-90"
        >
          {Math.round(progress)}%
        </text>
      </svg>
    );
  };

  const QuizView = () => {
    const progress = (currentQuestionIndex / questions.length) * 100;
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen relative">
        <div className="absolute top-8 right-8 z-10">
          <CircularProgressBar progress={progress} />
        </div>
        <div className="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-lg text-gray-500 mb-2">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
              <DyslexiaFriendlyText>{questions[currentQuestionIndex].questionText}</DyslexiaFriendlyText>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {questions[currentQuestionIndex].answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option.isCorrect)}
                className="bg-[#FFC7A7] text-[#B87C4C] font-semibold py-4 px-6 rounded-full text-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#C6D870] hover:text-white"
              >
                <DyslexiaFriendlyText>{option.answerText}</DyslexiaFriendlyText>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const QuizResultView = () => (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 sm:p-10 text-center rounded-xl shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#B87C4C] mb-4">Quiz Complete!</h2>
        <p className="text-xl sm:text-2xl font-semibold text-gray-700">
          You scored {score} out of {questions.length}.
        </p>
        <div className="mt-8">
          <button
            onClick={() => { setShowScore(false); setCurrentView('score_history'); }}
            className="bg-[#B87C4C] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Check All Scores
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={() => { restartQuiz(); setCurrentView('landing'); }}
            className="bg-[#C6D870] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const ScoreHistoryView = () => (
    <div className="flex flex-col items-center p-6 sm:p-12 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#B87C4C] mb-8">Previous Quizzes</h2>
        {quizHistory.length === 0 ? (
          <p className="text-lg text-gray-500">You haven't completed any quizzes yet!</p>
        ) : (
          <div className="space-y-4">
            {quizHistory.map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[#FFC7A7] text-gray-800">
                <span className="font-semibold">Quiz {index + 1} ({quiz.date})</span>
                <span className="text-lg font-bold">{quiz.score}/{questions.length}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <button onClick={() => setCurrentView('landing')} className="bg-[#C6D870] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const DayToDayProgressChart = ({ data }) => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const maxScore = Math.max(...data.map(d => d.score));
    const xScale = (index) => (index / (data.length - 1)) * width;
    const yScale = (score) => height - (score / maxScore) * height;

    const points = data.map((d, i) => `${xScale(i)},${yScale(d.score)}`).join(' ');

    return (
      <svg viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`} className="w-full h-full">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* X-axis */}
          <line x1="0" y1={height} x2={width} y2={height} stroke="#e5e7eb" strokeWidth="2" />
          {data.map((d, i) => (
            <text key={i} x={xScale(i)} y={height + 20} textAnchor="middle" fill="#6b7280" fontSize="12">
              {d.date}
            </text>
          ))}
          {/* Y-axis */}
          <line x1="0" y1="0" x2="0" y2={height} stroke="#e5e7eb" strokeWidth="2" />
          {[0, 25, 50, 75, 100].map(score => (
            <g key={score}>
              <line x1="0" y1={yScale(score)} x2={width} y2={yScale(score)} stroke="#e5e7eb" strokeDasharray="4" />
              <text x="-10" y={yScale(score)} textAnchor="end" dominantBaseline="middle" fill="#6b7280" fontSize="12">
                {score}
              </text>
            </g>
          ))}
          {/* The line graph */}
          <polyline
            fill="none"
            stroke="#1E40AF"
            strokeWidth="3"
            points={points}
          />
          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.score)}
              r="6"
              fill="#2563EB"
              stroke="#fff"
              strokeWidth="2"
            />
          ))}
        </g>
      </svg>
    );
  };

  const ProgressView = () => {
    const progressData = [
      { date: 'Jul 21', score: 80 },
      { date: 'Jul 22', score: 85 },
      { date: 'Jul 23', score: 70 },
      { date: 'Jul 24', score: 92 },
      { date: 'Jul 25', score: 95 },
      { date: 'Jul 26', score: 88 },
    ];

    return (
      <div className="flex flex-col items-center p-6 sm:p-12 min-h-screen">
        <div className="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-xl shadow-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#B87C4C] mb-4">Your Day-to-Day Progress</h2>
          <p className="text-gray-600 mb-8">This graph shows your score on the quiz over time.</p>
          <div className="w-full h-96">
            <DayToDayProgressChart data={progressData} />
          </div>
          <div className="mt-8">
            <button onClick={() => setCurrentView('landing')} className="bg-[#C6D870] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ResourceView = () => {
    const resources = [
      { title: "Understanding Dyslexia", description: "Learn about what dyslexia is and how it affects reading and writing.", link: "https://opendyslexic.org/" },
      { title: "Phonics Exercises", description: "Interactive drills to help with sound-letter correspondence.", link: "https://www.starfall.com/h/phonic/" },
      { title: "Support for Parents", description: "Guidance and resources for supporting a child with dyslexia.", link: "https://www.dyslexia.com/for-parents/" },
      { title: "Assistive Technology", description: "Tools and apps that can help make reading and writing easier.", link: "https://www.understood.org/articles/en/assistive-technology-for-kids-with-dyslexia" },
    ];

    return (
      <div className="flex flex-col items-center p-6 sm:p-12 min-h-screen">
        <div className="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-xl shadow-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#B87C4C] mb-8">Resource Library</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="text-left">
                <CardTitle className="text-[#B87C4C] text-2xl font-semibold">{resource.title}</CardTitle>
                <CardContent>
                  <DyslexiaFriendlyText className="text-gray-600 text-base">{resource.description}</DyslexiaFriendlyText>
                  <div className="mt-4">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-[#FFC7A7] text-[#B87C4C] font-bold rounded-full text-sm transition-transform transform hover:scale-105 hover:bg-[#C6D870] hover:text-white">
                      Visit this link box
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <button onClick={() => setCurrentView('landing')} className="bg-[#C6D870] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'quiz':
        return showScore ? <QuizResultView /> : <QuizView />;
      case 'progress':
        return <ProgressView />;
      case 'resources':
        return <ResourceView />;
      case 'score_history':
        return <ScoreHistoryView />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gradient-to-br from-[#FFC7A7] via-[#C6D870] to-[#B87C4C] animate-bg-gradient">
      <style>{`
        @keyframes bg-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bg-gradient {
          background-size: 200% 200%;
          animation: bg-gradient 15s ease infinite;
        }
      `}</style>
      {renderContent()}
    </div>
  );
};

export default QuizApp;
