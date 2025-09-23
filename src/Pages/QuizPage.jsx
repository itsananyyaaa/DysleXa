// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardPenLine, Lightbulb, LineChart, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/quizcomponents/Card";
import { DyslexiaFriendlyText } from "../components/quizcomponents/DyslexiaFriendlyText";

const features = [
  {
    icon: <ClipboardPenLine className="h-8 w-8 text-accent" />,
    title: "Phonics & English Quiz",
    description: "A friendly quiz to test your knowledge on phonics and basic english.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-accent" />,
    title: "Check Your Score",
    description: "Check your quiz score after completion.",
  },
  {
    icon: <LineChart className="h-8 w-8 text-accent" />,
    title: "Progress Tracking",
    description: "Visualize your journey and see your progress over time with easy-to-read charts.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-accent" />,
    title: "Resource Library",
    description: "Access a curated collection of articles, tools, and support for dyslexia.",
  },
];

export default function QuizPage() {
  return (
    <div className="space-y-16">
      <section>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold">How We Can Help</h2>
          <DyslexiaFriendlyText className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Our app is built on a foundation of understanding and support. Here's what you can expect.
          </DyslexiaFriendlyText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center flex flex-col">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary rounded-full">{feature.icon}</div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <DyslexiaFriendlyText className="text-muted-foreground">{feature.description}</DyslexiaFriendlyText>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
