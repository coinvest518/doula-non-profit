"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Clock, AlertTriangle, Trophy, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  points: number;
  order_index: number;
  explanation?: string;
  options?: Array<{
    id: string;
    option_text: string;
    is_correct: boolean;
    order_index: number;
  }>;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  instructions: string;
  time_limit_minutes?: number;
  passing_score: number;
  max_attempts?: number;
  questions: QuizQuestion[];
}

interface QuizTakeProps {
  moduleId: string;
  courseId: string;
  onComplete: (score: number, passed: boolean) => void;
  attemptNumber?: number;
}

export function QuizTake({ moduleId, courseId, onComplete, attemptNumber = 1 }: QuizTakeProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [quizStarted, setQuizStarted] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    passed: boolean;
    correctAnswers: Record<string, boolean>;
    totalPoints: number;
    earnedPoints: number;
  } | null>(null);

  // Load quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        
        // Fetch quiz for this module
        const { data: quizData, error: quizError } = await (supabase as any)
          .from('course_quizzes')
          .select(`
            id,
            title,
            description,
            instructions,
            time_limit_minutes,
            passing_score,
            max_attempts
          `)
          .eq('module_id', moduleId)
          .eq('course_id', courseId)
          .single();

        if (quizError) throw quizError;
        if (!quizData) throw new Error('No quiz found for this module');

        // Fetch questions with options
        const { data: questionsData, error: questionsError } = await (supabase as any)
          .from('quiz_questions')
          .select(`
            id,
            question_text,
            question_type,
            points,
            order_index,
            explanation,
            quiz_question_options (
              id,
              option_text,
              is_correct,
              order_index
            )
          `)
          .eq('quiz_id', quizData.id)
          .order('order_index');

        if (questionsError) throw questionsError;

        // Format the data
        const formattedQuestions: QuizQuestion[] = questionsData.map((q: any) => ({
          id: q.id,
          question_text: q.question_text,
          question_type: q.question_type as QuizQuestion['question_type'],
          points: q.points,
          order_index: q.order_index,
          explanation: q.explanation,
          options: q.quiz_question_options?.sort((a: any, b: any) => a.order_index - b.order_index)
        }));

        const formattedQuiz: Quiz = {
          ...quizData,
          questions: formattedQuestions
        };

        setQuiz(formattedQuiz);
        setTimeRemaining(quizData.time_limit_minutes ? quizData.time_limit_minutes * 60 : null);
      } catch (err) {
        console.error('Error loading quiz:', err);
        setError(err instanceof Error ? err.message : 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [moduleId, courseId, supabase]);

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const totalQuestions = quiz?.questions?.length || 0;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  // Timer effect
  useEffect(() => {
    if (!quizStarted || !timeRemaining || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev && prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeRemaining, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    
    // Calculate results
    let earnedPoints = 0;
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const correctAnswers: Record<string, boolean> = {};

    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      let isCorrect = false;

      if (question.question_type === 'multiple_choice' || question.question_type === 'true_false') {
        const correctOption = question.options?.find(opt => opt.is_correct);
        isCorrect = userAnswer === correctOption?.id;
      }
      // Note: Short answer and essay questions would need manual grading
      
      correctAnswers[question.id] = isCorrect;
      if (isCorrect) {
        earnedPoints += question.points;
      }
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    const passed = score >= (quiz?.passing_score || 70);

    const quizResults = {
      score,
      passed,
      correctAnswers,
      totalPoints,
      earnedPoints
    };

    setResults(quizResults);
    setShowResults(true);
    onComplete(score, passed);
  };

  const isQuizComplete = quiz ? quiz.questions.every(q => answers[q.id]) : false;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading quiz...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!quiz) {
    return (
      <Alert className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>No quiz available for this module.</AlertDescription>
      </Alert>
    );
  }

  if (!quizStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">{quiz.title}</CardTitle>
          <p className="text-muted-foreground">{quiz.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {quiz.instructions}
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="font-medium">Quiz Details:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {totalQuestions} questions</li>
                <li>• {quiz.passing_score}% required to pass</li>
                {quiz.time_limit_minutes && (
                  <li>• {quiz.time_limit_minutes} minutes time limit</li>
                )}
                <li>• Attempt {attemptNumber} of {quiz.max_attempts || 'unlimited'}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Instructions:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Read each question carefully</li>
                <li>• You can navigate between questions</li>
                <li>• Submit when all questions are answered</li>
                <li>• Results will be shown immediately</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => setQuizStarted(true)}
              className="w-full md:w-auto"
            >
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults && results) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl flex items-center justify-center gap-2">
            {results.passed ? (
              <>
                <Trophy className="h-6 w-6 text-yellow-500" />
                Quiz Passed!
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-500" />
                Quiz Not Passed
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {results.score}%
            </div>
            <p className="text-muted-foreground">
              {results.earnedPoints} of {results.totalPoints} points earned
            </p>
          </div>

          <Progress value={results.score} className="h-3" />

          <Alert className={results.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <AlertDescription className={results.passed ? "text-green-800" : "text-red-800"}>
              {results.passed 
                ? `Congratulations! You scored ${results.score}% and passed the quiz.`
                : `You scored ${results.score}%. You need ${quiz.passing_score}% to pass. ${quiz.max_attempts && attemptNumber < quiz.max_attempts ? `You have ${quiz.max_attempts - attemptNumber} attempts remaining.` : ''}`
              }
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold">Question Review:</h3>
            {quiz.questions.map((question, index) => (
              <Card key={question.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full text-sm">
                    {results.correctAnswers[question.id] ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Question {index + 1}</p>
                    <p className="text-sm text-muted-foreground mb-2">{question.question_text}</p>
                    {question.explanation && (
                      <div className="text-sm bg-muted/50 p-2 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                  <Badge variant={results.correctAnswers[question.id] ? "default" : "secondary"}>
                    {results.correctAnswers[question.id] ? question.points : 0}/{question.points}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Course
            </Button>
            {!results.passed && quiz.max_attempts && attemptNumber < quiz.max_attempts && (
              <Button onClick={() => window.location.reload()}>
                Retake Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold">{quiz.title}</h2>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            <div className="text-right">
              {timeRemaining && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className={timeRemaining < 300 ? "text-red-500 font-semibold" : ""}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Progress value={progress} className="mt-3" />
        </CardContent>
      </Card>

      {/* Current Question */}
      {currentQuestion && (
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestionIndex + 1}
              <Badge variant="secondary" className="ml-2">
                {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">{currentQuestion.question_text}</p>

          {/* Multiple Choice / True False */}
          {(currentQuestion.question_type === 'multiple_choice' || currentQuestion.question_type === 'true_false') && (
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.option_text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Short Answer / Essay */}
          {(currentQuestion.question_type === 'short_answer' || currentQuestion.question_type === 'essay') && (
            <Textarea
              placeholder="Enter your answer here..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              rows={currentQuestion.question_type === 'essay' ? 6 : 3}
            />
          )}
        </CardContent>
      </Card>
      )}

      {/* Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {Object.keys(answers).length} of {totalQuestions} answered
              </p>
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button onClick={handleNextQuestion}>
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitQuiz}
                disabled={!isQuizComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}