import { ClipboardCheck, Calendar, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";

const courseAttendance = [
  { course: "Cloud Computing", avgAttendance: 85, totalLectures: 24, students: 52, belowThreshold: 4 },
  { course: "Machine Learning", avgAttendance: 82, totalLectures: 18, students: 48, belowThreshold: 6 },
  { course: "Data Structures", avgAttendance: 90, totalLectures: 28, students: 65, belowThreshold: 2 },
];

const recentAttendance = [
  { date: "Mar 21", course: "Cloud Computing", topic: "Kubernetes", present: 48, total: 52, percentage: 92 },
  { date: "Mar 20", course: "Machine Learning", topic: "Neural Networks", present: 40, total: 48, percentage: 83 },
  { date: "Mar 19", course: "Cloud Computing", topic: "AWS S3", present: 45, total: 52, percentage: 87 },
  { date: "Mar 18", course: "Machine Learning", topic: "Decision Trees", present: 38, total: 48, percentage: 79 },
  { date: "Mar 17", course: "Data Structures", topic: "Graph Algorithms", present: 60, total: 65, percentage: 92 },
];

const TeacherAttendance = () => (
  <div>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground">Track and manage student attendance</p>
      </div>
      <button className="flex items-center gap-2 text-sm text-primary hover:underline"><Download className="w-4 h-4" /> Export Report</button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard icon={ClipboardCheck} label="Avg Attendance" value="86%" trend="+4% this month" trendUp />
      <StatCard icon={Calendar} label="Lectures This Month" value="12" />
      <StatCard icon={ClipboardCheck} label="Below 75%" value="12 students" trend="Needs attention" />
    </div>

    {/* Course-wise */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3">Course-wise Overview</h2>
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {courseAttendance.map((c) => (
        <div key={c.course} className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-medium text-foreground text-sm mb-2">{c.course}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Progress value={c.avgAttendance} className="h-2 flex-1" />
            <span className="text-sm font-semibold text-foreground">{c.avgAttendance}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
            <div><span className="block text-foreground font-medium">{c.students}</span> Students</div>
            <div><span className="block text-foreground font-medium">{c.totalLectures}</span> Lectures</div>
            <div><span className="block text-destructive font-medium">{c.belowThreshold}</span> At Risk</div>
          </div>
        </div>
      ))}
    </div>

    {/* Recent Log */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3">Recent Lecture Attendance</h2>
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Topic</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Present</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {recentAttendance.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 text-foreground">{r.date}</td>
                <td className="p-3 font-medium text-foreground">{r.course}</td>
                <td className="p-3 text-muted-foreground">{r.topic}</td>
                <td className="p-3 text-foreground">{r.present}/{r.total}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.percentage >= 85 ? "bg-accent/10 text-accent" : r.percentage >= 75 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                    {r.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default TeacherAttendance;
