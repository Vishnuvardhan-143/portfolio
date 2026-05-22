import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Briefcase, FileText, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About({ onViewResume }) {
  const cards = [
    {
      icon: <GraduationCap className="text-terracotta dark:text-orange-500" size={24} />,
      title: "SASTRA University",
      subtitle: "B.Tech in CSE",
      value: "9.19 CGPA",
      desc: "Outstanding academic performance focusing on fundamental computer science paradigms."
    },
    {
      icon: <Briefcase className="text-emerald-accent dark:text-[#52c49a]" size={24} />,
      title: "Mphasis Limited",
      subtitle: "Software Engineer Intern",
      value: "Spring Boot Dev",
      desc: "Architected transaction-isolated and containerized distributed banking architectures."
    },
    {
      icon: <Award className="text-purple-500 dark:text-purple-400" size={24} />,
      title: "GATE 2025 Success",
      subtitle: "National Evaluation",
      value: "AIR 5005",
      desc: "Secured All India Rank 5005 out of hundreds of thousands of computer science candidates."
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-24 bg-beige dark:bg-charcoal border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 mb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-terracotta dark:text-orange-500">
            About Vizz
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
            Driven by Systems Engineering
          </h2>
          <div className="w-12 h-1 bg-terracotta dark:bg-orange-500 mt-2 rounded-full" />
        </div>

        {/* Core Layout Grid */}
        <div className="grid md:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Narrative Column */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-6 space-y-6"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block">
              Biography
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Translating theoretical computer science fundamentals into production-grade enterprise software.
            </h3>
            
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              <p>
                {portfolioData.personalInfo.bio}
              </p>
              <p>
                My educational experience at SASTRA University has fortified my command of system design concepts—spanning Object-Oriented Principles, Operating Systems, Database Orchestrations, and discrete engineering mathematics.
              </p>
              <p>
                Whether it is building microservices backing platforms with Docker containerization, engineering big data data-cleaning engines with PySpark on Databricks, or solving complex algorithmic challenges, I thrive under challenging architectural constraints.
              </p>
            </div>

            {/* Resume Button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={onViewResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal hover:bg-terracotta dark:hover:bg-orange-500 dark:hover:text-charcoal text-xs font-black uppercase tracking-widest hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer shadow-md"
              >
                <FileText size={16} />
                Show Resume
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a 
                href={portfolioData.personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 hover:border-terracotta/40 dark:hover:border-orange-500/40 text-zinc-800 dark:text-[#f5f1e8] text-xs font-black uppercase tracking-widest hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Highlights Column */}
          <div className="md:col-span-6 space-y-6">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block">
              Key Milestones
            </span>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="grid gap-6"
            >
              {cards.map((card, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="glass-card p-6 flex gap-5 items-start border border-zinc-900/5 dark:border-white/5 hover:shadow-lg dark:hover:shadow-black/35"
                >
                  <div className="p-3 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 shrink-0">
                    {card.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest">{card.subtitle}</span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{card.title}</h4>
                    <span className="inline-block text-xs font-black px-2.5 py-0.5 rounded-full bg-zinc-900/5 dark:bg-white/5 text-terracotta dark:text-orange-400 border border-zinc-900/5 dark:border-white/5 mt-1">{card.value}</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed pt-2">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
