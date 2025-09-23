import { ClipboardPenLine, Lightbulb, LineChart, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/quizcomponents/Card";
import { DyslexiaFriendlyText } from "../components/quizcomponents/DyslexiaFriendlyText";

const features = [
  {
    icon: <ClipboardPenLine style={{ height: 32, width: 32, color: "#4F46E5" }} />,
    title: "Phonics & English Quiz",
    description: "A friendly quiz to test your knowledge on phonics and basic english.",
  },
  {
    icon: <Lightbulb style={{ height: 32, width: 32, color: "#4F46E5" }} />,
    title: "Check Your Score",
    description: "Check your quiz score after completion.",
  },
  {
    icon: <LineChart style={{ height: 32, width: 32, color: "#4F46E5" }} />,
    title: "Progress Tracking",
    description: "Visualize your journey and see your progress over time with easy-to-read charts.",
  },
  {
    icon: <BookOpen style={{ height: 32, width: 32, color: "#4F46E5" }} />,
    title: "Resource Library",
    description: "Access a curated collection of articles, tools, and support for dyslexia.",
  },
];

export default function QuizPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
      <section>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "sans-serif", fontSize: 24, fontWeight: "bold" }}>How We Can Help</h2>
          <DyslexiaFriendlyText
            style={{
              marginTop: 8,
              color: "#6B7280",
              maxWidth: 512,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Our app is built on a foundation of understanding and support. Here's what you can expect.
          </DyslexiaFriendlyText>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <CardHeader style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 24, gap: 8 }}>
                <div
                  style={{
                    padding: 16,
                    backgroundColor: "#6366F1",
                    borderRadius: "50%",
                    display: "inline-flex",
                  }}
                >
                  {feature.icon}
                </div>
                <CardTitle style={{ marginTop: 16, fontSize: 20, fontWeight: "600" }}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent style={{ flexGrow: 1, padding: 24, paddingTop: 0 }}>
                <DyslexiaFriendlyText style={{ color: "#6B7280" }}>{feature.description}</DyslexiaFriendlyText>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
