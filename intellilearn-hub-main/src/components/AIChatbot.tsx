import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const sampleResponses: Record<string, string> = {
  default: "I'm your AI learning assistant! I can help you understand concepts from your courses. Try asking me about any topic you're studying.",
  "machine learning": "**Machine Learning** is a subset of AI where systems learn patterns from data without being explicitly programmed.\n\n**Key types:**\n- **Supervised Learning** – Learns from labeled data\n- **Unsupervised Learning** – Finds hidden patterns\n- **Reinforcement Learning** – Learns through trial & reward",
  "cloud computing": "**Cloud Computing** delivers computing services—servers, storage, databases, networking—over the internet.\n\n**Service Models:**\n- **IaaS** – Infrastructure (e.g., AWS EC2)\n- **PaaS** – Platform (e.g., Heroku)\n- **SaaS** – Software (e.g., Google Docs)",
  "data mining": "**Data Mining** is the process of discovering patterns and knowledge from large datasets using statistical and computational techniques.\n\n**Common techniques:** Classification, Clustering, Association Rules, Regression.",
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hi! I'm your AI study assistant. Did you understand today's lecture? Ask me any doubt!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const lowerInput = input.toLowerCase();
    const matchedKey = Object.keys(sampleResponses).find((k) => lowerInput.includes(k));
    const response = sampleResponses[matchedKey || "default"];
    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: response }]);
    setInput("");
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <Bot className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col"
            style={{ height: 480 }}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-primary flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-primary-foreground">AI Doubt Assistant</p>
                <p className="text-xs text-primary-foreground/70">Powered by AI • Always available</p>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-primary-foreground/70 hover:text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a doubt..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
