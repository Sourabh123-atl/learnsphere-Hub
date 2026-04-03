import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import AIChatbot from "@/components/AIChatbot";
import { BookOpen, Video, ClipboardCheck, Award, BarChart3, Bot, Calendar, FileText, Brain, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import StudentCourses from "./student/StudentCourses";
import StudentLectures from "./student/StudentLectures";
import StudentAttendance from "./student/StudentAttendance";
import StudentAssignments from "./student/StudentAssignments";
import StudentAI from "./student/StudentAI";
import StudentCertificates from "./student/StudentCertificates";
import StudentQuiz from "./student/StudentQuiz";
import StudentLiveMeeting from "./student/StudentLiveMeeting";

const navItems = [
  { icon: BarChart3, label: "Dashboard", path: "/dashboard/student" },
  { icon: BookOpen, label: "My Courses", path: "/dashboard/student/courses" },
  { icon: Video, label: "Live Lectures", path: "/dashboard/student/lectures" },
  { icon: Brain, label: "Live Meeting", path: "/dashboard/student/meeting" },
  { icon: ClipboardCheck, label: "Attendance", path: "/dashboard/student/attendance" },
  { icon: FileText, label: "Assignments", path: "/dashboard/student/assignments" },
  { icon: Target, label: "Quizzes", path: "/dashboard/student/quiz" },
  { icon: Bot, label: "AI Assistant", path: "/dashboard/student/ai" },
  { icon: Award, label: "Certificates", path: "/dashboard/student/certificates" },
];

const DashboardHome = () => {
  const { user, profile } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [enrollRes, attemptRes] = await Promise.all([
        supabase.from("enrollments").select("*, courses(title, profiles!courses_teacher_id_profiles_fkey(full_name))").eq("student_id", user.id),
        supabase.from("quiz_attempts").select("*").eq("student_id", user.id),
      ]);
      setEnrollments(enrollRes.data || []);
      setAttempts(attemptRes.data || []);
    };
    fetchData();
  }, [user]);

  const avgScore = attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + (a.score || 0), 0) / attempts.length) : 0;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Welcome back, {profile?.full_name || "Student"}! 👋</h1>
        <p className="text-muted-foreground">Here's your learning overview</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={BookOpen} label="Enrolled Courses" value={String(enrollments.length)} />
        <StatCard icon={Target} label="Quizzes Attempted" value={String(attempts.length)} />
        <StatCard icon={Award} label="Avg Quiz Score" value={avgScore > 0 ? `${avgScore}%` : "—"} />
        <StatCard icon={ClipboardCheck} label="Department" value={profile?.department || "—"} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Enrolled Courses</h2>
          {enrollments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses enrolled yet. Browse courses to get started!</p>
          ) : (
            <div className="space-y-4">
              {enrollments.map((e: any) => (
                <div key={e.id} className="flex items-center gap-4">
                  <div className="w-2 h-10 rounded-full bg-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-foreground">{e.courses?.title}</p>
                      <span className="text-xs text-muted-foreground">{e.progress}%</span>
                    </div>
                    <Progress value={e.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{e.courses?.profiles?.full_name || "Unknown"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Recent Quiz Results</h2>
          {attempts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No quizzes attempted yet.</p>
          ) : (
            <div className="space-y-3">
              {attempts.slice(0, 5).map((a: any) => (
                <div key={a.id} className="p-3 rounded-lg bg-muted flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Score: {a.score}%</p>
                    <p className="text-xs text-muted-foreground">{new Date(a.completed_at || a.started_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold ${a.score >= 60 ? "text-accent" : "text-destructive"}`}>
                    {a.score >= 60 ? "PASSED" : "FAILED"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const StudentDashboard = () => (
  <DashboardLayout navItems={navItems} role="student">
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="courses" element={<StudentCourses />} />
      <Route path="lectures" element={<StudentLectures />} />
      <Route path="meeting" element={<StudentLiveMeeting />} />
      <Route path="attendance" element={<StudentAttendance />} />
      <Route path="assignments" element={<StudentAssignments />} />
      <Route path="quiz" element={<StudentQuiz />} />
      <Route path="ai" element={<StudentAI />} />
      <Route path="certificates" element={<StudentCertificates />} />
    </Routes>
    <AIChatbot />
  </DashboardLayout>
);

export default StudentDashboard;
