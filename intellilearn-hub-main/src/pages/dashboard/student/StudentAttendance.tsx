import { ClipboardCheck, TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";

const courseAttendance = [
  { course: "Cloud Computing", total: 24, attended: 18, percentage: 75, trend: "+3%" },
  { course: "Machine Learning", total: 30, attended: 26, percentage: 87, trend: "+5%" },
  { course: "Data Science", total: 20, attended: 18, percentage: 90, trend: "+2%" },
  { course: "Computer Networks", total: 28, attended: 20, percentage: 71, trend: "-2%" },
];

const attendanceLog = [
  { date: "Mar 21, 2026", subject: "Cloud Computing", topic: "Kubernetes", joinTime: "10:02 AM", leaveTime: "11:58 AM", duration: "1h 56m", units: 2 },
  { date: "Mar 20, 2026", subject: "Machine Learning", topic: "Neural Networks", joinTime: "2:00 PM", leaveTime: "3:55 PM", duration: "1h 55m", units: 2 },
  { date: "Mar 20, 2026", subject: "Data Science", topic: "Visualization", joinTime: "10:05 AM", leaveTime: "11:50 AM", duration: "1h 45m", units: 1 },
  { date: "Mar 19, 2026", subject: "Computer Networks", topic: "TCP/IP", joinTime: "2:10 PM", leaveTime: "2:55 PM", duration: "45m", units: 0 },
  { date: "Mar 19, 2026", subject: "Cloud Computing", topic: "AWS S3", joinTime: "10:00 AM", leaveTime: "11:58 AM", duration: "1h 58m", units: 2 },
  { date: "Mar 18, 2026", subject: "Machine Learning", topic: "Decision Trees", joinTime: "2:00 PM", leaveTime: "3:50 PM", duration: "1h 50m", units: 1 },
];

const monthlyData = [
  { month: "Jan", pct: 80 },
  { month: "Feb", pct: 85 },
  { month: "Mar", pct: 87 },
];

const StudentAttendance = () => {
  const overallPct = Math.round(courseAttendance.reduce((a, c) => a + c.percentage, 0) / courseAttendance.length);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground">AI-powered attendance tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ClipboardCheck} label="Overall Attendance" value={`${overallPct}%`} trend="+3% this month" trendUp />
        <StatCard icon={Calendar} label="Classes Attended" value="82" trend="out of 102" />
        <StatCard icon={Clock} label="Total Hours" value="156h" trend="+12h this week" trendUp />
        <StatCard icon={TrendingUp} label="This Month" value="90%" trend="Best month!" trendUp />
      </div>

      {/* Course-wise Attendance */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Course-wise Attendance</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {courseAttendance.map((c) => (
          <div key={c.course} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground text-sm">{c.course}</h3>
              <span className={`text-xs flex items-center gap-1 ${c.trend.startsWith("+") ? "text-accent" : "text-destructive"}`}>
                {c.trend.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {c.trend}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Progress value={c.percentage} className="h-3 flex-1" />
              <span className="text-sm font-semibold text-foreground w-12 text-right">{c.percentage}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{c.attended} of {c.total} lectures attended</p>
          </div>
        ))}
      </div>

      {/* Monthly Trend */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Monthly Trend</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-8">
        <div className="flex items-end gap-6 h-32">
          {monthlyData.map((m) => (
            <div key={m.month} className="flex flex-col items-center gap-2 flex-1">
              <span className="text-xs font-medium text-foreground">{m.pct}%</span>
              <div className="w-full bg-muted rounded-t-lg overflow-hidden" style={{ height: "100%" }}>
                <div className="w-full bg-primary rounded-t-lg transition-all" style={{ height: `${m.pct}%`, marginTop: `${100 - m.pct}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Log */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Recent Attendance Log</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Subject</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Topic</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Join</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Leave</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Duration</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Units</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLog.map((l, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-foreground">{l.date}</td>
                  <td className="p-3 font-medium text-foreground">{l.subject}</td>
                  <td className="p-3 text-muted-foreground">{l.topic}</td>
                  <td className="p-3 text-muted-foreground">{l.joinTime}</td>
                  <td className="p-3 text-muted-foreground">{l.leaveTime}</td>
                  <td className="p-3 text-muted-foreground">{l.duration}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.units >= 2 ? "bg-accent/10 text-accent" : l.units === 1 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                      {l.units}
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
};

export default StudentAttendance;
