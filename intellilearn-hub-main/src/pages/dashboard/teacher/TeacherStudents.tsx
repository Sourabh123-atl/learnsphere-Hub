import { Users, Search, Mail, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const students = [
  { id: 1, name: "Sourabh Patel", email: "sourabh@edu.com", semester: 5, attendance: 87, quizAvg: 88, courses: ["Cloud Computing", "Machine Learning"], status: "active" },
  { id: 2, name: "Priya Sharma", email: "priya@edu.com", semester: 5, attendance: 92, quizAvg: 94, courses: ["Cloud Computing", "Data Science"], status: "active" },
  { id: 3, name: "Rahul Kumar", email: "rahul@edu.com", semester: 5, attendance: 68, quizAvg: 72, courses: ["Machine Learning"], status: "at-risk" },
  { id: 4, name: "Anita Desai", email: "anita@edu.com", semester: 5, attendance: 95, quizAvg: 91, courses: ["Cloud Computing", "Machine Learning", "Data Science"], status: "active" },
  { id: 5, name: "Vikram Singh", email: "vikram@edu.com", semester: 5, attendance: 55, quizAvg: 60, courses: ["Cloud Computing"], status: "at-risk" },
  { id: 6, name: "Meera Joshi", email: "meera@edu.com", semester: 5, attendance: 78, quizAvg: 82, courses: ["Machine Learning", "Data Science"], status: "active" },
];

const TeacherStudents = () => {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground">Monitor student performance and engagement</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Student Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-card rounded-xl border border-border p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.email}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === "active" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>
                {s.status === "active" ? "Active" : "At Risk"}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="flex items-center gap-1 text-foreground">
                    {s.attendance >= 75 ? <TrendingUp className="w-3 h-3 text-accent" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                    {s.attendance}%
                  </span>
                </div>
                <Progress value={s.attendance} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Quiz Average</span>
                  <span className="text-foreground">{s.quizAvg}%</span>
                </div>
                <Progress value={s.quizAvg} className="h-1.5" />
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {s.courses.map((c) => (
                <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{c}</span>
              ))}
            </div>

            <Button size="sm" variant="outline" className="w-full gap-2"><Mail className="w-3 h-3" /> Send Notification</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherStudents;
