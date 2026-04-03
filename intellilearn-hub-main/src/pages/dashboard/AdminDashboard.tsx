import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, BookOpen, Video, ShieldCheck, BarChart3, Settings, UserCheck, FileBarChart, ClipboardCheck, Target, Brain, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import AdminStudents from "./admin/AdminStudents";
import AdminTeachers from "./admin/AdminTeachers";
import AdminCourses from "./admin/AdminCourses";
import AdminLectures from "./admin/AdminLectures";
import AdminReports from "./admin/AdminReports";
import AdminSettings from "./admin/AdminSettings";
import AdminAttendance from "./admin/AdminAttendance";
import AdminQuizzes from "./admin/AdminQuizzes";
import AdminMeetings from "./admin/AdminMeetings";

const navItems = [
  { icon: BarChart3, label: "Dashboard", path: "/dashboard/admin" },
  { icon: Users, label: "Users", path: "/dashboard/admin/students" },
  { icon: BookOpen, label: "Courses", path: "/dashboard/admin/courses" },
  { icon: Target, label: "Quizzes", path: "/dashboard/admin/quizzes" },
  { icon: Video, label: "Lectures", path: "/dashboard/admin/lectures" },
  { icon: Brain, label: "Live Meetings", path: "/dashboard/admin/meetings" },
  { icon: ClipboardCheck, label: "Attendance", path: "/dashboard/admin/attendance" },
  { icon: FileBarChart, label: "Reports", path: "/dashboard/admin/reports" },
  { icon: Settings, label: "Settings", path: "/dashboard/admin/settings" },
];

const DashboardHome = () => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0, quizzes: 0, pending: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [profilesRes, coursesRes, quizzesRes] = await Promise.all([
        supabase.from("profiles").select("role, approved"),
        supabase.from("courses").select("id"),
        supabase.from("quizzes").select("id"),
      ]);
      const profiles = profilesRes.data || [];
      setStats({
        students: profiles.filter((p: any) => p.role === "student").length,
        teachers: profiles.filter((p: any) => p.role === "teacher").length,
        courses: coursesRes.data?.length || 0,
        quizzes: quizzesRes.data?.length || 0,
        pending: profiles.filter((p: any) => p.role === "teacher" && !p.approved).length,
      });
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Users} label="Students" value={String(stats.students)} />
        <StatCard icon={UserCheck} label="Teachers" value={String(stats.teachers)} />
        <StatCard icon={BookOpen} label="Courses" value={String(stats.courses)} />
        <StatCard icon={Target} label="Quizzes" value={String(stats.quizzes)} />
        <StatCard icon={ShieldCheck} label="Pending" value={String(stats.pending)} trend={stats.pending > 0 ? "needs attention" : ""} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Platform Health</h2>
          <div className="space-y-4">
            {[
              { label: "Students", pct: Math.min(stats.students * 10, 100), value: String(stats.students) },
              { label: "Active Courses", pct: Math.min(stats.courses * 20, 100), value: String(stats.courses) },
              { label: "Quizzes", pct: Math.min(stats.quizzes * 15, 100), value: String(stats.quizzes) },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-foreground">{s.value}</span>
                </div>
                <Progress value={s.pct} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <a href="/dashboard/admin/students" className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">Manage Users</p>
            </a>
            <a href="/dashboard/admin/courses" className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">View Courses</p>
            </a>
            <a href="/dashboard/admin/quizzes" className="p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-foreground">View Quizzes</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminDashboard = () => (
  <DashboardLayout navItems={navItems} role="admin">
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="students" element={<AdminStudents />} />
      <Route path="teachers" element={<AdminTeachers />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route path="lectures" element={<AdminLectures />} />
      <Route path="meetings" element={<AdminMeetings />} />
      <Route path="attendance" element={<AdminAttendance />} />
      <Route path="quizzes" element={<AdminQuizzes />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="settings" element={<AdminSettings />} />
    </Routes>
  </DashboardLayout>
);

export default AdminDashboard;
