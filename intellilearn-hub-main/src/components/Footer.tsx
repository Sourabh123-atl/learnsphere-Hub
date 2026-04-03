import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="py-12 bg-foreground text-background/70">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-background">EduAI</span>
        </div>
        <p className="text-sm">© 2026 EduAI Platform. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
