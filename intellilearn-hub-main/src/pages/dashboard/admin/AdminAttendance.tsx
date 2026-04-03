import { useState } from "react";
import { ClipboardCheck, Search, TrendingUp, TrendingDown, Users, AlertTriangle, Brain, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";

const courseAttendanceData = [
  { course: "Cloud Computing", teacher: "Dr. Sharma", semester: 5, totalStudents: 52, avgAttendance: 78, below75: 8 },
  { course: "Machine Learning", teacher: "Prof. Verma", semester: 5, totalStudents: 48, avgAttendance: 85, below75: 4 },
  { course: "Data Science", teacher: "Dr. Gupta", semester: 5, totalStudents: 56, avgAttendance: 90, below75: 2 },
  { course: "Computer Networks", teacher: "Prof. Singh", semester: 5, totalStudents: 45, avgAttendance: 71, below75: 14 },
  { course: "Data Structures", teacher: "Dr. Mehta", semester: 3, totalStudents: 65, avgAttendance: 82, below75: 9 },
  { course: "Operating Systems", teacher: "Prof. Jain", semester: 4, totalStudents: 58, avgAttendance: 76, below75: 11 },
];

const lowAttendanceStudents = [
  { name: "Vikram Singh", email: "vikram@edu.com", course: "Computer Networks", semester: 5, attendance: 55, totalLectures: 28, attended: 15 },
  { name: "Rohit Mishra", email: "rohit@edu.com", course: "Computer Networks", semester: 5, attendance: 60, totalLectures: 28, attended: 17 },
  { name: "Neha Tiwari", email: "neha@edu.com", course: "Cloud Computing", semester: 5, attendance: 62, totalLectures: 24, attended: 15 },
  { name: "Amit Jain", email: "amit@edu.com", course: "Operating Systems", semester: 4, attendance: 58, totalLectures: 22, attended: 13 },
  { name: "Kavita Rao", email: "kavita@edu.com", course: "Data Structures", semester: 3, attendance: 52, totalLectures: 28, attended: 14 },
  { name: "Ravi Pandey", email: "ravi@edu.com", course: "Cloud Computing", semester: 5, attendance: 67, totalLectures: 24, attended: 16 },
];

const recentAILogs = [
  { student: "Vikram Singh", course: "Cloud Computing", date: "Mar 21", joinTime: "10:15 AM", leaveTime: "10:52 AM", duration: "37 min", units: 0, flag: "left early" },
  { student: "Neha Tiwari", course: "Machine Learning", date: "Mar 21", joinTime: "2:00 PM", leaveTime: "3:58 PM", duration: "1h 58m", units: 1, flag: "" },
  { student: "Sourabh Patel", course: "Cloud Computing", date: "Mar 21", joinTime: "10:02 AM", leaveTime: "11:58 AM", duration: "1h 56m", units: 1, flag: "" },
  { student: "Priya Sharma", course: "Data Science", date: "Mar 20", joinTime: "10:00 AM", leaveTime: "12:00 PM", duration: "2h 0m", units: 2, flag: "perfect" },
  { student: "Rohit Mishra", course: "Computer Networks", date: "Mar 20", joinTime: "2:10 PM", leaveTime: "2:45 PM", duration: "35 min", units: 0, flag: "left early" },
];

const AdminAttendance = () => {
  const [search, setSearch] = useState("");
  const filteredStudents = lowAttendanceStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase())
  );

  const totalBelow75 = courseAttendanceData.reduce((a, c) => a + c.below75, 0);
  const overallAvg = Math.round(courseAttendanceData.reduce((a, c) => a + c.avgAttendance, 0) / courseAttendanceData.length);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Attendance Monitoring</h1>
          <p className="text-muted-foreground">AI-powered attendance tracking across all courses</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ClipboardCheck} label="Overall Avg" value={`${overallAvg}%`} trend="+3% this month" trendUp />
        <StatCard icon={AlertTriangle} label="Below 75%" value={`${totalBelow75} students`} trend="Needs attention" />
        <StatCard icon={Brain} label="AI Tracked Sessions" value="1,842" trend="100% automated" trendUp />
        <StatCard icon={Users} label="Total Students" value="1,247" />
      </div>

      {/* Course-wise Attendance Overview */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Course-wise Attendance</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {courseAttendanceData.map((c) => (
          <div key={c.course} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-foreground text-sm">{c.course}</h3>
                <p className="text-xs text-muted-foreground">{c.teacher} • Sem {c.semester}</p>
              </div>
              {c.avgAttendance < 75 ? (
                <Badge variant="destructive" className="text-xs">Low</Badge>
              ) : (
                <Badge variant="default" className="text-xs">Good</Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Progress value={c.avgAttendance} className="h-3 flex-1" />
              <span className={`text-sm font-semibold w-12 text-right ${c.avgAttendance >= 75 ? "text-accent" : "text-destructive"}`}>{c.avgAttendance}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{c.totalStudents} students</span>
              <span className={c.below75 > 5 ? "text-destructive font-medium" : ""}>{c.below75} below 75%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Low Attendance Students */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-destructive" /> Low Attendance Students (&lt;75%)
      </h2>
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Sem</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Attended</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Attendance</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <p className="font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.email}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{s.course}</td>
                  <td className="p-3 text-foreground">{s.semester}</td>
                  <td className="p-3 text-muted-foreground">{s.attended}/{s.totalLectures}</td>
                  <td className="p-3">
                    <span className="text-destructive font-semibold">{s.attendance}%</span>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="outline" className="text-xs h-7">Send Warning</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Attendance Logs */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <Brain className="w-5 h-5 text-primary" /> Recent AI Attendance Logs
      </h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Join</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Leave</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Duration</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Units</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Flag</th>
              </tr>
            </thead>
            <tbody>
              {recentAILogs.map((l, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{l.student}</td>
                  <td className="p-3 text-muted-foreground">{l.course}</td>
                  <td className="p-3 text-muted-foreground">{l.date}</td>
                  <td className="p-3 text-muted-foreground">{l.joinTime}</td>
                  <td className="p-3 text-muted-foreground">{l.leaveTime}</td>
                  <td className="p-3 text-muted-foreground">{l.duration}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.units >= 2 ? "bg-accent/10 text-accent" : l.units === 1 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>{l.units}</span>
                  </td>
                  <td className="p-3">
                    {l.flag === "left early" && <Badge variant="destructive" className="text-xs">Left Early</Badge>}
                    {l.flag === "perfect" && <Badge variant="default" className="text-xs">Perfect</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
