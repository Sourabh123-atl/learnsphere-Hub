import { useState, useEffect } from "react";
import { BookOpen, Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";
import { supabase } from "@/integrations/supabase/client";

const AdminCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase
        .from("courses")
        .select("*, profiles!courses_teacher_id_profiles_fkey(full_name)")
        .order("created_at", { ascending: false });
      setCourses(data || []);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter((c: any) => c.title.toLowerCase().includes(search.toLowerCase()));
  const activeCourses = courses.filter((c: any) => c.is_active);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">All Courses</h1>
        <p className="text-muted-foreground">Monitor all courses across the platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={BookOpen} label="Total Courses" value={String(courses.length)} />
        <StatCard icon={BookOpen} label="Active" value={String(activeCourses.length)} />
        <StatCard icon={Users} label="Teachers" value={String(new Set(courses.map((c: any) => c.teacher_id)).size)} />
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course: any) => (
            <div key={course.id} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">{course.title}</h3>
                <Badge variant={course.is_active ? "default" : "secondary"}>
                  {course.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{course.description || "No description"}</p>
              <p className="text-xs text-muted-foreground">By: {course.profiles?.full_name || "Unknown"}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">No courses found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
