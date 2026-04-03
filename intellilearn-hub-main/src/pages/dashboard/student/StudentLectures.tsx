import { Video, Clock, Calendar, ExternalLink, Play, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const liveLectures = [
  { id: 1, subject: "Cloud Computing", topic: "Kubernetes Orchestration", teacher: "Dr. Sharma", time: "10:00 AM - 12:00 PM", date: "Today", status: "live", meetLink: "#" },
  { id: 2, subject: "Machine Learning", topic: "Neural Network Backpropagation", teacher: "Prof. Verma", time: "2:00 PM - 4:00 PM", date: "Today", status: "upcoming", meetLink: "#" },
];

const scheduledLectures = [
  { id: 3, subject: "Data Science", topic: "Regression Analysis", teacher: "Dr. Gupta", time: "10:00 AM - 12:00 PM", date: "Mar 22, 2026", day: "Monday" },
  { id: 4, subject: "Computer Networks", topic: "TCP/IP Protocol Suite", teacher: "Prof. Singh", time: "2:00 PM - 4:00 PM", date: "Mar 22, 2026", day: "Monday" },
  { id: 5, subject: "Cloud Computing", topic: "Serverless Architecture", teacher: "Dr. Sharma", time: "10:00 AM - 12:00 PM", date: "Mar 23, 2026", day: "Tuesday" },
  { id: 6, subject: "Machine Learning", topic: "Convolutional Neural Networks", teacher: "Prof. Verma", time: "2:00 PM - 4:00 PM", date: "Mar 24, 2026", day: "Wednesday" },
];

const recordings = [
  { subject: "Cloud Computing", topic: "AWS EC2 Basics", date: "Mar 18, 2026", duration: "1h 52m" },
  { subject: "Machine Learning", topic: "Decision Trees", date: "Mar 17, 2026", duration: "1h 45m" },
  { subject: "Data Science", topic: "Pandas Data Manipulation", date: "Mar 16, 2026", duration: "1h 58m" },
  { subject: "Computer Networks", topic: "OSI Model Deep Dive", date: "Mar 15, 2026", duration: "1h 40m" },
];

const StudentLectures = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Live Lectures</h1>
      <p className="text-muted-foreground">Join lectures and watch recordings</p>
    </div>

    {/* Today's Lectures */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <Video className="w-5 h-5 text-primary" /> Today's Lectures
    </h2>
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {liveLectures.map((l) => (
        <div key={l.id} className="bg-card rounded-xl border border-border p-5 card-hover relative overflow-hidden">
          {l.status === "live" && <div className="absolute top-0 left-0 right-0 h-1 bg-destructive animate-pulse" />}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-display font-semibold text-foreground">{l.subject}</h3>
              <p className="text-sm text-muted-foreground">{l.topic}</p>
            </div>
            <Badge variant={l.status === "live" ? "destructive" : "secondary"}>
              {l.status === "live" ? "● LIVE" : "Upcoming"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{l.teacher}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {l.time}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {l.date}</span>
          </div>
          <Button size="sm" className="gap-2" disabled={l.status !== "live"}>
            <ExternalLink className="w-3 h-3" /> {l.status === "live" ? "Join Now" : "Not Started Yet"}
          </Button>
        </div>
      ))}
    </div>

    {/* Upcoming Schedule */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <Calendar className="w-5 h-5 text-primary" /> Upcoming Schedule
    </h2>
    <div className="bg-card rounded-xl border border-border mb-8 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Subject</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Topic</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Teacher</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
            </tr>
          </thead>
          <tbody>
            {scheduledLectures.map((l) => (
              <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{l.subject}</td>
                <td className="p-3 text-muted-foreground">{l.topic}</td>
                <td className="p-3 text-muted-foreground">{l.teacher}</td>
                <td className="p-3 text-muted-foreground">{l.day}, {l.date}</td>
                <td className="p-3 text-muted-foreground">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Recordings */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <MonitorPlay className="w-5 h-5 text-primary" /> Lecture Recordings
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {recordings.map((r, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-4 card-hover">
          <div className="w-full h-24 rounded-lg bg-muted flex items-center justify-center mb-3">
            <Play className="w-8 h-8 text-muted-foreground" />
          </div>
          <h4 className="text-sm font-medium text-foreground">{r.subject}</h4>
          <p className="text-xs text-muted-foreground mb-1">{r.topic}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{r.date}</span>
            <span>{r.duration}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StudentLectures;
