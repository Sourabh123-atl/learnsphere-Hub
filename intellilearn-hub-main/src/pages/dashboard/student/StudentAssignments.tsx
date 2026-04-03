import { FileText, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

const pendingAssignments = [
  { id: 1, title: "Cloud Architecture Design", course: "Cloud Computing", teacher: "Dr. Sharma", dueDate: "Mar 25, 2026", daysLeft: 4, maxMarks: 50 },
  { id: 2, title: "ML Model Comparison Report", course: "Machine Learning", teacher: "Prof. Verma", dueDate: "Mar 28, 2026", daysLeft: 7, maxMarks: 40 },
  { id: 3, title: "Data Visualization Dashboard", course: "Data Science", teacher: "Dr. Gupta", dueDate: "Mar 30, 2026", daysLeft: 9, maxMarks: 60 },
];

const submittedAssignments = [
  { id: 4, title: "AWS EC2 Lab Report", course: "Cloud Computing", submittedOn: "Mar 18, 2026", marks: 42, maxMarks: 50, status: "graded" },
  { id: 5, title: "Linear Regression Implementation", course: "Machine Learning", submittedOn: "Mar 15, 2026", marks: 35, maxMarks: 40, status: "graded" },
  { id: 6, title: "Network Topology Design", course: "Computer Networks", submittedOn: "Mar 14, 2026", marks: null, maxMarks: 30, status: "pending" },
  { id: 7, title: "EDA on Titanic Dataset", course: "Data Science", submittedOn: "Mar 10, 2026", marks: 55, maxMarks: 60, status: "graded" },
];

const StudentAssignments = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Assignments</h1>
      <p className="text-muted-foreground">Manage and submit your assignments</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={FileText} label="Total Assignments" value="7" />
      <StatCard icon={Clock} label="Pending" value="3" trend="Due this week" />
      <StatCard icon={CheckCircle} label="Submitted" value="4" trend="All on time" trendUp />
      <StatCard icon={AlertCircle} label="Avg Score" value="88%" trend="+5% vs last month" trendUp />
    </div>

    {/* Pending */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <Clock className="w-5 h-5 text-warning" /> Pending Assignments
    </h2>
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {pendingAssignments.map((a) => (
        <div key={a.id} className="bg-card rounded-xl border border-border p-5 card-hover">
          <div className="flex items-start justify-between mb-2">
            <Badge variant={a.daysLeft <= 3 ? "destructive" : "secondary"}>
              {a.daysLeft} days left
            </Badge>
            <span className="text-xs text-muted-foreground">{a.maxMarks} marks</span>
          </div>
          <h3 className="font-display font-semibold text-foreground text-sm mb-1">{a.title}</h3>
          <p className="text-xs text-muted-foreground mb-1">{a.course} • {a.teacher}</p>
          <p className="text-xs text-muted-foreground mb-4">Due: {a.dueDate}</p>
          <Button size="sm" className="w-full gap-2">
            <Upload className="w-3 h-3" /> Submit Assignment
          </Button>
        </div>
      ))}
    </div>

    {/* Submitted */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-accent" /> Submitted Assignments
    </h2>
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Submitted</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Marks</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{a.title}</td>
                <td className="p-3 text-muted-foreground">{a.course}</td>
                <td className="p-3 text-muted-foreground">{a.submittedOn}</td>
                <td className="p-3 text-foreground">{a.marks !== null ? `${a.marks}/${a.maxMarks}` : "—"}</td>
                <td className="p-3">
                  <Badge variant={a.status === "graded" ? "default" : "secondary"}>
                    {a.status === "graded" ? "Graded" : "Pending Review"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default StudentAssignments;
