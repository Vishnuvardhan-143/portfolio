export const portfolioData = {
  personalInfo: {
    fullName: "Annareddy Venkata Vishnuvardhan Reddy",
    nickname: "Vizz",
    tagline: "Software Engineer & Distributed Systems Architect",
    avatar: "", // Placeholder or left empty
    email: "vishnuvardhan5770648@gmail.com",
    universityEmail: "126003026@sastra.ac.in",
    phone: "8331950911",
    location: "Proddatur, Kadapa, Andhra Pradesh, India",
    github: "https://github.com/Vishnuvardhan-143",
    linkedin: "https://linkedin.com/in/vishnu-annareddy-267009285",
    leetcode: "https://leetcode.com/u/vishnuvardhan5770648/",
    resumeUrl: "#", // Direct download or internal handle
    bio: "I am a hardworking, self-motivated Computer Science student with a strong drive to solve complex architectural challenges. With specialized experience in Spring Boot microservices, big data pipelines using PySpark, and enterprise system designs, I aim to leverage engineering principles to construct robust, high-performance web systems and AI applications."
  },
  
  journey: [
    {
      period: "July 2020 -- June 2022",
      role: "Academic Foundation & JEE Success",
      company: "Sri Chaitanya Junior College",
      location: "Vijayawada, Andhra Pradesh",
      details: [
        "Completed Intermediate education with an outstanding score of 97.3%.",
        "Secured a highly competitive 95.07 percentile in the national JEE Mains examination.",
        "Built deep logical foundation in mathematics, analytical reasoning, and competitive science."
      ],
      tags: ["Foundation", "JEE Success", "Intermediate"]
    },
    {
      period: "Oct 2022 -- May 2026",
      role: "B.Tech in Computer Science & Engineering",
      company: "SASTRA Deemed University",
      location: "Thanjavur, Tamil Nadu",
      details: [
        "Maintained a stellar Cumulative Grade Point Average (CGPA) of 9.19/10.",
        "Mastered core engineering principles: Object-Oriented Programming (OOPs), Database Management Systems (DBMS), Operating Systems (OS), and Advanced DSA.",
        "Engaged in full-stack engineering collaborations and machine learning project modules."
      ],
      tags: ["SASTRA University", "B.Tech CSE", "Academic Excellence"]
    },
    {
      period: "Feb 2025",
      role: "GATE 2025 Triumph",
      company: "Graduate Aptitude Test in Engineering",
      location: "All India",
      details: [
        "Secured All India Rank (AIR) 5005 in GATE CSE 2025.",
        "Validated absolute mastery of theoretical computer science, algorithms, compilers, and discrete structures under rigorous evaluation with a score of 543."
      ],
      tags: ["GATE 2025", "AIR 5005", "Computer Theory"]
    },
    {
      period: "Jan 2026 -- Apr 2026",
      role: "Software Engineer Intern",
      company: "Mphasis Limited",
      location: "Hybrid / Remote",
      details: [
        "Developed a production-grade microservices banking platform comprising four independently deployable services.",
        "Implemented secure JWT + TOTP MFA authentication protocols and administrative auditing layers.",
        "Engineered inter-service communications using distributed orchestration and transactional rollbacks."
      ],
      tags: ["Spring Boot", "Microservices", "Mphasis Intern"]
    }
  ],

  skills: {
    languages: [
      { name: "C++", level: "Expert" },
      { name: "Python", level: "Expert" },
      { name: "Java", level: "Expert" },
      { name: "SQL", level: "Advanced" }
    ],
    frameworks: [
      { name: "ReactJS", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "Spring Boot", level: "Expert" }
    ],
    databases: [
      { name: "SQL (PostgreSQL/MySQL)", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" }
    ],
    devops: [
      { name: "Docker", level: "Advanced" },
      { name: "Docker Compose", level: "Advanced" },
      { name: "Git & GitHub", level: "Expert" }
    ],
    fundamentals: [
      { name: "Data Structures & Algorithms", level: "Expert" },
      { name: "Object-Oriented Programming (OOPs)", level: "Expert" },
      { name: "Database Management Systems (DBMS)", level: "Expert" },
      { name: "Operating Systems (OS)", level: "Advanced" },
      { name: "Machine Learning", level: "Intermediate" }
    ]
  },

  projects: [
    {
      title: "Aegis Capital",
      subtitle: "Microservices Banking System",
      description: "A production-grade, distributed microservices banking platform engineered with high security, concurrency controls, and high-availability design templates. Includes independently orchestratable modules for Auth, Accounts, Transactions, and Admin monitoring.",
      githubLink: "https://github.com/Vishnuvardhan-143/Aegis_Capital",
      metrics: [
        "4 Orchestrated Services",
        "Compensating Rollbacks (Saga)",
        "JWT + TOTP MFA Security",
        "Optimistic Locking (@Version)"
      ],
      tech: ["Spring Boot", "Java", "Docker Compose", "BCrypt", "JWT", "JPA Hibernate"],
      tag: "Distributed Systems",
      highlights: [
        "Orchestrated 4 services (Auth, Account, Transaction, Admin) via Docker Compose for easy scaling.",
        "Engineered a Simplified Saga Pattern in the Transaction Service with compensating rollbacks to guarantee data atomicity across distributed nodes.",
        "Applied JPA optimistic locking (@Version) for concurrent balance updates and native modifying queries to bypass first-level cache for PIN resets.",
        "Implemented double-factor external transfer validation using dedicated internal endpoints, ensuring zero misdirected fund transfers."
      ]
    },
    {
      title: "PySpark Data Cleaning Pipeline",
      subtitle: "Automated CSV Transformation Engine",
      description: "A robust, high-performance big data pipeline designed to clean, transform, and log messy real-world CSV files on cloud infrastructure. Built for enterprise scale with flexible strategies and user-friendly visual widget controls.",
      githubLink: "https://github.com/Vishnuvardhan-143",
      metrics: [
        "100% Automated Schema",
        "IQR-based Outlier Check",
        "Delta & Parquet Support",
        "Scalable Logging"
      ],
      tech: ["Python", "PySpark", "Databricks", "Delta Lake", "Parquet"],
      tag: "Big Data",
      highlights: [
        "Built a modular data cleaning pipeline using PySpark on Databricks with automated schema detection.",
        "Supported configurable missing value resolution strategies (drop, mean, median, or mode).",
        "Implemented robust data type casting and duplicate row removal at scale.",
        "Enabled user-friendly configurations via Databricks widgets, supporting Delta and Parquet outputs."
      ]
    },
    {
      title: "Life Admin AI",
      subtitle: "AI Personal Chaos Manager",
      description: "An intelligent personal administrative assistant that automatically parses unstructured inputs (emails, texts, documents) via Gemini 2.0 Flash to extract tasks, calculate multi-dimensional priority scores, and synchronize scheduling.",
      githubLink: "https://github.com/Vishnuvardhan-143/life-admin-ai",
      metrics: [
        "Gemini 2.0 Flash Engine",
        "FastAPI & Supabase",
        "Multi-Dimensional Priority Score",
        "OAuth & Storage Integration"
      ],
      tech: ["FastAPI", "Python", "ReactJS", "Supabase", "Gemini 2.0", "Zustand"],
      tag: "Generative AI",
      highlights: [
        "Architected an automated task extractor using Google Gemini 2.0 Flash to parse unstructured text inputs with high accuracy.",
        "Engineered an intelligent priority scoring algorithm scaling due dates, source weights, and domain categories (e.g., finance, legal).",
        "Integrated Supabase for secure Google OAuth, database persistence, and document blob storage.",
        "Developed a real-time responsive dashboard in React 18 and Vite 6 powered by Zustand for client-side state management."
      ]
    },
    {
      title: "Vishnu AI assistant",
      subtitle: "Personal Portfolio Bot",
      description: "Interactive Generative AI agent built directly into the portfolio layout. Trained on Vizz's accomplishments, technical skill tiers, and internship milestones, giving visitors a conversational interface to explore his credentials in real-time.",
      githubLink: "https://github.com/Vishnuvardhan-143",
      metrics: [
        "Zero-latency Local Client",
        "Context-Aware Prompting",
        "Tailwind Interactive UI"
      ],
      tech: ["ReactJS", "Tailwind CSS v4", "Generative AI Context", "Local Prompt Processing"],
      tag: "Generative AI",
      highlights: [
        "Personalized conversational widget trained directly on Vizz's resume data.",
        "Interactive suggestions like 'Ask about GATE Rank' or 'Ask about Mphasis Internship'.",
        "Fully dynamic, retro-glass conversational card embedded smoothly into the viewport."
      ]
    }
  ],

  achievements: [
    {
      number: "01",
      title: "Academic Excellence at SASTRA",
      subtitle: "CGPA 9.19 / 10",
      description: "Maintained a stellar Cumulative Grade Point Average of 9.19/10 at SASTRA Deemed University, mastering theoretical computer science paradigms."
    },
    {
      number: "02",
      title: "GATE CSE 2025 Triumph",
      subtitle: "All India Rank 5005",
      description: "Secured AIR 5005 in GATE CSE 2025 (Score 543), validating absolute mastery of core computing models and compilers."
    },
    {
      number: "03",
      title: "Distributed Systems Engineering",
      subtitle: "Aegis Capital Deployment",
      description: "Architected a transaction-isolated microservices banking platform comprising four orchestration nodes."
    },
    {
      number: "04",
      title: "Big Data PySpark Pipelines",
      subtitle: "Automated Data Processing",
      description: "Engineered scalable Databricks pipelines with IQR-based outlier filters and dynamic parameter widgets."
    },
    {
      number: "05",
      title: "JEE Mains Performance",
      subtitle: "95.07 Percentile",
      description: "Achieved a highly competitive national percentile in JEE Mains, showcasing exceptional analytical foundations."
    },
    {
      number: "06",
      title: "Intermediate Board Success",
      subtitle: "Score 97.3%",
      description: "Scored an outstanding 97.3% in Intermediate Board Examinations at Sri Chaitanya Junior College."
    },
    {
      number: "07",
      title: "Spring Boot Microservices",
      subtitle: "Transaction Integrity",
      description: "Employed JPA Optimistic Locking (@Version) to prevent balance updates drift under highly concurrent API hits."
    },
    {
      number: "08",
      title: "Professional Banking Security",
      subtitle: "JWT + TOTP MFA Protocols",
      description: "Secured external transaction transfer pipelines using dedicated double-factor validation algorithms."
    },
    {
      number: "09",
      title: "Distributed Saga Rollbacks",
      subtitle: "Zero Database Drifts",
      description: "Designed transactional rollbacks in Mphasis banking internship to preserve ACID consistency across microservice nodes."
    },
    {
      number: "10",
      title: "Conversational AI Representative",
      subtitle: "Vishnu AI Bot Integration",
      description: "Engineered a custom mock LLM agent trained on resume coordinates, yielding instantaneous query answers."
    }
  ],

  processRoadmap: [
    {
      step: "01",
      phase: "GENESIS",
      timeline: "Sub-1 Year",
      title: "Logical Ignition",
      description: "Mastered logical foundations and syntax parameters using C++ and Python, formulating critical discrete thinking capabilities.",
      highlights: [
        "Deep logical grounding in structural computation principles",
        "Completed 200+ computational algorithms to master code logic",
        "Pivoted into complex computing logic from core schooling foundations"
      ],
      techTags: ["C++", "Python", "Data Types"]
    },
    {
      step: "02",
      phase: "ACQUISITION",
      timeline: "Year 1-2",
      title: "Computer Science Paradigms",
      description: "Mastered standard algorithmic models, advanced data structures, and structural theory parameters.",
      highlights: [
        "Mastered advanced Trees, Graphs, Sorting, and Searching paradigms",
        "Engineered customized data structures to resolve execution bottlenecks",
        "Built dynamic algorithmic solutions with optimal Big O runtimes"
      ],
      techTags: ["DSA", "Big O Complexity", "Memory Management"]
    },
    {
      step: "03",
      phase: "ACADEMICS",
      timeline: "Year 2",
      title: "Competitive Rigor Success",
      description: "Earned national distinctions in JEE Mains (95.07 percentile) and scored 97.3% in intermediate board exams.",
      highlights: [
        "Validated supreme quantitative reasoning and competitive mathematics",
        "Constructed deep logical foundations in analytical discrete sciences",
        "Established elite performance under rigorous standardized criteria"
      ],
      techTags: ["JEE Prep", "Standard Evaluation", "Discrete Mathematics"]
    },
    {
      step: "04",
      phase: "ENROLLMENT",
      timeline: "Year 2-3",
      title: "B.Tech CSE at SASTRA",
      description: "Initiated Computer Science & Engineering degree at SASTRA University, establishing a supreme 9.19/10 academic CGPA.",
      highlights: [
        "Maintained perfect academic standing across successive evaluation terms",
        "Formulated core concepts in Operating Systems, OOPS, and DBMS structures",
        "Participated in collaborative team assignments and computing clubs"
      ],
      techTags: ["SASTRA University", "B.Tech CSE", "Academic Record"]
    },
    {
      step: "05",
      phase: "EXPLORATION",
      timeline: "Year 3",
      title: "Distributed Data Engineering",
      description: "Ventered into distributed systems, designing automated, high-scale PySpark data cleaning pipelines.",
      highlights: [
        "Configured robust IQR outliers cleaning strategies at massive scale",
        "Enabled Databricks widgets to control pipeline execution dynamically",
        "Logged high-fidelity cleaned data directly into Delta Lake repositories"
      ],
      techTags: ["PySpark", "Databricks", "Delta Lake", "Parquet"]
    },
    {
      step: "06",
      phase: "DEEPENING",
      timeline: "Year 3-4",
      title: "Enterprise Backend Architecture",
      description: "Mastered enterprise Java backend structures, studying microservice design patterns and JPA database layers.",
      highlights: [
        "Authored transaction-secure Spring Boot APIs with optimal execution",
        "Employed Hibernate database persistence structures for robust performance",
        "Engineered concurrent transactional operations using advanced design templates"
      ],
      techTags: ["Spring Boot", "Java", "Hibernate JPA", "Microservices"]
    },
    {
      step: "07",
      phase: "INTERNSHIP",
      timeline: "Year 4",
      title: "Software Engineer at Mphasis",
      description: "Launched professional development internship, architecting enterprise microservice banking platforms.",
      highlights: [
        "Engineered a production-ready banking architecture using Spring Boot",
        "Formulated transaction-isolated endpoints securing monetary flows",
        "Coordinated with development leaders in agile Scrum sprints"
      ],
      techTags: ["Mphasis Intern", "Production Deployment", "Agile Sprints"]
    },
    {
      step: "08",
      phase: "SECURITY",
      timeline: "Year 4",
      title: "Distributed Transaction Guarding",
      description: "Configured JWT tokens and TOTP multi-factor authentications securing monetary transfers against threats.",
      highlights: [
        "Built bulletproof security nodes shielding API microservice networks",
        "Enforced Optimistic Locking (@Version) to preserve transactional consistency",
        "Isolated transfer endpoints via dedicated validation nodes"
      ],
      techTags: ["JWT Auth", "TOTP MFA", "JPA Lock", "Distributed Sec"]
    },
    {
      step: "09",
      phase: "VALIDATION",
      timeline: "Year 4",
      title: "GATE 2025 AIR 5005 Success",
      description: "Secured an exceptional AIR 5005 in GATE Computer Science 2025, validating professional engineering caliber.",
      highlights: [
        "Secured national merit status among hundreds of thousands of candidates",
        "Verified absolute authority on Automata, Compilers, and OS theories",
        "Scored 543, demonstrating top-tier competitive systems excellence"
      ],
      techTags: ["GATE 2025", "AIR 5005", "Merit Validation"]
    },
    {
      step: "10",
      phase: "HORIZON",
      timeline: "Present & Future",
      title: "Enterprise-Ready Engineering",
      description: "Ready to deploy highly scalable web backends, distributed microservices, and big data pipeline engines.",
      highlights: [
        "Aimed at building secure cloud microservices for global entities",
        "Equipped to lead big data ingestion and analytics migrations",
        "Committed to clean documentation and robust SOLID coding patterns"
      ],
      techTags: ["Distributed Systems", "Big Data", "SOLID Architecture"]
    }
  ]
};
