import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const StudentQuiz = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchData = async () => {
    if (!user) return;
    // Get quizzes for enrolled courses
    const { data: enrollments } = await supabase.from("enrollments").select("course_id").eq("student_id", user.id);
    const courseIds = (enrollments || []).map((e: any) => e.course_id);
    
    if (courseIds.length > 0) {
      const { data: quizData } = await supabase
        .from("quizzes")
        .select("*, courses(title)")
        .in("course_id", courseIds)
        .eq("is_active", true);
      setQuizzes(quizData || []);
    }

    const { data: attemptData } = await supabase
      .from("quiz_attempts")
      .select("*")
      .eq("student_id", user.id)
      .order("started_at", { ascending: false });
    setAttempts(attemptData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  const startQuiz = async (quiz: any) => {
    const { data: qs } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", quiz.id)
      .order("order_index");
    setQuestions(qs || []);
    setActiveQuiz(quiz);
    setCurrentQ(0);
    setAnswers({});
    setSubmitted(false);
  };

  const selectAnswer = (questionId: string, optionIdx: number) => {
    setAnswers({ ...answers, [questionId]: optionIdx });
  };

  const submitQuiz = async () => {
    if (!user || !activeQuiz) return;
    let correct = 0;
    questions.forEach((q: any) => {
      if (answers[q.id] === q.correct_answer) correct++;
    });
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setSubmitted(true);

    await supabase.from("quiz_attempts").insert({
      student_id: user.id,
      quiz_id: activeQuiz.id,
      score: pct,
      total_questions: questions.length,
      answers: answers,
      completed_at: new Date().toISOString(),
    });

    toast({ title: pct >= activeQuiz.passing_score ? "Passed! 🎉" : "Keep trying!", description: `Score: ${pct}%` });
    fetchData();
  };

  const getAttemptForQuiz = (quizId: string) => attempts.find((a: any) => a.quiz_id === quizId);

  if (activeQuiz && !submitted) {
    const q = questions[currentQ];
    if (!q) return null;
    const options = Array.isArray(q.options) ? q.options : [];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">{activeQuiz.title}</h1>
            <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setActiveQuiz(null)}>Exit</Button>
        </div>

        <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2 mb-6" />

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">{q.question_text}</h2>
          <div className="space-y-3">
            {options.map((opt: string, idx: number) => (
              <button
                key={idx}
                onClick={() => selectAnswer(q.id, idx)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  answers[q.id] === idx
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" disabled={currentQ === 0} onClick={() => setCurrentQ(currentQ - 1)}>Previous</Button>
          {currentQ < questions.length - 1 ? (
            <Button onClick={() => setCurrentQ(currentQ + 1)} disabled={answers[q.id] === undefined}>Next</Button>
          ) : (
            <Button onClick={submitQuiz} disabled={Object.keys(answers).length < questions.length}>Submit Quiz</Button>
          )}
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${score >= activeQuiz.passing_score ? "bg-accent/20" : "bg-destructive/20"}`}>
          {score >= activeQuiz.passing_score ? <Award className="w-10 h-10 text-accent" /> : <Target className="w-10 h-10 text-destructive" />}
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          {score >= activeQuiz.passing_score ? "Congratulations!" : "Keep Trying!"}
        </h2>
        <p className="text-3xl font-bold text-foreground mb-2">{score}%</p>
        <p className="text-muted-foreground mb-6">Passing score: {activeQuiz.passing_score}%</p>
        <Button onClick={() => { setActiveQuiz(null); setSubmitted(false); }}>Back to Quizzes</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Quizzes</h1>
        <p className="text-muted-foreground">Attempt quizzes for your enrolled courses</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={Target} label="Available" value={String(quizzes.length)} />
        <StatCard icon={CheckCircle2} label="Attempted" value={String(attempts.length)} />
        <StatCard icon={Award} label="Avg Score" value={attempts.length > 0 ? `${Math.round(attempts.reduce((s: number, a: any) => s + (a.score || 0), 0) / attempts.length)}%` : "—"} />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : quizzes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No quizzes available. Enroll in courses first!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz: any) => {
            const attempt = getAttemptForQuiz(quiz.id);
            return (
              <div key={quiz.id} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-1">{quiz.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{quiz.courses?.title}</p>
                <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                  <span><Clock className="w-3 h-3 inline mr-1" />{quiz.time_limit_minutes} min</span>
                  <span>Pass: {quiz.passing_score}%</span>
                </div>
                {attempt ? (
                  <div className="flex items-center justify-between">
                    <Badge variant={attempt.score >= quiz.passing_score ? "default" : "destructive"}>
                      Score: {attempt.score}%
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => startQuiz(quiz)}>Retry</Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full" onClick={() => startQuiz(quiz)}>Start Quiz</Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentQuiz;
