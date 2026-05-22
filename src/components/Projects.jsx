import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code, CheckCircle, Database, Server, Brain, Cpu, Layers } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);

  const filters = ['All', 'Distributed Systems', 'Big Data', 'Generative AI'];

  const filteredProjects = activeFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.tag === activeFilter);

  const getTagIcon = (tag) => {
    switch (tag) {
      case 'Distributed Systems': return <Server size={14} className="text-terracotta" />;
      case 'Big Data': return <Database size={14} className="text-emerald-accent" />;
      case 'Generative AI': return <Brain size={14} className="text-purple-500" />;
      default: return <Layers size={14} />;
    }
  };

  return (
    <section 
      id="projects" 
      className="relative py-24 bg-beige dark:bg-charcoal border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 mb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-terracotta dark:text-orange-500">
            Engineered Systems
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
            Technical Portfolio
          </h2>
          <div className="w-12 h-1 bg-terracotta dark:bg-orange-500 mt-2 rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setExpandedProject(null);
              }}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal shadow-md'
                  : 'bg-zinc-900/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900/10 dark:hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div 
          layout
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isExpanded = expandedProject === project.title;
              return (
                <motion.div 
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  whileHover={{ y: -6 }}
                  className="glass-card p-8 flex flex-col justify-between border border-zinc-900/5 dark:border-white/5 relative group/card hover:shadow-lg dark:hover:shadow-black/30"
                >
                  <div>
                    {/* Category Tag Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                        {getTagIcon(project.tag)}
                        {project.tag}
                      </span>
                      <span className="text-[9px] font-black text-emerald-accent dark:text-[#52c49a] uppercase tracking-widest">
                        Production Ready
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover/card:text-terracotta dark:group-hover/card:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 mt-1 mb-4 uppercase tracking-wider">
                      {project.subtitle}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* High-Impact Success Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {project.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx}
                          className="px-3 py-2 rounded-xl bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/5 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta dark:bg-orange-500" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Icons / Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expanding Details Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="border-t border-zinc-900/5 dark:border-white/5 pt-6 mt-4 space-y-3 overflow-hidden"
                      >
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                          Technical Highlights & Architecture
                        </h5>
                        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-left">
                          {project.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex gap-2 items-start">
                              <CheckCircle size={12} className="text-emerald-accent dark:text-[#52c49a] shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card CTA Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-900/5 dark:border-white/5 pt-6 mt-6">
                    <button 
                      onClick={() => setExpandedProject(isExpanded ? null : project.title)}
                      className="text-[10px] font-black uppercase tracking-widest text-terracotta dark:text-orange-500 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      {isExpanded ? 'Hide Architecture' : 'Examine Architecture'}
                    </button>

                    <a 
                      href={project.githubLink || portfolioData.personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:border-terracotta/40 hover:text-terracotta dark:hover:text-orange-500 transition-all duration-300"
                    >
                      <Github size={14} />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
