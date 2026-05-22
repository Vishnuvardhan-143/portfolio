import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Highly optimized, rich dataset of conversational intents
const intents = [
  {
    id: 'bio',
    keywords: ['who is vishnu', 'who is vizz', 'about vishnu', 'about vizz', 'who are you', 'about yourself', 'bio', 'tell me about you', 'introduce', 'name', 'profile', 'annareddy', 'background', 'yourself'],
    exactMatches: ['who is vizz', 'who is vishnu', 'who are you', 'tell me about yourself', 'about you', 'introduce yourself', 'bio', 'who is annareddy'],
    answer: "I am Annareddy Venkata Vishnuvardhan Reddy (nickname Vizz), a highly driven Computer Science student and Systems Engineer. My expertise lies in architecting secure Spring Boot microservices, building big data pipelines with PySpark, and theoretical systems computing (securing AIR 5005 in GATE CSE 2025). I love building high-performance systems that scale!"
  },
  {
    id: 'gate',
    keywords: ['gate', 'gate cse', 'gate 2025', 'air 5005', 'gate rank', 'gate score', 'gate exam', 'percentile', 'compilers', 'theory of computation', '5005', '543'],
    exactMatches: ['gate rank', 'gate 2025', 'air 5005', 'gate exam', 'gate score', 'what is his gate rank', 'tell me about his gate rank'],
    answer: "Vizz achieved an exceptional milestone in GATE CSE 2025, securing All India Rank (AIR) 5005 with a score of 543 under rigorous nationwide competition. This achievement validates his absolute authority on core computer science theoretical subjects, including algorithms, compiler design, operating systems, and computation models."
  },
  {
    id: 'mphasis',
    keywords: ['mphasis', 'mphasis limited', 'internship', 'intern', 'mphasis intern', 'work experience', 'experience', 'banking platform', 'microservices banking', 'saga pattern'],
    exactMatches: ['mphasis intern', 'work at mphasis', 'internship details', 'mphasis experience', 'mphasis role'],
    answer: "During his Software Engineer Internship at Mphasis Limited (Jan - Apr 2026), Vizz designed and engineered a production-ready microservices banking system using Spring Boot and Java. He orchestrated 4 independent services (Auth, Accounts, Transactions, Admin) with secure JWT + TOTP MFA authentication, high concurrency databases, and inter-service transactions protected by distributed Saga compensation orchestrations."
  },
  {
    id: 'aegis',
    keywords: ['aegis', 'aegis capital', 'banking project', 'spring boot microservices', 'distributed banking', 'saga pattern', 'jpa optimistic locking', 'version locking', 'compensating rollbacks'],
    exactMatches: ['aegis capital', 'banking platform', 'microservice project', 'aegis banking'],
    answer: "Aegis Capital is Vizz's crown-jewel distributed banking platform engineered in Spring Boot (Java). Key architectural details include:\n\n• **Orchestration**: 4 modular microservices structured in Docker containers.\n• **Consistency**: Simplified Saga Pattern in the Transaction service with automated compensating rollbacks to guarantee absolute ACID properties across nodes.\n• **Concurrency**: JPA Optimistic Locking (@Version) on accounts to prevent balance drift under concurrent transactions.\n• **Security**: Dual-factor verification on external transfers via secure REST APIs with JWT and BCrypt hashing."
  },
  {
    id: 'pyspark',
    keywords: ['pyspark', 'data cleaning', 'csv pipeline', 'databricks', 'big data', 'delta lake', 'parquet', 'imputation', 'outliers', 'iqr outliers', 'databricks widgets'],
    exactMatches: ['pyspark pipeline', 'data cleaning pipeline', 'big data pipeline', 'databricks pipeline'],
    answer: "Vizz engineered an enterprise-scale PySpark Data Cleaning Pipeline on Databricks. The pipeline cleanses and normalizes messy real-world CSV files automatically by:\n\n• Detecting schemas dynamically and enforcing type casting.\n• Resolving missing values via configurable imputation strategies (mean, median, mode, or drop).\n• Filtering multivariate outliers using robust IQR (Interquartile Range) algorithms.\n• Exporting optimized logs and records into Delta Lake and Parquet formats, controlled interactively via custom Databricks widgets."
  },
  {
    id: 'lifeadmin',
    keywords: ['life admin', 'life admin ai', 'personal chaos manager', 'task extraction', 'gemini 2.0', 'fastapi supabase', 'gemini 2.0 flash', 'supabase oauth', 'zustand state'],
    exactMatches: ['life admin ai', 'admin ai', 'life-admin-ai', 'chaos manager', 'personal chaos manager'],
    answer: "Life Admin AI is Vizz's AI-powered personal chaos manager. Key features include:\n\n• **Task Extraction**: Uses Google Gemini 2.0 Flash to analyze unstructured inputs (emails, files) and automatically extract actionable items.\n• **Priority Score**: Employs an intelligent weighting model using deadlines, AI confidence, and domain urgency (e.g. finance, legal).\n• **Full-Stack Stack**: Built with a FastAPI/Python backend, a React 18/Vite 6 frontend, Zustand state management, and Supabase integration (Auth, PostgreSQL, and Storage)."
  },
  {
    id: 'education',
    keywords: ['education', 'sastra', 'sastra university', 'cgpa', 'cumulative gpa', 'gpa', 'academic credentials', 'academics', 'intermediate board', 'sri chaitanya', 'jee mains', '9.19', '97.3%', '95.07 percentile'],
    exactMatches: ['academic performance', 'college cgpa', 'where do you study', 'where did you study', 'education background', 'cgpa score'],
    answer: "Vizz has a phenomenal academic record:\n\n• **B.Tech in CSE**: SASTRA Deemed University (Oct 2022 - May 2026), maintaining a stellar Cumulative GPA of **9.19 / 10**.\n• **Intermediate Board**: Sri Chaitanya Junior College (Vijayawada), scoring an outstanding **97.3%** and achieving a **95.07 percentile** in the national JEE Mains exam."
  },
  {
    id: 'skills',
    keywords: ['skills', 'tech stack', 'technologies', 'programming languages', 'frameworks', 'databases', 'devops', 'java', 'c++', 'python', 'sql', 'spring boot', 'reactjs', 'node.js', 'docker', 'docker compose', 'mongodb', 'postgresql', 'git', 'github', 'dsa', 'oops', 'dbms', 'operating systems', 'machine learning'],
    exactMatches: ['technical skills', 'programming languages', 'technologies you know', 'tech stack', 'what are your skills', 'skills list'],
    answer: "Vizz's comprehensive technical toolkit covers:\n\n• **Programming**: Java (Expert), C++ (Expert DSA), Python (ML/Big Data), SQL (Advanced).\n• **Frameworks**: Spring Boot (Expert microservices backend), Node.js, ReactJS (Tailwind UI).\n• **Databases**: PostgreSQL, MySQL, MongoDB.\n• **DevOps & Infrastructure**: Docker, Docker Compose, Git & GitHub.\n• **Systems Engineering**: OOPs design, Database Normalization, Operating Systems threads, and Machine Learning algorithms."
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach vishnu', 'reach vizz', 'linkedin', 'github profile', 'github link', 'leetcode link', 'vishnuvardhan5770648@gmail.com', '126003026@sastra.ac.in', '8331950911', 'proddatur', 'kadapa'],
    exactMatches: ['how to contact', 'get in touch', 'email address', 'phone number', 'social links', 'contact details'],
    answer: "You can easily connect with Vizz directly through these channels:\n\n• ✉️ **Primary Email**: vishnuvardhan5770648@gmail.com\n• ✉️ **University Email**: 126003026@sastra.ac.in\n• 📞 **Phone**: +91 8331950911\n• 📂 **Location**: Proddatur, Kadapa, Andhra Pradesh, India\n• 🔗 **LinkedIn**: linkedin.com/in/vishnu-annareddy-267009285\n• 🔗 **GitHub**: github.com/Vishnuvardhan-143\n\nHe is fully available for technical roles, software engineering interviews, and collaborations!"
  },
  {
    id: 'hobbies',
    keywords: ['hobbies', 'interests', 'free time', 'leetcode problem solving', 'algorithmic challenges', 'beyond coding', 'hobby', 'gaming', 'architecture blogs'],
    exactMatches: ['what do you do in your free time', 'your hobbies', 'hobby details', 'extracurricular activities'],
    answer: "Outside of professional systems engineering, Vizz is a highly competitive problem-solver. He spends his free time solving advanced algorithmic challenges on LeetCode to sharpen his mathematical reasoning. He also enjoys reading technical architecture blogs, researching the latest releases in distributed database technologies, and gaming."
  },
  {
    id: 'hire',
    keywords: ['why hire', 'hire', 'strengths', 'why should we hire', 'advantages', 'value add', 'suitable role', 'full-time engineering', 'engineering candidate'],
    exactMatches: ['why should we hire you', 'why are you a good fit', 'job opening', 'why hire vishnu'],
    answer: "Vizz is an outstanding addition to any systems-focused engineering team because of his unique combination of:\n\n1. **Theoretical Strength**: AIR 5005 in GATE CSE 2025, validating a mastery of OS, algorithms, database internals, and compiler theory.\n2. **Production-grade Skills**: Hands-on internship experience at Mphasis building robust Java Spring Boot banking microservices and complex Saga rollbacks.\n3. **Scale Competency**: Engineered automated big data workflows using PySpark and Databricks Delta architectures.\n4. **High Integrity**: Stellar 9.19 academic CGPA showing consistency and exceptional work ethic."
  },
  {
    id: 'journey',
    keywords: ['journey', 'roadmap', 'timeline', 'career path', 'milestones', 'professional path', 'chronology', 'career steps', 'phases'],
    exactMatches: ['career journey', 'professional roadmap', 'career timeline', 'milestones', 'journey steps'],
    answer: "Vishnu's professional and academic journey is structured into clear engineering phases:\n\n• **Phase 1: Genesis (C++/Python)**: Mastered syntax, logical frameworks, and solved 200+ computational algorithms.\n• **Phase 2: Acquisition (DSA)**: Mastered trees, graphs, sorting, searching, and runtime optimization.\n• **Phase 3: Academics**: Achieved 97.3% in Intermediate Board and a 95.07 percentile in JEE Mains.\n• **Phase 4: SASTRA University (2022 - 2026)**: Maintained a stellar Cumulative CGPA of **9.19 / 10** in B.Tech Computer Science.\n• **Phase 5: Distributed Data (PySpark)**: Engineered automated data cleaning pipelines using PySpark on Databricks Delta Lake.\n• **Phase 6: Enterprise Backend (Spring Boot)**: Architected robust Spring Boot JPA microservices.\n• **Phase 7-8: Internship & Security (Mphasis)**: Built a secure microservices banking system using Spring Boot, JWT, TOTP MFA, JPA Optimistic Locking, and Saga rollbacks.\n• **Phase 9: Validation**: Secured AIR 5005 in GATE CSE 2025 (Score 543), confirming expert command of CS fundamentals."
  },
  {
    id: 'chatbot',
    keywords: ['chatbot', 'portfolio bot', 'ai assistant', 'representative bot', 'who made this bot', 'how does this bot work', 'how is this bot built'],
    exactMatches: ['portfolio chatbot', 'about the chatbot', 'how does the bot work'],
    answer: "This conversational representative is Vishnu's custom portfolio chatbot! It operates as a zero-latency, local client-side intelligent routing engine built in React and integrated with his portfolio data. It is fully aware of his academic timeline, Spring Boot skills, GATE rank, and key projects (Aegis Capital, PySpark Clean Pipeline, Life Admin AI), answering queries instantly!"
  },
  {
    id: 'projects_list',
    keywords: ['projects', 'list projects', 'github repositories', 'built', 'developed', 'made', 'created', 'show projects', 'major projects'],
    exactMatches: ['projects list', 'what did he build', 'what has he developed', 'show portfolio projects'],
    answer: "Vishnu has engineered four major projects, showing a strong breadth in systems engineering, big data pipelines, and generative AI:\n\n1. 🏦 **Aegis Capital**: Distributed Spring Boot banking microservices using the Saga pattern for transaction reliability and JWT+TOTP MFA for security.\n2. 📊 **PySpark Data Cleaning Pipeline**: Automated CSV cleaning and schema enforcement engine running on Databricks Delta Lake.\n3. 🧠 **Life Admin AI**: A personal chaos manager backend built in FastAPI/Python, frontend in React, integrating Google Gemini 2.0 Flash and Supabase OAuth.\n4. 🤖 **Vishnu AI Assistant**: A custom conversational portfolio representative built in React.\n\nAsk me about any specific project (e.g., \"Tell me about Aegis Capital\") to learn more!"
  },
  {
    id: 'greetings',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'how are you', 'good morning', 'good afternoon', 'sup', 'yo', 'hello there'],
    exactMatches: ['hello there', 'how are you doing', 'good morning', 'hi there'],
    answer: "Hello! I'm Vishnu's AI representative. How can I help you explore his computer science credentials, Aegis Capital banking platform, GATE CSE rank, or Spring Boot expertise today? 😊"
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'awesome', 'great', 'cool', 'perfect', 'helpful', 'ty', 'appreciate'],
    exactMatches: ['thank you so much', 'thanks a lot', 'appreciate it'],
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
      const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      const matches = q.match(regex);
      if (matches) {
        score += matches.length * 6;
      } else if (q.includes(keyword)) {
        score += 2;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  });

  // If score is above threshold, return matched intent
  if (highestScore >= 4 && bestIntent) {
    return bestIntent.answer;
  }

  // Technology specific fallback routing
  const techKeywords = ['spring boot', 'java', 'cpp', 'pyspark', 'databricks', 'docker', 'docker compose', 'mongodb', 'postgresql', 'react', 'tailwind', 'sql', 'fastapi', 'gemini', 'life admin', 'life-admin-ai'];
  const matchedTech = techKeywords.filter(tech => q.includes(tech));
  if (matchedTech.length > 0) {
    return `Vizz has direct, professional experience working with **${matchedTech.map(t => t.toUpperCase()).join(' & ')}**! \n\n• For his microservices backend work (using Java, Spring Boot, PostgreSQL, Docker), you can ask me about his project **Aegis Capital**.\n• For his generative AI work (using Google Gemini 2.0, FastAPI, Supabase), you can ask me about his project **Life Admin AI**.\n• For his big data work (using PySpark, Databricks, Delta Lake), you can ask me about his **PySpark Pipeline**.\n• Or type 'skills' to see his complete technical multi-language toolbox!`;
  }

  // Strict relevance check to professionally filter irrelevant/out-of-scope questions
  const relevantPortions = [
    'vishnu', 'vizz', 'annareddy', 'portfolio', 'resume', 'cv', 'experience', 'intern', 'mphasis', 
    'gate', 'rank', 'air', 'sastra', 'university', 'college', 'cgpa', 'education', 'skills', 
    'projects', 'aegis', 'pyspark', 'life admin', 'life-admin-ai', 'chatbot', 'bot', 'contact', 
    'email', 'phone', 'linkedin', 'github', 'leetcode', 'hobbies', 'hire', 'hello', 'hi', 'hey', 
    'thanks', 'thank you', 'spring boot', 'java', 'cpp', 'python', 'sql', 'react', 'docker', 
    'mongodb', 'postgresql', 'fastapi', 'gemini', 'microservices', 'distributed', 'saga', 'rollback',
    'auth', 'account', 'transaction', 'databricks', 'delta lake', 'parquet', 'outliers', 'supabase',
    'oauth', 'zustand'
  ];
  
  const hasRelevantKeyword = relevantPortions.some(word => q.includes(word));
  if (!hasRelevantKeyword && highestScore < 4) {
    return "I apologize, but I do not know the answer to that. As Vishnu's professional AI portfolio representative, my knowledge is strictly focused on his academic milestones, career journey, skills, projects, and professional credentials. The question you have asked appears to be irrelevant or out-of-scope for this portfolio. Please feel free to ask me anything about Vishnu's software engineering experience, GATE rank, Spring Boot microservices, or key projects!";
  }

  // Intelligent conversational fallback for relevant but unmapped queries
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

