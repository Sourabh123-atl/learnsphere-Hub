import { useState } from "react";
import { Bot, Send, Sparkles, BookOpen, Brain, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "ai";
  text: string;
}

const quickTopics = [
  { label: "Machine Learning", icon: Brain, question: "Explain the difference between supervised and unsupervised learning." },
  { label: "Cloud Computing", icon: Sparkles, question: "What is serverless architecture and when should I use it?" },
  { label: "Data Science", icon: BookOpen, question: "How does linear regression work?" },
  { label: "Study Tips", icon: Lightbulb, question: "Give me a study plan for my upcoming exams." },
];

const aiResponses: Record<string, string> = {
  "supervised": "**Supervised Learning** uses labeled training data to learn a mapping from inputs to outputs. Examples: classification, regression.\n\n**Unsupervised Learning** finds hidden patterns in unlabeled data. Examples: clustering, dimensionality reduction.\n\nKey difference: supervised needs labeled data, unsupervised doesn't.",
  "serverless": "**Serverless Architecture** lets you build and run applications without managing servers. The cloud provider handles infrastructure scaling automatically.\n\n**When to use it:**\n- Event-driven workloads\n- APIs with variable traffic\n- Microservices\n- Cost-sensitive applications (pay per execution)\n\nExamples: AWS Lambda, Google Cloud Functions, Azure Functions.",
  "regression": "**Linear Regression** models the relationship between a dependent variable (y) and one or more independent variables (x) by fitting a linear equation:\n\n`y = mx + b`\n\nwhere:\n- **m** = slope (coefficient)\n- **b** = y-intercept\n\nThe algorithm minimizes the sum of squared errors between predicted and actual values (Least Squares Method).",
  "study": "Here's a **study plan** for your exams:\n\n1. **Week 1:** Review all lecture notes and highlight key concepts\n2. **Week 2:** Practice problems and past papers\n3. **Week 3:** Focus on weak areas identified in practice\n4. **Week 4:** Revision and mock tests\n\n**Daily routine:**\n- 2 hours focused study\n- 30 min break\n- 1 hour practice problems\n- Review notes before sleep",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(aiResponses)) {
    if (lower.includes(key)) return value;
  }
  return `Great question! Here's what I know about "${input}":\n\nThis topic is covered in your course materials. I'd recommend reviewing the relevant lecture notes and slides. If you need more help, try breaking your question into smaller parts.\n\n**Need more help?** Try asking about specific concepts like "machine learning", "cloud computing", or "regression".`;
}

const StudentAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi Sourabh! 👋 I'm your AI learning assistant. I can help you understand lecture concepts, solve doubts, and create study plans.\n\nWhat would you like to learn about today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    const aiMsg: Message = { role: "ai", text: getAIResponse(text) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">AI Assistant</h1>
        <p className="text-muted-foreground">Ask doubts, get explanations, and create study plans</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-2">Quick Topics</h3>
          {quickTopics.map((t) => (
            <button
              key={t.label}
              onClick={() => sendMessage(t.question)}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-card border border-border text-left hover:bg-muted transition-colors card-hover"
            >
              <t.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Chat */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border flex flex-col h-[600px]">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">EduAI Assistant</p>
              <p className="text-xs text-accent">● Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your courses..."
                className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAI;
