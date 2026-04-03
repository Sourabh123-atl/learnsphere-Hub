import { useState, useEffect } from "react";
import { Brain, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Course { id: string; title: string; }
interface Question { question_text: string; options: string[]; correct_answer: number; }

const TeacherQuizCreator = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("30");
  const [passingScore, setPassingScore] = useState("60");
  const [questions, setQuestions] = useState<Question[]>([{ question_text: "", options: ["", "", "", ""], correct_answer: 0 }]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    supabase.from("courses").select("id, title").eq("teacher_id", user.id).then(({ data }) => setCourses((data as Course[]) || []));
    fetchQuizzes();
  }, [user]);

  const fetchQuizzes = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("quizzes")
      .select("*, courses!inner(title, teacher_id)")
      .eq("courses.teacher_id", user.id)
      .order("created_at", { ascending: false });
    setQuizzes(data || []);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question_text: "", options: ["", "", "", ""], correct_answer: 0 }]);
  };

  const removeQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const updateQuestion = (idx: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === "question_text") updated[idx].question_text = value;
    else if (field === "correct_answer") updated[idx].correct_answer = value;
    setQuestions(updated);
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const handleSave = async () => {
    if (!selectedCourse || !quizTitle.trim() || questions.length === 0) {
      toast({ title: "Error", description: "Fill all required fields", variant: "destructive" });
      return;
    }
    for (const q of questions) {
      if (!q.question_text.trim() || q.options.some((o) => !o.trim())) {
        toast({ title: "Error", description: "All questions and options must be filled", variant: "destructive" });
        return;
      }
    }

    const { data: quiz, error } = await supabase
      .from("quizzes")
      .insert({ course_id: selectedCourse, title: quizTitle, time_limit_minutes: parseInt(timeLimit), passing_score: parseInt(passingScore) })
      .select()
      .single();

    if (error || !quiz) {
      toast({ title: "Error", description: error?.message || "Failed to create quiz", variant: "destructive" });
      return;
    }

    const questionsToInsert = questions.map((q, i) => ({
      quiz_id: (quiz as any).id,
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      order_index: i,
    }));

    await supabase.from("questions").insert(questionsToInsert);
    toast({ title: "Quiz Created!" });
    setDialogOpen(false);
    setQuizTitle("");
    setQuestions([{ question_text: "", options: ["", "", "", ""], correct_answer: 0 }]);
    fetchQuizzes();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Quiz Creator</h1>
          <p className="text-muted-foreground">Create MCQ quizzes for your courses</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Create Quiz</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader><DialogTitle>New Quiz</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quiz Title</Label>
                  <Input value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder="e.g. Midterm Quiz" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time Limit (minutes)</Label>
                  <Input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input type="number" value={passingScore} onChange={(e) => setPassingScore(e.target.value)} />
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold text-foreground mb-3">Questions</h3>
                {questions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-muted rounded-lg p-4 mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Label>Question {qIdx + 1}</Label>
                      {questions.length > 1 && (
                        <Button size="sm" variant="ghost" className="text-destructive h-7" onClick={() => removeQuestion(qIdx)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Input value={q.question_text} onChange={(e) => updateQuestion(qIdx, "question_text", e.target.value)} placeholder="Enter question" className="mb-3" />
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${qIdx}`}
                            checked={q.correct_answer === oIdx}
                            onChange={() => updateQuestion(qIdx, "correct_answer", oIdx)}
                            className="accent-primary"
                          />
                          <Input value={opt} onChange={(e) => updateOption(qIdx, oIdx, e.target.value)} placeholder={`Option ${oIdx + 1}`} className="flex-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addQuestion} className="gap-1">
                  <Plus className="w-3 h-3" /> Add Question
                </Button>
              </div>

              <Button onClick={handleSave} className="w-full gap-2"><Save className="w-4 h-4" /> Save Quiz</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No quizzes created yet. Create your first quiz!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz: any) => (
            <div key={quiz.id} className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-1">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{(quiz as any).courses?.title}</p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>{quiz.time_limit_minutes} min</span>
                <span>Pass: {quiz.passing_score}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherQuizCreator;
