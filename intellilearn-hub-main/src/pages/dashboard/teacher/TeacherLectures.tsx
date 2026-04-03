import { Video, PlusCircle, Calendar, Clock, ExternalLink, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const upcomingLectures = [
  { id: 1, course: "Cloud Computing", topic: "Kubernetes Orchestration", date: "Mar 22, 2026", time: "10:00 AM - 12:00 PM", status: "scheduled" },
  { id: 2, course: "Machine Learning", topic: "CNN Architecture", date: "Mar 23, 2026", time: "2:00 PM - 4:00 PM", status: "scheduled" },
  { id: 3, course: "Cloud Computing", topic: "Serverless with AWS Lambda", date: "Mar 25, 2026", time: "10:00 AM - 12:00 PM", status: "scheduled" },
];

const pastLectures = [
  { id: 4, course: "Cloud Computing", topic: "AWS EC2 Basics", date: "Mar 18, 2026", attended: 48, total: 52, duration: "1h 52m", recorded: true },
  { id: 5, course: "Machine Learning", topic: "Decision Trees", date: "Mar 17, 2026", attended: 42, total: 48, duration: "1h 45m", recorded: true },
  { id: 6, course: "Cloud Computing", topic: "S3 & Storage", date: "Mar 15, 2026", attended: 45, total: 52, duration: "1h 58m", recorded: false },
];

const TeacherLectures = () => (
  <div>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Lectures</h1>
        <p className="text-muted-foreground">Schedule and manage live sessions</p>
      </div>
      <Button className="gap-2"><PlusCircle className="w-4 h-4" /> Schedule Lecture</Button>
    </div>

    {/* Upcoming */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <Calendar className="w-5 h-5 text-primary" /> Upcoming Lectures
    </h2>
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {upcomingLectures.map((l) => (
        <div key={l.id} className="bg-card rounded-xl border border-border p-5 card-hover">
          <Badge className="mb-3">Scheduled</Badge>
          <h3 className="font-display font-semibold text-foreground text-sm mb-1">{l.course}</h3>
          <p className="text-xs text-muted-foreground mb-3">{l.topic}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {l.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {l.time}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">Edit</Button>
            <Button size="sm" className="flex-1 gap-1"><ExternalLink className="w-3 h-3" /> Start</Button>
          </div>
        </div>
      ))}
    </div>

    {/* Past Lectures */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
      <MonitorPlay className="w-5 h-5 text-primary" /> Past Lectures
    </h2>
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Topic</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Attendance</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Duration</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Recording</th>
            </tr>
          </thead>
          <tbody>
            {pastLectures.map((l) => (
              <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{l.course}</td>
                <td className="p-3 text-muted-foreground">{l.topic}</td>
                <td className="p-3 text-muted-foreground">{l.date}</td>
                <td className="p-3 text-foreground">{l.attended}/{l.total} ({Math.round(l.attended / l.total * 100)}%)</td>
                <td className="p-3 text-muted-foreground">{l.duration}</td>
                <td className="p-3">
                  <Badge variant={l.recorded ? "default" : "secondary"}>{l.recorded ? "Available" : "N/A"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default TeacherLectures;
