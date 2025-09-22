"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Users, Award, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
};

const MotionCard = motion(Card);

export default function LandingPage() {
  const sections = [
    {
      icon: BookOpen,
      title: "Let's Start Learning",
      description: 'Jump into our reading-assistance app and enhance your skills.',
      buttonText: 'Start Learning',
      href: '/exercise',
      gradient: 'from-primary/10 to-accent/10',
    },
    {
      icon: Award,
      title: 'Quiz Section',
      description: 'Test your knowledge and track your progress with fun quizzes.',
      buttonText: 'Take a Quiz',
      href: '#',
      gradient: 'from-accent/10 to-secondary/10',
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Share your achievements and connect with fellow learners.',
      buttonText: 'Join Community',
      href: '#',
      gradient: 'from-secondary/10 to-destructive/10',
    },
    {
      icon: UserCheck,
      title: 'Expert Mentors',
      description: 'Get personalized guidance from our expert mentors for $100/month.',
      buttonText: 'Find a Mentor',
      href: '#',
      gradient: 'from-destructive/10 to-primary/10',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-background via-secondary/5 to-background">
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <h1 
            className="text-7xl font-extrabold tracking-tighter text-primary sm:text-8xl md:text-9xl relative animate-shine bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-[200%_auto]"
            style={{
              WebkitMaskImage: 'linear-gradient(-75deg, rgba(0,0,0,.6) 30%, #000 50%, rgba(0,0,0,.6) 70%)',
              WebkitMaskSize: '200%',
              animationName: 'shine',
              animationDuration: '3s',
              animationIterationCount: 'infinite',
            }}
          >
            DysleXa
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Your AI-powered companion for joyful and confident reading.
          </p>
        </motion.div>

        <motion.div 
          className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section) => (
            <MotionCard
              key={section.title}
              className={`flex flex-col overflow-hidden border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br ${section.gradient}`}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <CardHeader className="items-center text-center">
                <motion.div 
                  className="mb-4 rounded-full bg-primary/10 p-4 text-primary"
                  whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                >
                  <section.icon className="h-10 w-10" />
                </motion.div>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full group bg-primary/90 hover:bg-primary text-primary-foreground">
                  <Link href={section.href}>
                    {section.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </MotionCard>
          ))}
        </motion.div>
      </main>
      <footer className="w-full py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DysleXa. All rights reserved.</p>
      </footer>
    </div>
  );
}

