import { Video, Users, Clock, Brain, Monitor, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";

const activeMeetings = [
  { id: 1, course: "Cloud Computing", topic: "Kubernetes Pods", teacher: "Dr. Sharma", startTime: "10:00 AM", currentStudents: 48, totalEnrolled: 52, avgTimeSpent: 85, duration: 120 },
  { id: 2, course: "Data Science", topic: "Feature Engineering", teacher: "Dr. Gupta", startTime: "10:30 AM", currentStudents: 51, totalEnrolled: 56, avgTimeSpent: 72, duration: 120 },
];

const recentMeetings = [
  { course: "Machine Learning", teacher: "Prof. Verma", date: "Mar 20", duration: "2h", attended: 45, enrolled: 48, avgUnits: 1.8, dropouts: 3 },
  { course: "Cloud Computing", teacher: "Dr. Sharma", date: "Mar 20", duration: "2h", attended: 50, enrolled: 52, avgUnits: 1.9, dropouts: 1 },
  { course: "Computer Networks", teacher: "Prof. Singh", date: "Mar 19", duration: "2h", attended: 38, enrolled: 45, avgUnits: 1.2, dropouts: 8 },
  { course: "Data Science", teacher: "Dr. Gupta", date: "Mar 19", duration: "2h", attended: 54, enrolled: 56, avgUnits: 1.7, dropouts: 2 },
  { course: "Operating Systems", teacher: "Prof. Jain", date: "Mar 18", duration: "1.5h", attended: 52, enrolled: 58, avgUnits: 1.3, dropouts: 5 },
];

const studentLiveTracking = [
  { student: "Sourabh Patel", course: "Cloud Computing", timeIn: "85 min", status: "active", predictedUnits: 1 },
  { student: "Priya Sharma", course: "Cloud Computing", timeIn: "85 min", status: "active", predictedUnits: 1 },
  { student: "Rahul Kumar", course: "Data Science", timeIn: "72 min", status: "active", predictedUnits: 1 },
  { student: "Vikram Singh", course: "Cloud Computing", timeIn: "22 min", status: "at risk", predictedUnits: 0 },
  { student: "Neha Tiwari", course: "Data Science", timeIn: "72 min", status: "active", predictedUnits: 1 },
  { student: "Rohit Mishra", course: "Cloud Computing", timeIn: "0 min", status: "absent", predictedUnits: 0 },
];

const AdminMeetings = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Live Meeting Monitor</h1>
      <p className="text-muted-foreground">Real-time AI attendance tracking across all meetings</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Video} label="Active Meetings" value="2" trend="In progress" />
      <StatCard icon={Users} label="Students Online" value="99" trend="of 108 enrolled" />
      <StatCard icon={Brain} label="AI Tracking" value="Active" trend="Real-time" trendUp />
      <StatCard icon={Monitor} label="Avg Engagement" value="92%" trendUp trend="+3%" />
    </div>

    {/* Active Meetings */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" /> Active Meetings
    </h2>
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {activeMeetings.map((m) => (
        <div key={m.id} className="bg-card rounded-xl border-2 border-destructive/20 p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-destructive animate-pulse" />
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-display font-semibold text-foreground">{m.course}</h3>
              <p className="text-sm text-muted-foreground">{m.topic} • {m.teacher}</p>
            </div>
            <Badge variant="destructive">● LIVE</Badge>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center mb-3">
            <div className="bg-muted rounded-lg p-2">
              <p className="text-lg font-bold text-foreground">{m.currentStudents}/{m.totalEnrolled}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div className="bg-muted rounded-lg p-2">
              <p className="text-lg font-bold text-foreground">{m.avgTimeSpent}m</p>
              <p className="text-xs text-muted-foreground">Avg Time</p>
            </div>
            <div className="bg-muted rounded-lg p-2">
              <p className="text-lg font-bold text-accent">{Math.round((m.currentStudents / m.totalEnrolled) * 100)}%</p>
              <p className="text-xs text-muted-foreground">Presence</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Clock className="w-3 h-3" /> Started at {m.startTime} • Duration: {m.duration} min
          </div>
          <Progress value={(m.avgTimeSpent / m.duration) * 100} className="h-2" />
        </div>
      ))}
    </div>

    {/* Live Student Tracking */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <Brain className="w-5 h-5 text-primary" /> Live Student Tracking
    </h2>
    <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Meeting</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Time In</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Predicted Units</th>
            </tr>
          </thead>
          <tbody>
            {studentLiveTracking.map((s, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{s.student}</td>
                <td className="p-3 text-muted-foreground">{s.course}</td>
                <td className="p-3 text-muted-foreground">{s.timeIn}</td>
                <td className="p-3">
                  {s.status === "active" && <Badge variant="default" className="gap-1"><CheckCircle2 className="w-3 h-3" /> Active</Badge>}
                  {s.status === "at risk" && <Badge variant="secondary" className="gap-1 text-warning border-warning/30"><AlertTriangle className="w-3 h-3" /> At Risk</Badge>}
                  {s.status === "absent" && <Badge variant="destructive" className="gap-1">Absent</Badge>}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.predictedUnits >= 1 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>{s.predictedUnits}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Recent Meeting History */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3">Recent Meeting History</h2>
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Teacher</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Duration</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Attendance</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Avg Units</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Dropouts</th>
            </tr>
          </thead>
          <tbody>
            {recentMeetings.map((m, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{m.course}</td>
                <td className="p-3 text-muted-foreground">{m.teacher}</td>
                <td className="p-3 text-muted-foreground">{m.date}</td>
                <td className="p-3 text-muted-foreground">{m.duration}</td>
                <td className="p-3 text-foreground">{m.attended}/{m.enrolled}</td>
                <td className="p-3">
                  <span className={`font-semibold ${m.avgUnits >= 1.5 ? "text-accent" : "text-warning"}`}>{m.avgUnits}</span>
                </td>
                <td className="p-3">
                  <span className={m.dropouts > 5 ? "text-destructive font-medium" : "text-muted-foreground"}>{m.dropouts}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminMeetings;
