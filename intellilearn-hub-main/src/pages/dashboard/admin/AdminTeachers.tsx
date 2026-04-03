import { UserCheck, Search, CheckCircle, XCircle, Clock, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";

const teachers = [
  { id: 1, name: "Dr. Sharma", email: "sharma@edu.com", subject: "Cloud Computing", qualification: "PhD CS", students: 52, courses: 2, status: "approved", joinedDate: "Jan 2024" },
  { id: 2, name: "Prof. Verma", email: "verma@edu.com", subject: "Machine Learning", qualification: "PhD AI", students: 48, courses: 1, status: "approved", joinedDate: "Mar 2024" },
  { id: 3, name: "Dr. Gupta", email: "gupta@edu.com", subject: "Data Science", qualification: "PhD Statistics", students: 56, courses: 2, status: "approved", joinedDate: "Jun 2024" },
  { id: 4, name: "Prof. Singh", email: "singh@edu.com", subject: "Computer Networks", qualification: "MTech Networks", students: 45, courses: 1, status: "approved", joinedDate: "Aug 2024" },
  { id: 5, name: "Prof. Anita Desai", email: "adesai@edu.com", subject: "Artificial Intelligence", qualification: "PhD AI", students: 0, courses: 0, status: "pending", joinedDate: "Mar 2026" },
  { id: 6, name: "Dr. Rahul Kumar", email: "rkumar@edu.com", subject: "Cyber Security", qualification: "PhD Security", students: 0, courses: 0, status: "pending", joinedDate: "Mar 2026" },
];

const AdminTeachers = () => {
  const [search, setSearch] = useState("");
  const filtered = teachers.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));
  const pending = filtered.filter((t) => t.status === "pending");
  const approved = filtered.filter((t) => t.status === "approved");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Manage Teachers</h1>
        <p className="text-muted-foreground">Approve registrations and manage faculty</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={UserCheck} label="Total Teachers" value="42" />
        <StatCard icon={CheckCircle} label="Approved" value="40" />
        <StatCard icon={Clock} label="Pending Approval" value="2" trend="Review now" />
        <StatCard icon={Shield} label="Departments" value="8" />
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search teachers..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <>
          <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" /> Pending Approval ({pending.length})
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {pending.map((t) => (
              <div key={t.id} className="bg-card rounded-xl border-2 border-warning/30 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-sm font-bold text-warning">{t.name.charAt(0)}</div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{t.name}</h3>
                      <p className="text-xs text-muted-foreground">{t.email}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <div>Subject: <span className="text-foreground font-medium">{t.subject}</span></div>
                  <div>Qualification: <span className="text-foreground font-medium">{t.qualification}</span></div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gap-1"><CheckCircle className="w-3 h-3" /> Approve</Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1 text-destructive"><XCircle className="w-3 h-3" /> Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Approved */}
      <h2 className="text-lg font-display font-semibold text-foreground mb-3">Approved Teachers</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Subject</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Qualification</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Students</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Courses</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{t.name}</td>
                  <td className="p-3 text-muted-foreground">{t.subject}</td>
                  <td className="p-3 text-muted-foreground">{t.qualification}</td>
                  <td className="p-3 text-foreground">{t.students}</td>
                  <td className="p-3 text-foreground">{t.courses}</td>
                  <td className="p-3 text-muted-foreground">{t.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;
