import { useState, useEffect, useRef, useCallback } from "react";
import { Video, VideoOff, Mic, MicOff, MonitorUp, Users, Clock, LogOut, Brain, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";

type MeetingSession = {
  joinTime: Date;
  leaveTime?: Date;
};

type AttendanceResult = {
  totalMinutes: number;
  units: number;
  status: "full" | "partial" | "absent";
};

const calculateAttendance = (sessions: MeetingSession[]): AttendanceResult => {
  let totalMs = 0;
  for (const s of sessions) {
    if (s.leaveTime) {
      totalMs += s.leaveTime.getTime() - s.joinTime.getTime();
    }
  }
  const totalMinutes = Math.round(totalMs / 60000);
  const units = totalMinutes < 60 ? 0 : Math.floor(totalMinutes / 60);
  return {
    totalMinutes,
    units,
    status: units >= 2 ? "full" : units === 1 ? "partial" : "absent",
  };
};

const availableMeetings = [
  { id: 1, subject: "Cloud Computing", topic: "Kubernetes Pods & Services", teacher: "Dr. Sharma", duration: 120, scheduledTime: "10:00 AM - 12:00 PM", status: "live" as const },
  { id: 2, subject: "Machine Learning", topic: "Backpropagation Deep Dive", teacher: "Prof. Verma", duration: 120, scheduledTime: "2:00 PM - 4:00 PM", status: "upcoming" as const },
  { id: 3, subject: "Data Science", topic: "Feature Engineering", teacher: "Dr. Gupta", duration: 120, scheduledTime: "10:00 AM - 12:00 PM", status: "upcoming" as const },
];

const pastAttendance = [
  { subject: "Cloud Computing", date: "Mar 20", attended: 115, total: 120, units: 1 },
  { subject: "Machine Learning", date: "Mar 19", attended: 118, total: 120, units: 1 },
  { subject: "Data Science", date: "Mar 18", attended: 55, total: 120, units: 0 },
  { subject: "Cloud Computing", date: "Mar 17", attended: 120, total: 120, units: 2 },
];

const StudentLiveMeeting = () => {
  const [inMeeting, setInMeeting] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<typeof availableMeetings[0] | null>(null);
  const [sessions, setSessions] = useState<MeetingSession[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const joinTimeRef = useRef<Date | null>(null);

  // Timer
  useEffect(() => {
    if (!inMeeting) return;
    const t = setInterval(() => setElapsed((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [inMeeting]);

  const joinMeeting = useCallback((meeting: typeof availableMeetings[0]) => {
    const now = new Date();
    joinTimeRef.current = now;
    setCurrentMeeting(meeting);
    setSessions([{ joinTime: now }]);
    setElapsed(0);
    setInMeeting(true);
    setCameraOn(true);
    setMicOn(true);
    setShowResult(false);
    setResult(null);
  }, []);

  const leaveMeeting = useCallback(() => {
    const now = new Date();
    const updated = sessions.map((s, i) =>
      i === sessions.length - 1 && !s.leaveTime ? { ...s, leaveTime: now } : s
    );
    setSessions(updated);
    setInMeeting(false);

    // Calculate AI attendance
    const att = calculateAttendance(updated);
    setResult(att);
    setShowResult(true);
  }, [sessions]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Attendance result screen
  if (showResult && result && currentMeeting) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-xl font-display font-bold text-foreground mb-1">AI Attendance Report</h2>
          <p className="text-muted-foreground mb-6">{currentMeeting.subject} — {currentMeeting.topic}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-2xl font-bold text-foreground">{result.totalMinutes}m</p>
              <p className="text-xs text-muted-foreground">Time Spent</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className={`text-2xl font-bold ${result.units >= 2 ? "text-accent" : result.units === 1 ? "text-warning" : "text-destructive"}`}>
                {result.units}
              </p>
              <p className="text-xs text-muted-foreground">Attendance Units</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className={`text-lg font-bold ${result.status === "full" ? "text-accent" : result.status === "partial" ? "text-warning" : "text-destructive"}`}>
                {result.status === "full" ? "Full" : result.status === "partial" ? "Partial" : "Absent"}
              </p>
              <p className="text-xs text-muted-foreground">Status</p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" /> AI Analysis
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Joined at: {sessions[0]?.joinTime.toLocaleTimeString()}</li>
              <li>• Left at: {sessions[sessions.length - 1]?.leaveTime?.toLocaleTimeString()}</li>
              <li>• Total duration: {result.totalMinutes} minutes out of {currentMeeting.duration} minutes</li>
              <li>• Attendance formula: floor({result.totalMinutes} / 60) = {result.units} unit(s)</li>
              {result.totalMinutes < 60 && <li className="text-destructive">• ⚠ Less than 60 minutes — no attendance credited</li>}
            </ul>
          </div>

          <Button onClick={() => { setShowResult(false); setCurrentMeeting(null); }}>
            Back to Meetings
          </Button>
        </div>
      </div>
    );
  }

  // In-meeting view
  if (inMeeting && currentMeeting) {
    const pct = Math.min((elapsed / (currentMeeting.duration * 60)) * 100, 100);
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Video area */}
          <div className="relative bg-black aspect-video flex items-center justify-center">
            {cameraOn ? (
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">SP</span>
                </div>
                <p className="text-white/70 text-sm">Camera Active</p>
              </div>
            ) : (
              <VideoOff className="w-16 h-16 text-white/30" />
            )}

            {/* Meeting info overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge variant="destructive" className="animate-pulse">● LIVE</Badge>
              <span className="text-white/80 text-sm">{currentMeeting.subject}</span>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-white font-mono text-sm">{formatTime(elapsed)}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/60 text-xs">Attendance progress</span>
                <span className="text-white/60 text-xs ml-auto">{Math.round(pct)}%</span>
              </div>
              <Progress value={pct} className="h-1.5" />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>0 min (0 units)</span>
                <span>60 min (1 unit)</span>
                <span>120 min (2 units)</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 flex items-center justify-center gap-3">
            <Button variant={micOn ? "outline" : "destructive"} size="icon" onClick={() => setMicOn(!micOn)}>
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button variant={cameraOn ? "outline" : "destructive"} size="icon" onClick={() => setCameraOn(!cameraOn)}>
              {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <Button variant="outline" size="icon">
              <MonitorUp className="w-5 h-5" />
            </Button>
            <Button variant="destructive" onClick={leaveMeeting} className="gap-2 ml-4">
              <LogOut className="w-4 h-4" /> Leave Meeting
            </Button>
          </div>

          {/* AI tracking info */}
          <div className="border-t border-border p-3 bg-muted/30 flex items-center gap-2 text-xs text-muted-foreground">
            <Brain className="w-4 h-4 text-primary" />
            <span>AI Attendance is tracking your session — stay for 60+ min for 1 unit, 120 min for 2 units</span>
          </div>
        </div>
      </div>
    );
  }

  // Meeting list
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Live Meetings</h1>
        <p className="text-muted-foreground">Join lectures — AI tracks your attendance automatically</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Video} label="Today's Meetings" value="3" />
        <StatCard icon={Clock} label="Total Hours" value="6h" />
        <StatCard icon={Brain} label="AI Tracked" value="100%" trend="All sessions" trendUp />
        <StatCard icon={CheckCircle2} label="Avg Units" value="1.5" />
      </div>

      {/* Available Meetings */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Available Meetings</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {availableMeetings.map((m) => (
          <div key={m.id} className="bg-card rounded-xl border border-border p-5 relative overflow-hidden">
            {m.status === "live" && <div className="absolute top-0 left-0 right-0 h-1 bg-destructive animate-pulse" />}
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display font-semibold text-foreground">{m.subject}</h3>
              <Badge variant={m.status === "live" ? "destructive" : "secondary"}>
                {m.status === "live" ? "● LIVE" : "Upcoming"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{m.topic}</p>
            <p className="text-xs text-muted-foreground mb-1">{m.teacher}</p>
            <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {m.scheduledTime} ({m.duration} min)
            </p>
            <Button
              size="sm" className="w-full gap-2"
              disabled={m.status !== "live"}
              onClick={() => joinMeeting(m)}
            >
              <Video className="w-4 h-4" /> {m.status === "live" ? "Join Meeting" : "Not Started"}
            </Button>
          </div>
        ))}
      </div>

      {/* AI Attendance History */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <Brain className="w-5 h-5 text-primary" /> AI Attendance History
      </h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Subject</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Time Spent</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Total</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Units</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {pastAttendance.map((a, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{a.subject}</td>
                <td className="p-3 text-muted-foreground">{a.date}</td>
                <td className="p-3 text-muted-foreground">{a.attended} min</td>
                <td className="p-3 text-muted-foreground">{a.total} min</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    a.units >= 2 ? "bg-accent/10 text-accent" : a.units === 1 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  }`}>{a.units}</span>
                </td>
                <td className="p-3">
                  {a.units >= 2 ? <CheckCircle2 className="w-4 h-4 text-accent" /> :
                   a.units === 1 ? <AlertTriangle className="w-4 h-4 text-warning" /> :
                   <AlertTriangle className="w-4 h-4 text-destructive" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLiveMeeting;
