import { useState, useEffect } from "react";
import { BookOpen, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const StudentCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchData = async () => {
    if (!user) return;
    const [coursesRes, enrollRes] = await Promise.all([
      supabase.from("courses").select("*, profiles!courses_teacher_id_profiles_fkey(full_name)").eq("is_active", true),
      supabase.from("enrollments").select("*").eq("student_id", user.id),
    ]);
    setCourses(coursesRes.data || []);
    setEnrollments(enrollRes.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  const isEnrolled = (courseId: string) => enrollments.some((e: any) => e.course_id === courseId);
  const getProgress = (courseId: string) => enrollments.find((e: any) => e.course_id === courseId)?.progress || 0;

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    const { error } = await supabase.from("enrollments").insert({ student_id: user.id, course_id: courseId });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Enrolled!", description: "You've been enrolled in the course." });
    fetchData();
  };

  const filtered = courses.filter((c: any) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Courses</h1>
        <p className="text-muted-foreground">Browse and enroll in available courses</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading courses...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No courses available yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course: any) => {
            const enrolled = isEnrolled(course.id);
            const progress = getProgress(course.id);
            return (
              <div key={course.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{course.title}</h3>
                  {enrolled && <Badge>Enrolled</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{course.description || "No description"}</p>
                <p className="text-xs text-muted-foreground mb-3">By: {course.profiles?.full_name || "Unknown"}</p>
                {enrolled ? (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ) : (
                  <Button size="sm" onClick={() => handleEnroll(course.id)} className="w-full">Enroll Now</Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
