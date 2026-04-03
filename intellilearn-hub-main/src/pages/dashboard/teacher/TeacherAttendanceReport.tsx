import { useState } from "react";
import { ClipboardCheck, Download, Search, AlertTriangle, TrendingUp, TrendingDown, Users, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";

const courseData = [
  { course: "Cloud Computing", semester: 5, totalStudents: 52, avgAttendance: 85, totalLectures: 24, aiTracked: 18, belowThreshold: 4 },
  { course: "Machine Learning", semester: 5, totalStudents: 48, avgAttendance: 82, totalLectures: 18, aiTracked: 14, belowThreshold: 6 },
  { course: "Data Structures", semester: 3, totalStudents: 65, avgAttendance: 90, totalLectures: 28, aiTracked: 22, belowThreshold: 2 },
];

const studentAttendance = [
  { name: "Sourabh Patel", course: "Cloud Computing", attended: 21, total: 24, aiUnits: 18, avgTimeSpent: "1h 48m", status: "good" },
  { name: "Priya Sharma", course: "Cloud Computing", attended: 23, total: 24, aiUnits: 20, avgTimeSpent: "1h 55m", status: "excellent" },
  { name: "Rahul Kumar", course: "Machine Learning", attended: 12, total: 18, aiUnits: 10, avgTimeSpent: "52m", status: "at-risk" },
  { name: "Anita Desai", course: "Machine Learning", attended: 17, total: 18, aiUnits: 16, avgTimeSpent: "1h 42m", status: "excellent" },
  { name: "Vikram Singh", course: "Cloud Computing", attended: 13, total: 24, aiUnits: 8, avgTimeSpent: "38m", status: "critical" },
  { name: "Meera Joshi", course: "Machine Learning", attended: 15, total: 18, aiUnits: 13, avgTimeSpent: "1h 20m", status: "good" },
  { name: "Amit Verma", course: "Data Structures", attended: 26, total: 28, aiUnits: 22, avgTimeSpent: "1h 50m", status: "excellent" },
  { name: "Neha Gupta", course: "Data Structures", attended: 18, total: 28, aiUnits: 12, avgTimeSpent: "45m", status: "at-risk" },
];

const TeacherAttendanceReport = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = studentAttendance.filter((s) => {
    const matchCourse = selectedCourse === "all" || s.course === selectedCourse;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchCourse && matchSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-accent/10 text-accent";
      case "good": return "bg-primary/10 text-primary";
      case "at-risk": return "bg-warning/10 text-warning";
      case "critical": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">AI Attendance Reports</h1>
          <p className="text-muted-foreground">AI-tracked attendance based on time spent in live meetings</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export Full Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Students" value="165" />
        <StatCard icon={ClipboardCheck} label="Overall Avg" value="86%" trend="+4%" trendUp />
        <StatCard icon={Brain} label="AI Tracked Sessions" value="54" />
        <StatCard icon={AlertTriangle} label="At Risk Students" value="12" trend="Below 75%" />
      </div>

      {/* Course Overview */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Course-wise AI Attendance</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {courseData.map((c) => (
          <div key={c.course} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground text-sm">{c.course}</h3>
              <Badge variant="outline">Sem {c.semester}</Badge>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Progress value={c.avgAttendance} className="h-2 flex-1" />
              <span className="text-sm font-semibold text-foreground">{c.avgAttendance}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div><span className="block text-foreground font-medium">{c.totalStudents}</span> Students</div>
              <div><span className="block text-foreground font-medium">{c.totalLectures}</span> Lectures</div>
              <div><span className="block text-primary font-medium">{c.aiTracked}</span> AI Tracked</div>
              <div><span className="block text-destructive font-medium">{c.belowThreshold}</span> Below 75%</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All Courses</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Data Structures">Data Structures</option>
        </select>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Student Table */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Student-wise AI Attendance Details</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Attended</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Percentage</th>
                <th className="text-left p-3 font-medium text-muted-foreground">AI Units</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Avg Time</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const pct = Math.round(s.attended / s.total * 100);
                return (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {s.name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{s.course}</td>
                    <td className="p-3 text-foreground">{s.attended}/{s.total}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="h-1.5 w-16" />
                        <span className="text-foreground font-medium flex items-center gap-1">
                          {pct >= 75 ? <TrendingUp className="w-3 h-3 text-accent" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3"><Badge variant="outline">{s.aiUnits} units</Badge></td>
                    <td className="p-3 text-muted-foreground">{s.avgTimeSpent}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendanceReport;
