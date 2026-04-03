import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { BookOpen, Users, Video, ClipboardCheck, BarChart3, FileText, PlusCircle, Calendar, Brain, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import TeacherCourses from "./teacher/TeacherCourses";
import TeacherLectures from "./teacher/TeacherLectures";
import TeacherStudents from "./teacher/TeacherStudents";
import TeacherAttendance from "./teacher/TeacherAttendance";
import TeacherAssignments from "./teacher/TeacherAssignments";
import TeacherQuizCreator from "./teacher/TeacherQuizCreator";
import TeacherMeetings from "./teacher/TeacherMeetings";
import TeacherAttendanceReport from "./teacher/TeacherAttendanceReport";

const navItems = [
  { icon: BarChart3, label: "Dashboard", path: "/dashboard/teacher" },
  { icon: BookOpen, label: "My Courses", path: "/dashboard/teacher/courses" },
  { icon: Video, label: "Lectures", path: "/dashboard/teacher/lectures" },
  { icon: Users, label: "Students", path: "/dashboard/teacher/students" },
  { icon: ClipboardCheck, label: "Attendance", path: "/dashboard/teacher/attendance" },
  { icon: FileText, label: "Assignments", path: "/dashboard/teacher/assignments" },
  { icon: Brain, label: "Quiz Creator", path: "/dashboard/teacher/quizzes" },
  { icon: Wifi, label: "Live Meetings", path: "/dashboard/teacher/meetings" },
  { icon: ClipboardCheck, label: "AI Attendance Report", path: "/dashboard/teacher/attendance-report" },
];

const DashboardHome = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ courses: 0, enrollments: 0, quizzes: 0 });

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const [coursesRes, quizzesRes] = await Promise.all([
        supabase.from("courses").select("id").eq("teacher_id", user.id),
        supabase.from("quizzes").select("id, courses!inner(teacher_id)").eq("courses.teacher_id", user.id),
      ]);
      const courseIds = (coursesRes.data || []).map((c: any) => c.id);
      let enrollCount = 0;
      if (courseIds.length > 0) {
        const { count } = await supabase.from("enrollments").select("id", { count: "exact", head: true }).in("course_id", courseIds);
        enrollCount = count || 0;
      }
      setStats({ courses: coursesRes.data?.length || 0, enrollments: enrollCount, quizzes: quizzesRes.data?.length || 0 });
    };
    fetchStats();
  }, [user]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Welcome, {profile?.full_name || "Teacher"}</h1>
          <p className="text-muted-foreground">Manage your courses and students</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={BookOpen} label="My Courses" value={String(stats.courses)} />
        <StatCard icon={Users} label="Total Enrollments" value={String(stats.enrollments)} />
        <StatCard icon={Brain} label="Quizzes Created" value={String(stats.quizzes)} />
      </div>
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <a href="/dashboard/teacher/courses"><BookOpen className="w-5 h-5" /><span className="text-sm">Manage Courses</span></a>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <a href="/dashboard/teacher/quizzes"><Brain className="w-5 h-5" /><span className="text-sm">Create Quiz</span></a>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <a href="/dashboard/teacher/students"><Users className="w-5 h-5" /><span className="text-sm">View Students</span></a>
          </Button>
        </div>
      </div>
    </>
  );
};

const TeacherDashboard = () => (
  <DashboardLayout navItems={navItems} role="teacher">
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="courses" element={<TeacherCourses />} />
      <Route path="lectures" element={<TeacherLectures />} />
      <Route path="students" element={<TeacherStudents />} />
      <Route path="attendance" element={<TeacherAttendance />} />
      <Route path="assignments" element={<TeacherAssignments />} />
      <Route path="quizzes" element={<TeacherQuizCreator />} />
      <Route path="meetings" element={<TeacherMeetings />} />
      <Route path="attendance-report" element={<TeacherAttendanceReport />} />
    </Routes>
  </DashboardLayout>
);

export default TeacherDashboard;
