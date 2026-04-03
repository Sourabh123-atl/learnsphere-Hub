import { Bot, Brain, Video, Award, BarChart3, BookOpen, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Video, title: "Live Lectures", desc: "Join interactive live sessions with screen sharing and real-time chat." },
  { icon: Brain, title: "AI Attendance", desc: "Automated attendance tracking based on join time and session duration." },
  { icon: Bot, title: "AI Doubt Solver", desc: "Get instant answers from an AI chatbot trained on your course materials." },
  { icon: BookOpen, title: "Smart Courses", desc: "Semester-based course recommendations powered by machine learning." },
  { icon: Award, title: "Auto Certificates", desc: "Earn verified digital certificates upon course completion." },
  { icon: BarChart3, title: "Analytics", desc: "Track learning progress, attendance trends, and quiz performance." },
  { icon: ShieldCheck, title: "Secure Platform", desc: "Role-based access, encrypted data, and secure authentication." },
  { icon: Users, title: "3 Dashboards", desc: "Dedicated portals for Students, Teachers, and Admins." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            Powerful Features for Modern Learning
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a complete AI-powered educational experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl bg-background card-hover border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
