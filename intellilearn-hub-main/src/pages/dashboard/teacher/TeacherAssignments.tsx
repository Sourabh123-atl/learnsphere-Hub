import { FileText, PlusCircle, Upload, CheckCircle, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

const assignments = [
  { id: 1, title: "Cloud Architecture Design", course: "Cloud Computing", dueDate: "Mar 25, 2026", submitted: 38, total: 52, graded: 0, status: "open" },
  { id: 2, title: "ML Model Comparison Report", course: "Machine Learning", dueDate: "Mar 28, 2026", submitted: 12, total: 48, graded: 0, status: "open" },
  { id: 3, title: "AWS EC2 Lab Report", course: "Cloud Computing", dueDate: "Mar 18, 2026", submitted: 50, total: 52, graded: 50, status: "graded" },
  { id: 4, title: "Linear Regression Implementation", course: "Machine Learning", dueDate: "Mar 15, 2026", submitted: 46, total: 48, graded: 46, status: "graded" },
];

const TeacherAssignments = () => (
  <div>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground">Create and grade assignments</p>
      </div>
      <Button className="gap-2"><PlusCircle className="w-4 h-4" /> Create Assignment</Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={FileText} label="Total Assignments" value="4" />
      <StatCard icon={Clock} label="Open" value="2" />
      <StatCard icon={CheckCircle} label="Graded" value="2" />
      <StatCard icon={Upload} label="Submissions Today" value="15" trend="+8 since morning" trendUp />
    </div>

    <div className="space-y-4">
      {assignments.map((a) => (
        <div key={a.id} className="bg-card rounded-xl border border-border p-5 card-hover">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-semibold text-foreground">{a.title}</h3>
                <Badge variant={a.status === "open" ? "default" : "secondary"}>{a.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{a.course} • Due: {a.dueDate}</p>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Upload className="w-3 h-3" /> {a.submitted}/{a.total} submitted
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <CheckCircle className="w-3 h-3" /> {a.graded} graded
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">View Submissions</Button>
              {a.status === "open" && <Button size="sm">Grade</Button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TeacherAssignments;
