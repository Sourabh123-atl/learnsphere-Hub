import { useState, useEffect } from "react";
import { Users, Search, Mail, Ban, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department: string | null;
  semester: number | null;
  specialization: string | null;
  approved: boolean;
  created_at: string;
}

const AdminStudents = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setProfiles((data as Profile[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const handleApprove = async (id: string) => {
    await supabase.from("profiles").update({ approved: true }).eq("id", id);
    toast({ title: "User Approved" });
    fetchProfiles();
  };

  const handleDelete = async (id: string) => {
    // We can only delete the profile; auth user deletion requires admin API
    await supabase.from("profiles").delete().eq("id", id);
    toast({ title: "User Removed" });
    fetchProfiles();
  };

  const students = profiles.filter((p) => p.role === "student");
  const teachers = profiles.filter((p) => p.role === "teacher");
  const pendingTeachers = teachers.filter((t) => !t.approved);
  const filtered = profiles.filter(
    (p) => p.full_name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()) || p.role.includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground">View and manage all registered users</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Users" value={String(profiles.length)} />
        <StatCard icon={CheckCircle} label="Students" value={String(students.length)} />
        <StatCard icon={Users} label="Teachers" value={String(teachers.length)} />
        <StatCard icon={ShieldCheck} label="Pending Approval" value={String(pendingTeachers.length)} />
      </div>

      {pendingTeachers.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> Pending Teacher Approvals
          </h2>
          <div className="space-y-3">
            {pendingTeachers.map((t) => (
              <div key={t.id} className="p-3 rounded-lg bg-muted flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.full_name}</p>
                  <p className="text-xs text-muted-foreground">{t.email} • {t.specialization || "N/A"}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(t.id)}>Approve</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(t.id)}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or role..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Dept/Spec</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No users found</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium text-foreground">{p.full_name}</td>
                    <td className="p-3 text-muted-foreground">{p.email}</td>
                    <td className="p-3"><Badge variant="secondary" className="capitalize">{p.role}</Badge></td>
                    <td className="p-3 text-muted-foreground">{p.department || p.specialization || "—"}</td>
                    <td className="p-3">
                      <Badge variant={p.approved ? "default" : "destructive"}>
                        {p.approved ? "Active" : "Pending"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {!p.approved && (
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => handleApprove(p.id)}>
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-destructive" onClick={() => handleDelete(p.id)}>
                          <Ban className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
