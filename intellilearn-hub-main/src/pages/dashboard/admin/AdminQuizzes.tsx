import { useState } from "react";
import { Target, Search, Trophy, Users, CheckCircle2, XCircle, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";

const quizData = [
  { id: 1, course: "Cloud Computing", title: "Cloud Fundamentals", totalQuestions: 20, attempts: 48, passRate: 82, avgScore: 74, topScore: 95, semester: 5 },
  { id: 2, course: "Machine Learning", title: "ML Basics Assessment", totalQuestions: 25, attempts: 45, passRate: 78, avgScore: 71, topScore: 100, semester: 5 },
  { id: 3, course: "Data Science", title: "DS Final Quiz", totalQuestions: 20, attempts: 52, passRate: 90, avgScore: 82, topScore: 98, semester: 5 },
  { id: 4, course: "Computer Networks", title: "Networking Concepts", totalQuestions: 15, attempts: 38, passRate: 65, avgScore: 58, topScore: 88, semester: 5 },
  { id: 5, course: "Data Structures", title: "DSA Fundamentals", totalQuestions: 30, attempts: 60, passRate: 85, avgScore: 76, topScore: 100, semester: 3 },
  { id: 6, course: "Operating Systems", title: "OS Concepts Quiz", totalQuestions: 20, attempts: 55, passRate: 72, avgScore: 68, topScore: 92, semester: 4 },
];

const studentResults = [
  { name: "Sourabh Patel", course: "Cloud Computing", score: 85, status: "pass", time: "8m 30s", date: "Mar 21" },
  { name: "Priya Sharma", course: "Data Science", score: 92, status: "pass", time: "12m 15s", date: "Mar 21" },
  { name: "Rahul Kumar", course: "Machine Learning", score: 45, status: "fail", time: "15m 00s", date: "Mar 20" },
  { name: "Anita Desai", course: "Cloud Computing", score: 78, status: "pass", time: "9m 45s", date: "Mar 20" },
  { name: "Vikram Singh", course: "Computer Networks", score: 35, status: "fail", time: "7m 20s", date: "Mar 20" },
  { name: "Meera Joshi", course: "Data Structures", score: 88, status: "pass", time: "18m 10s", date: "Mar 19" },
  { name: "Rohit Mishra", course: "Machine Learning", score: 62, status: "pass", time: "14m 55s", date: "Mar 19" },
  { name: "Kavita Rao", course: "Operating Systems", score: 55, status: "fail", time: "11m 30s", date: "Mar 18" },
];

const AdminQuizzes = () => {
  const [search, setSearch] = useState("");
  const filtered = studentResults.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase())
  );

  const totalAttempts = quizData.reduce((a, q) => a + q.attempts, 0);
  const overallPassRate = Math.round(quizData.reduce((a, q) => a + q.passRate, 0) / quizData.length);
  const overallAvgScore = Math.round(quizData.reduce((a, q) => a + q.avgScore, 0) / quizData.length);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Quiz Management</h1>
          <p className="text-muted-foreground">Monitor quiz performance across all courses</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export Results</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Target} label="Total Quizzes" value={`${quizData.length}`} />
        <StatCard icon={Users} label="Total Attempts" value={`${totalAttempts}`} trend="+45 this week" trendUp />
        <StatCard icon={Trophy} label="Pass Rate" value={`${overallPassRate}%`} trend="+4%" trendUp />
        <StatCard icon={BarChart3} label="Avg Score" value={`${overallAvgScore}%`} />
      </div>

      {/* Quiz Overview Cards */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Quiz Performance Overview</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quizData.map((q) => (
          <div key={q.id} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground text-sm">{q.title}</h3>
                <p className="text-xs text-muted-foreground">{q.course} • Sem {q.semester}</p>
              </div>
              <Badge variant={q.passRate >= 75 ? "default" : "destructive"} className="text-xs">
                {q.passRate}% pass
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mb-3">
              <div className="bg-muted rounded-lg p-2">
                <p className="text-sm font-bold text-foreground">{q.attempts}</p>
                <p className="text-xs text-muted-foreground">Attempts</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <p className="text-sm font-bold text-foreground">{q.avgScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <p className="text-sm font-bold text-accent">{q.topScore}%</p>
                <p className="text-xs text-muted-foreground">Top Score</p>
              </div>
            </div>
            <Progress value={q.passRate} className="h-2" />
          </div>
        ))}
      </div>

      {/* Recent Student Results */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Recent Student Results</h2>
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or course..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Course</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Score</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Time Taken</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3 text-muted-foreground">{s.course}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${s.score >= 60 ? "text-accent" : "text-destructive"}`}>{s.score}%</span>
                  </td>
                  <td className="p-3">
                    <Badge variant={s.status === "pass" ? "default" : "destructive"}>
                      {s.status === "pass" ? <><CheckCircle2 className="w-3 h-3 mr-1" />Pass</> : <><XCircle className="w-3 h-3 mr-1" />Fail</>}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">{s.time}</td>
                  <td className="p-3 text-muted-foreground">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizzes;
