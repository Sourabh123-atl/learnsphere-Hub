import { Video, Calendar, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

const liveLectures = [
  { id: 1, course: "Cloud Computing", teacher: "Dr. Sharma", topic: "Kubernetes", time: "10:00 AM", students: 48, status: "live" },
  { id: 2, course: "Data Science", teacher: "Dr. Gupta", topic: "Visualization", time: "10:30 AM", students: 52, status: "live" },
];

const todaySchedule = [
  { id: 3, course: "Machine Learning", teacher: "Prof. Verma", topic: "CNN Architecture", time: "2:00 PM - 4:00 PM", status: "upcoming" },
  { id: 4, course: "Computer Networks", teacher: "Prof. Singh", topic: "DNS", time: "4:00 PM - 5:30 PM", status: "upcoming" },
];

const recentLectures = [
  { course: "Cloud Computing", teacher: "Dr. Sharma", topic: "AWS S3", date: "Mar 20", attended: 45, total: 52, duration: "1h 58m" },
  { course: "Machine Learning", teacher: "Prof. Verma", topic: "Decision Trees", date: "Mar 19", attended: 42, total: 48, duration: "1h 45m" },
  { course: "Data Science", teacher: "Dr. Gupta", topic: "Pandas", date: "Mar 19", attended: 50, total: 56, duration: "1h 52m" },
  { course: "Operating Systems", teacher: "Prof. Jain", topic: "Scheduling", date: "Mar 18", attended: 53, total: 58, duration: "1h 48m" },
];

const AdminLectures = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Lecture Monitoring</h1>
      <p className="text-muted-foreground">Track all live and scheduled lectures</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Video} label="Live Now" value="2" trend="In progress" />
      <StatCard icon={Calendar} label="Today's Lectures" value="4" />
      <StatCard icon={Clock} label="Total This Week" value="18" />
      <StatCard icon={Users} label="Avg Attendance" value="89%" trend="+5%" trendUp />
    </div>

    {/* Live Now */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" /> Live Now
    </h2>
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {liveLectures.map((l) => (
        <div key={l.id} className="bg-card rounded-xl border-2 border-destructive/20 p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-destructive animate-pulse" />
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-display font-semibold text-foreground">{l.course}</h3>
              <p className="text-sm text-muted-foreground">{l.topic} • {l.teacher}</p>
            </div>
            <Badge variant="destructive">● LIVE</Badge>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Started {l.time}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {l.students} students</span>
          </div>
        </div>
      ))}
    </div>

    {/* Today's Schedule */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3">Upcoming Today</h2>
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {todaySchedule.map((l) => (
        <div key={l.id} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-foreground text-sm">{l.course}</h3>
              <p className="text-xs text-muted-foreground">{l.topic} • {l.teacher}</p>
            </div>
            <Badge variant="secondary">Upcoming</Badge>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {l.time}</p>
        </div>
      ))}
    </div>

    {/* Recent */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3">Recent Lectures</h2>
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Teacher</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Topic</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Attendance</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Duration</th>
            </tr>
          </thead>
          <tbody>
            {recentLectures.map((l, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{l.course}</td>
                <td className="p-3 text-muted-foreground">{l.teacher}</td>
                <td className="p-3 text-muted-foreground">{l.topic}</td>
                <td className="p-3 text-muted-foreground">{l.date}</td>
                <td className="p-3 text-foreground">{l.attended}/{l.total}</td>
                <td className="p-3 text-muted-foreground">{l.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminLectures;
