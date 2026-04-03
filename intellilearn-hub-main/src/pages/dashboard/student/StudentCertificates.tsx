import { Award, Download, ExternalLink, QrCode, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

const earnedCertificates = [
  {
    id: "CC-2026-7845", course: "Cloud Computing Fundamentals", instructor: "Dr. Sharma",
    completionDate: "Feb 15, 2026", grade: "A", score: 92,
  },
  {
    id: "DS-2026-3291", course: "Python for Data Science", instructor: "Dr. Gupta",
    completionDate: "Jan 28, 2026", grade: "A+", score: 97,
  },
];

const inProgressCourses = [
  { course: "Machine Learning", progress: 45, quizUnlocked: false, teacher: "Prof. Verma" },
  { course: "Computer Networks", progress: 30, quizUnlocked: false, teacher: "Prof. Singh" },
  { course: "Data Science Advanced", progress: 88, quizUnlocked: true, teacher: "Dr. Gupta" },
];

const StudentCertificates = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Certificates</h1>
      <p className="text-muted-foreground">Your achievements and certifications</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard icon={Award} label="Certificates Earned" value="2" trend="Keep learning!" trendUp />
      <StatCard icon={CheckCircle} label="Courses Completed" value="2" />
      <StatCard icon={Lock} label="Quizzes Available" value="1" trend="Complete course to unlock" />
    </div>

    {/* Earned Certificates */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
      <Award className="w-5 h-5 text-primary" /> Earned Certificates
    </h2>
    <div className="grid md:grid-cols-2 gap-6 mb-10">
      {earnedCertificates.map((cert) => (
        <div key={cert.id} className="bg-card rounded-xl border border-border overflow-hidden card-hover">
          {/* Certificate preview */}
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 p-8 text-center border-b border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Certificate of Completion</p>
            <h3 className="font-display font-bold text-foreground text-lg mb-1">{cert.course}</h3>
            <p className="text-sm text-muted-foreground">Awarded to <span className="font-medium text-foreground">Sourabh Patel</span></p>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Instructor</p>
                <p className="font-medium text-foreground">{cert.instructor}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{cert.completionDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Grade</p>
                <p className="font-medium text-foreground">{cert.grade} ({cert.score}%)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Certificate ID</p>
                <p className="font-medium text-foreground text-xs">{cert.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 gap-2"><Download className="w-3 h-3" /> Download PDF</Button>
              <Button size="sm" variant="outline" className="gap-2"><QrCode className="w-3 h-3" /> Verify</Button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* In Progress */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-4">In Progress</h2>
    <div className="grid sm:grid-cols-3 gap-4">
      {inProgressCourses.map((c) => (
        <div key={c.course} className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-1">{c.course}</h3>
          <p className="text-xs text-muted-foreground mb-3">{c.teacher}</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
            </div>
            <span className="text-xs font-medium text-foreground">{c.progress}%</span>
          </div>
          {c.quizUnlocked ? (
            <Button size="sm" className="w-full">Take Quiz</Button>
          ) : (
            <Button size="sm" variant="outline" className="w-full gap-2" disabled>
              <Lock className="w-3 h-3" /> Complete Course First
            </Button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default StudentCertificates;
