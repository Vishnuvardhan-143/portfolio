import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Highly optimized, rich dataset of conversational intents
const intents = [
  {
    id: 'bio',
    keywords: ['who are you', 'about yourself', 'bio', 'tell me about you', 'introduce', 'who is vizz', 'name', 'profile', 'vishnu', 'annareddy', 'background', 'yourself'],
    exactMatches: ['who is vizz', 'who are you', 'tell me about yourself', 'about you', 'introduce yourself', 'bio'],
    answer: "I am Annareddy Venkata Vishnuvardhan Reddy (nickname Vizz), a highly driven Computer Science student and Systems Engineer. My expertise lies in architecting secure Spring Boot microservices, building big data pipelines with PySpark, and theoretical systems computing (securing AIR 5005 in GATE CSE 2025). I love building high-performance systems that scale!"
  },
  {
    id: 'gate',
    keywords: ['gate', 'rank', 'air', 'score', 'exam', 'percentile', '5005', '543', 'compilers', 'theory', 'succeed', 'gate cse'],
    exactMatches: ['gate rank', 'gate 2025', 'air 5005', 'gate exam', 'gate score'],
    answer: "Vizz achieved an exceptional milestone in GATE CSE 2025, securing All India Rank (AIR) 5005 with a score of 543 under rigorous nationwide competition. This achievement validates his absolute authority on core computer science theoretical subjects, including algorithms, compiler design, operating systems, and computation models."
  },
  {
    id: 'mphasis',
    keywords: ['mphasis', 'intern', 'banking platform', 'work', 'experience', 'role', 'bank', 'job', 'mphasis limited', 'internship', 'banking'],
    exactMatches: ['mphasis intern', 'work at mphasis', 'internship details'],
    answer: "During his Software Engineer Internship at Mphasis Limited (Jan - Apr 2026), Vizz designed and engineered a production-ready microservices banking system using Spring Boot and Java. He orchestrated 4 independent services (Auth, Accounts, Transactions, Admin) with secure JWT + TOTP MFA authentication, high concurrency databases, and inter-service transactions protected by distributed Saga compensation orchestrations."
  },
  {
    id: 'aegis',
    keywords: ['aegis', 'capital', 'banking project', 'spring boot', 'microservice', 'distributed', 'java project', 'saga', 'rollback', 'locking', 'version'],
    exactMatches: ['aegis capital', 'banking platform', 'microservice project'],
    answer: "Aegis Capital is Vizz's crown-jewel distributed banking platform engineered in Spring Boot (Java). Key architectural details include:\n\n• **Orchestration**: 4 modular microservices structured in Docker containers.\n• **Consistency**: Simplified Saga Pattern in the Transaction service with automated compensating rollbacks to guarantee absolute ACID properties across nodes.\n• **Concurrency**: JPA Optimistic Locking (@Version) on accounts to prevent balance drift under concurrent transactions.\n• **Security**: Dual-factor verification on external transfers via secure REST APIs with JWT and BCrypt hashing."
  },
  {
    id: 'pyspark',
    keywords: ['pyspark', 'data cleaning', 'csv', 'pipeline', 'databricks', 'big data', 'delta lake', 'parquet', 'imputation', 'outliers', 'iqr', 'widget'],
    exactMatches: ['pyspark pipeline', 'data cleaning pipeline', 'big data pipeline'],
    answer: "Vizz engineered an enterprise-scale PySpark Data Cleaning Pipeline on Databricks. The pipeline cleanses and normalizes messy real-world CSV files automatically by:\n\n• Detecting schemas dynamically and enforcing type casting.\n• Resolving missing values via configurable imputation strategies (mean, median, mode, or drop).\n• Filtering multivariate outliers using robust IQR (Interquartile Range) algorithms.\n• Exporting optimized logs and records into Delta Lake and Parquet formats, controlled interactively via custom Databricks widgets."
  },
  {
    id: 'lifeadmin',
    keywords: ['life admin', 'admin ai', 'life-admin-ai', 'chaos manager', 'task extraction', 'supabase', 'gemini 2.0', 'gemini 2.0 flash', 'python', 'fastapi'],
    exactMatches: ['life admin ai', 'admin ai', 'life-admin-ai', 'chaos manager'],
    answer: "Life Admin AI is Vizz's AI-powered personal chaos manager. Key features include:\n\n• **Task Extraction**: Uses Google Gemini 2.0 Flash to analyze unstructured inputs (emails, files) and automatically extract actionable items.\n• **Priority Score**: Employs an intelligent weighting model using deadlines, AI confidence, and domain urgency (e.g. finance, legal).\n• **Full-Stack Stack**: Built with a FastAPI/Python backend, a React 18/Vite 6 frontend, Zustand state management, and Supabase integration (Auth, PostgreSQL, and Storage)."
  },
  {
    id: 'education',
    keywords: ['education', 'sastra', 'university', 'college', 'cgpa', 'gpa', 'marks', 'score', 'intermediate', 'chaitanya', 'school', 'academics', 'thanjavur', 'study'],
    exactMatches: ['academic performance', 'college cgpa', 'where do you study', 'where did you study', 'education background'],
    answer: "Vizz has a phenomenal academic record:\n\n• **B.Tech in CSE**: SASTRA Deemed University (Oct 2022 - May 2026), maintaining a stellar Cumulative GPA of **9.19 / 10**.\n• **Intermediate Board**: Sri Chaitanya Junior College (Vijayawada), scoring an outstanding **97.3%** and achieving a **95.07 percentile** in the national JEE Mains exam."
  },
  {
    id: 'skills',
    keywords: ['skills', 'tech stack', 'technologies', 'languages', 'frameworks', 'databases', 'devops', 'tools', 'java', 'cpp', 'python', 'sql', 'react', 'docker', 'mongodb', 'git', 'github', 'dsa', 'oops', 'dbms', 'os', 'ml'],
    exactMatches: ['technical skills', 'programming languages', 'technologies you know', 'tech stack'],
    answer: "Vizz's comprehensive technical toolkit covers:\n\n• **Programming**: Java (Expert), C++ (Expert DSA), Python (ML/Big Data), SQL (Advanced).\n• **Frameworks**: Spring Boot (Expert microservices backend), Node.js, ReactJS (Tailwind UI).\n• **Databases**: PostgreSQL, MySQL, MongoDB.\n• **DevOps & Infrastructure**: Docker, Docker Compose, Git & GitHub.\n• **Systems Engineering**: OOPs design, Database Normalization, Operating Systems threads, and Machine Learning algorithms."
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'mail', 'address', 'location', 'linkedin', 'github', 'resume', 'hire', 'locate', 'location', 'proddatur', 'kadapa', 'india'],
    exactMatches: ['how to contact', 'get in touch', 'email address', 'phone number'],
    answer: "You can easily connect with Vizz directly through these channels:\n\n• ✉️ **Primary Email**: vishnuvardhan5770648@gmail.com\n• ✉️ **University Email**: 126003026@sastra.ac.in\n• 📞 **Phone**: +91 8331950911\n• 📂 **Location**: Proddatur, Kadapa, Andhra Pradesh, India\n• 🔗 **LinkedIn**: linkedin.com/in/vishnu-annareddy-267009285\n• 🔗 **GitHub**: github.com/Vishnuvardhan-143\n\nHe is fully available for technical roles, software engineering interviews, and collaborations!"
  },
  {
    id: 'hobbies',
    keywords: ['hobbies', 'interests', 'free time', 'extracurricular', 'sports', 'play', 'music', 'beyond coding', 'hobby', 'relax', 'leetcode'],
    exactMatches: ['what do you do in your free time', 'your hobbies', 'hobby details'],
    answer: "Outside of professional systems engineering, Vizz is a highly competitive problem-solver. He spends his free time solving advanced algorithmic challenges on LeetCode to sharpen his mathematical reasoning. He also enjoys reading technical architecture blogs, researching the latest releases in distributed database technologies, and gaming."
  },
  {
    id: 'hire',
    keywords: ['why hire', 'hire', 'strengths', 'why you', 'advantages', 'value', 'benefits', 'suitable', 'fit', 'salary', 'roles', 'full-time'],
    exactMatches: ['why should we hire you', 'why are you a good fit', 'job opening'],
    answer: "Vizz is an outstanding addition to any systems-focused engineering team because of his unique combination of:\n\n1. **Theoretical Strength**: AIR 5005 in GATE CSE 2025, validating a mastery of OS, algorithms, database internals, and compiler theory.\n2. **Production-grade Skills**: Hands-on internship experience at Mphasis building robust Java Spring Boot banking microservices and complex Saga rollbacks.\n3. **Scale Competency**: Engineered automated big data workflows using PySpark and Databricks Delta architectures.\n4. **High Integrity**: Stellar 9.19 academic CGPA showing consistency and exceptional work ethic."
  },
  {
    id: 'greetings',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'how are you', 'good morning', 'good afternoon', 'sup', 'yo', 'hello there'],
    exactMatches: ['hello there', 'how are you doing'],
    answer: "Hello! I'm Vishnu's AI representative. How can I help you explore his computer science credentials, Aegis Capital banking platform, GATE CSE rank, or Spring Boot expertise today? 😊"
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'awesome', 'great', 'cool', 'perfect', 'helpful', 'ty', 'appreciate'],
    exactMatches: ['thank you so much', 'thanks a lot'],
    answer: "You are highly welcome! I'm glad I could help. Let me know if there's anything else about Vizz's technical projects or academic milestones that you'd like to explore. Have a wonderful day!"
  }
];

