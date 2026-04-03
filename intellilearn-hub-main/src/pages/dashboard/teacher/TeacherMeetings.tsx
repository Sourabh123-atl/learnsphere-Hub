import { useState } from "react";
import { Video, PlusCircle, Calendar, Clock, Users, Wifi, WifiOff, Play, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

const scheduledMeetings = [
  { id: 1, title: "Cloud Computing - Live Lecture", course: "Cloud Computing", date: "Mar 28, 2026", time: "10:00 AM", duration: "2 hours", students: 52, status: "upcoming" },
  { id: 2, title: "ML Lab Session", course: "Machine Learning", date: "Mar 29, 2026", time: "2:00 PM", duration: "1.5 hours", students: 48, status: "upcoming" },
  { id: 3, title: "Doubt Clearing Session", course: "Cloud Computing", date: "Mar 30, 2026", time: "4:00 PM", duration: "1 hour", students: 30, status: "upcoming" },
];

const pastMeetings = [
  { id: 4, title: "AWS Services Overview", course: "Cloud Computing", date: "Mar 21, 2026", duration: "1h 55m", attended: 48, total: 52, avgTime: "1h 42m", aiUnits: 1 },
  { id: 5, title: "Neural Networks Deep Dive", course: "Machine Learning", date: "Mar 20, 2026", duration: "1h 48m", attended: 44, total: 48, avgTime: "1h 35m", aiUnits: 1 },
  { id: 6, title: "Docker Containers Lab", course: "Cloud Computing", date: "Mar 18, 2026", duration: "2h 10m", attended: 50, total: 52, avgTime: "1h 58m", aiUnits: 1 },
];

const TeacherMeetings = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("2");

  const handleSchedule = () => {
    alert("Meeting scheduled! Students will be notified. (Connect Lovable Cloud for real notifications)");
    setShowScheduler(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Live Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage live sessions with AI attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Play className="w-4 h-4" /> Start Instant Meeting</Button>
          <Button className="gap-2" onClick={() => setShowScheduler(!showScheduler)}>
            <PlusCircle className="w-4 h-4" /> Schedule Meeting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Video} label="Total Meetings" value="6" />
        <StatCard icon={Calendar} label="Upcoming" value="3" />
        <StatCard icon={Users} label="Avg Attendance" value="92%" trend="+3%" trendUp />
        <StatCard icon={Clock} label="Avg Duration" value="1h 58m" />
      </div>

      {showScheduler && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">Schedule New Meeting</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Meeting Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Cloud Computing Lecture 12" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Course</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select Course</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Structures">Data Structures</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Time</label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Duration (hours)</label>
              <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="0.5" max="4" step="0.5" />
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 mb-4">
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" /> AI Attendance Settings
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" defaultChecked className="accent-primary" /> Enable AI attendance tracking
              </label>
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" defaultChecked className="accent-primary" /> Auto-mark attendance (60 min = 1 unit)
              </label>
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-primary" /> Record meeting
              </label>
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" defaultChecked className="accent-primary" /> Send reminder notification
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowScheduler(false)}>Cancel</Button>
            <Button onClick={handleSchedule} className="gap-2"><Calendar className="w-4 h-4" /> Schedule</Button>
          </div>
        </div>
      )}

      {/* Upcoming */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <Wifi className="w-5 h-5 text-primary" /> Upcoming Meetings
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {scheduledMeetings.map((m) => (
          <div key={m.id} className="bg-card rounded-xl border border-border p-5 card-hover">
            <Badge className="mb-3">{m.status}</Badge>
            <h3 className="font-display font-semibold text-foreground text-sm mb-1">{m.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">{m.course}</p>
            <div className="space-y-1 text-xs text-muted-foreground mb-4">
              <p className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {m.date}</p>
              <p className="flex items-center gap-1"><Clock className="w-3 h-3" /> {m.time} ({m.duration})</p>
              <p className="flex items-center gap-1"><Users className="w-3 h-3" /> {m.students} students enrolled</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Edit</Button>
              <Button size="sm" className="flex-1 gap-1"><Play className="w-3 h-3" /> Start</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Meetings with AI Attendance */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <WifiOff className="w-5 h-5 text-muted-foreground" /> Past Meetings — AI Attendance Report
      </h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Meeting</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Duration</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Attended</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Avg Time</th>
                <th className="text-left p-3 font-medium text-muted-foreground">AI Units</th>
              </tr>
            </thead>
            <tbody>
              {pastMeetings.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{m.title}</td>
                  <td className="p-3 text-muted-foreground">{m.course}</td>
                  <td className="p-3 text-muted-foreground">{m.date}</td>
                  <td className="p-3 text-muted-foreground">{m.duration}</td>
                  <td className="p-3 text-foreground">{m.attended}/{m.total} ({Math.round(m.attended / m.total * 100)}%)</td>
                  <td className="p-3 text-muted-foreground">{m.avgTime}</td>
                  <td className="p-3">
                    <Badge variant="outline">{m.aiUnits} unit</Badge>
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

export default TeacherMeetings;
