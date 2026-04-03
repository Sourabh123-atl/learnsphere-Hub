import { FileBarChart, Download, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";

const monthlyStats = [
  { month: "Jan", students: 1050, courses: 55, lectures: 210, certificates: 45 },
  { month: "Feb", students: 1140, courses: 60, lectures: 198, certificates: 62 },
  { month: "Mar", students: 1247, courses: 68, lectures: 220, certificates: 78 },
];

const topCourses = [
  { name: "Machine Learning", students: 148, completionRate: 82, rating: 4.9 },
  { name: "Cloud Computing", students: 135, completionRate: 78, rating: 4.8 },
  { name: "Data Science", students: 128, completionRate: 85, rating: 4.7 },
  { name: "Web Development", students: 112, completionRate: 90, rating: 4.6 },
  { name: "Cyber Security", students: 98, completionRate: 74, rating: 4.7 },
];

const departmentStats = [
  { name: "Computer Science", students: 480, teachers: 15, courses: 24 },
  { name: "Information Technology", students: 320, teachers: 10, courses: 18 },
  { name: "Electronics", students: 210, teachers: 8, courses: 14 },
  { name: "Mechanical", students: 120, teachers: 5, courses: 8 },
];

const AdminReports = () => (
  <div>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Platform insights and growth metrics</p>
      </div>
      <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export Report</Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Users} label="Total Users" value="1,289" trend="+107 this month" trendUp />
      <StatCard icon={BookOpen} label="Course Enrollments" value="3,420" trend="+18%" trendUp />
      <StatCard icon={TrendingUp} label="Completion Rate" value="74%" trend="+6%" trendUp />
      <StatCard icon={Award} label="Certificates Issued" value="185" trend="+78 this month" trendUp />
    </div>

    {/* Monthly Growth */}
    <h2 className="text-lg font-display font-semibold text-foreground mb-3">Monthly Growth</h2>
    <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Month</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Students</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Courses</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Lectures</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Certificates</th>
            </tr>
          </thead>
          <tbody>
            {monthlyStats.map((m) => (
              <tr key={m.month} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium text-foreground">{m.month} 2026</td>
                <td className="p-3 text-foreground">{m.students.toLocaleString()}</td>
                <td className="p-3 text-foreground">{m.courses}</td>
                <td className="p-3 text-foreground">{m.lectures}</td>
                <td className="p-3 text-foreground">{m.certificates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Top Courses */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4">Top Courses by Enrollment</h2>
        <div className="space-y-4">
          {topCourses.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">{c.name}</span>
                  <span className="text-muted-foreground">{c.students} students</span>
                </div>
                <Progress value={c.completionRate} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Stats */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4">Department Overview</h2>
        <div className="space-y-4">
          {departmentStats.map((d) => (
            <div key={d.name} className="p-3 rounded-lg bg-muted">
              <h3 className="text-sm font-medium text-foreground mb-2">{d.name}</h3>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div><span className="block text-foreground font-medium">{d.students}</span> Students</div>
                <div><span className="block text-foreground font-medium">{d.teachers}</span> Teachers</div>
                <div><span className="block text-foreground font-medium">{d.courses}</span> Courses</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminReports;