// Contextual NLP parsing scoring engine
const getBotResponse = (query) => {
  const q = query.toLowerCase().trim();
  let bestIntent = null;
  let highestScore = 0;

  intents.forEach(intent => {
    let score = 0;
    
    // Check exact phrase matches (High weight)
    intent.exactMatches.forEach(phrase => {
      if (q.includes(phrase)) {
        score += 20;
      }
    });

    // Check individual keyword matches (Medium weight)
    intent.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b|${keyword}`, 'gi');
      const matches = q.match(regex);
      if (matches) {
        score += matches.length * 4;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  });

  // If score is above 0, return matched intent
  if (highestScore > 0 && bestIntent) {
    return bestIntent.answer;
  }

  // Technology specific fallback routing
  const techKeywords = ['spring boot', 'java', 'cpp', 'pyspark', 'databricks', 'docker', 'docker compose', 'mongodb', 'postgresql', 'react', 'tailwind', 'sql', 'fastapi', 'gemini', 'life admin', 'life-admin-ai'];
  const matchedTech = techKeywords.filter(tech => q.includes(tech));
  if (matchedTech.length > 0) {
    return `Vizz has direct, professional experience working with **${matchedTech.map(t => t.toUpperCase()).join(' & ')}**! \n\n• For his microservices backend work (using Java, Spring Boot, PostgreSQL, Docker), you can ask me about his project **Aegis Capital**.\n• For his generative AI work (using Google Gemini 2.0, FastAPI, Supabase), you can ask me about his project **Life Admin AI**.\n• For his big data work (using PySpark, Databricks, Delta Lake), you can ask me about his **PySpark Pipeline**.\n• Or type 'skills' to see his complete technical multi-language toolbox!`;
  }

  // Intelligent conversational fallback
  return "That is a great question! While my knowledge is focused on Vizz's professional engineering assets, I can tell you that he is highly skilled in Spring Boot microservices, Docker scaling, and Databricks PySpark pipelines. \n\nTo help you explore his profile, try asking me:\n1. *\"Tell me about Aegis Capital\"* (Distributed Banking Project)\n2. *\"What is his GATE Rank?\"* (Academic Distinctions)\n3. *\"What did he do at Mphasis?\"* (Internship Roles)\n4. *\"Show academic credentials\"* (CGPA & Intermediate results)";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hi there! I'm Vishnu, Vizz's AI representative. Ask me anything about his technical projects, GATE rank, work at Mphasis, or core engineering skills! ✨" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Tell me about GATE 2025",
    "What did you do at Mphasis?",
    "Explain Aegis Capital",
    "Show academic CGPA"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    // Process Bot Response with Organic Timing
    setTimeout(() => {
      const botResponse = getBotResponse(query);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Trigger Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-50 p-4 rounded-full bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal hover:bg-terracotta dark:hover:bg-orange-500 shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2 group pulse-badge"
          style={{ position: 'fixed', bottom: '24px', right: '24px', left: 'auto' }}
          aria-label="Open Chatbot"
        >
          <MessageSquare size={20} />
          <span className="text-[10px] font-black uppercase tracking-wider hidden sm:inline max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-550">
            Ask Vishnu!
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div 
          className="fixed z-50 w-full max-w-sm h-[500px] bg-[#f5f1e8] dark:bg-[#0c0c0c] rounded-3xl border border-zinc-900/10 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col justify-between animate-[fade-in-up_0.3s_ease_both]"
          style={{ position: 'fixed', bottom: '24px', right: '24px', left: 'auto' }}
        >
          
          {/* Header */}
          <div className="bg-zinc-950/2 dark:bg-white/2 border-b border-zinc-900/5 dark:border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-terracotta/10 text-terracotta dark:text-orange-500 animate-pulse">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="font-heading text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-1">
                  Vishnu AI
                </h4>
                <span className="text-[8px] font-black tracking-widest text-emerald-accent uppercase">
                  Online Representative
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-zinc-900/5 dark:hover:bg-white/5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
            {messages.map((m, idx) => {
              const isBot = m.sender === 'bot';
              return (
                <div 
                  key={idx} 
                  className={`flex gap-3 max-w-[85%] ${
                    isBot ? 'self-start' : 'self-end ml-auto flex-row-reverse'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 h-fit ${
                    isBot ? 'bg-zinc-900/5 dark:bg-white/5 text-terracotta dark:text-orange-500' : 'bg-terracotta/10 text-terracotta'
                  }`}>
                    {isBot ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                    isBot 
                      ? 'bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/5 dark:border-white/5 text-zinc-700 dark:text-zinc-300' 
                      : 'bg-zinc-950 text-beige dark:bg-[#f5f1e8] dark:text-charcoal'
                  } whitespace-pre-line`}>
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Premium Dynamic Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%] self-start animate-pulse">
                <div className="p-2 rounded-xl shrink-0 h-fit bg-zinc-900/5 dark:bg-white/5 text-terracotta dark:text-orange-500">
                  <Bot size={14} />
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/5 dark:border-white/5 text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 py-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length === 1 && !isTyping && (
            <div className="px-6 py-2 flex flex-wrap gap-1.5 bg-transparent justify-center">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-[8px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-md bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-4 border-t border-zinc-900/5 dark:border-white/5 bg-zinc-950/2 dark:bg-white/2">
            <form 
              onSubmit={e => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about GATE, Mphasis, projects..."
                className="flex-1 px-4 py-3 bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/10 dark:border-white/10 rounded-xl text-xs outline-none focus:border-terracotta dark:focus:border-orange-500 text-zinc-800 dark:text-[#f5f1e8] transition-colors"
              />
              <button
                type="submit"
                className="p-3 rounded-xl bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal hover:bg-terracotta dark:hover:bg-orange-500 dark:hover:text-charcoal transition-all duration-300 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}

