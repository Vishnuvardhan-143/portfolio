import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, Network, Zap, Cpu, Award, Milestone, GraduationCap, Briefcase, FileCode } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (stepName) => {
    switch (stepName.toUpperCase()) {
      case 'GENESIS': return <Zap className="text-orange-500" size={20} />;
      case 'ACQUISITION': return <Cpu className="text-emerald-accent" size={20} />;
      case 'ACADEMICS': return <Award className="text-purple-500" size={20} />;
      case 'ENROLLMENT': return <GraduationCap className="text-blue-500" size={20} />;
      case 'EXPLORATION': return <Network className="text-pink-500" size={20} />;
      case 'DEEPENING': return <FileCode className="text-amber-500" size={20} />;
      case 'INTERNSHIP': return <Briefcase className="text-orange-500" size={20} />;
      case 'SECURITY': return <Shield className="text-emerald-accent" size={20} />;
      case 'VALIDATION': return <Milestone className="text-purple-500" size={20} />;
      case 'HORIZON': return <Zap className="text-blue-500" size={20} />;
      default: return <Zap className="text-orange-500" size={20} />;
    }
  };

  const currentRoadmap = portfolioData.processRoadmap || [];

  return (
    <section 
      id="process" 
      className="relative py-24 bg-theme border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle Gridlines in Background */}
      <div className="absolute inset-0 bg-gridlines opacity-30 pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-terracotta/5 dark:bg-orange-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-emerald-accent/5 dark:bg-[#52c49a]/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full">
        
        {/* Section Heading & Stats Bar */}
        <div className="flex flex-col items-center gap-6 mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 dark:bg-orange-500/15 dark:border-orange-500/30 text-terracotta dark:text-orange-400 text-[9px] font-black uppercase tracking-[0.25em] w-fit">
            <Milestone size={10} />
            Strategic Roadmap
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] text-zinc-900 dark:text-white max-w-2xl">
            My <span className="text-terracotta dark:text-orange-500 italic font-heading underline decoration-[3px] underline-offset-8">Process</span>.
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl pt-2">
            From initial computing spark and intense academic competitive evaluations to deploying microservices banking platforms—a precise, step-by-step account of my engineering growth.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 border border-zinc-900/5 dark:border-white/5 bg-zinc-900/[0.02] dark:bg-white/[0.02] px-8 py-4 rounded-3xl backdrop-blur-sm mt-4">
            <div className="text-center px-4">
              <span className="block text-2xl font-black font-heading text-terracotta dark:text-orange-500">10+</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Technologies</span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-900/10 dark:bg-white/10" />
            <div className="text-center px-4">
              <span className="block text-2xl font-black font-heading text-terracotta dark:text-orange-500">B.Tech</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">SASTRA CSE</span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-900/10 dark:bg-white/10" />
            <div className="text-center px-4">
              <span className="block text-2xl font-black font-heading text-terracotta dark:text-orange-500">AIR 5005</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">GATE 2025</span>
            </div>
          </div>
        </div>

        {/* Process Map Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: 10 Steps Interactive Navigator */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-3 order-2 lg:order-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-2 px-1">
              Phases Chronology
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {currentRoadmap.map((stepItem, idx) => (
                <button
                  key={stepItem.step}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-left transition-all duration-300 cursor-pointer ${
                    activeStep === idx
                      ? 'bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal shadow-md scale-102 border-l-4 border-l-terracotta dark:border-l-orange-500'
                      : 'bg-zinc-900/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900/10 dark:hover:bg-white/10 border-l-4 border-l-transparent'
                  }`}
                >
                  <span className="font-heading font-black italic opacity-60 text-xs text-terracotta dark:text-orange-400">
                    {stepItem.step}
                  </span>
                  <span className="truncate">{stepItem.phase}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Active Card View + Glowing Node Representation */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {currentRoadmap.map((stepItem, idx) => {
                if (idx !== activeStep) return null;
                return (
                  <motion.div
                    key={stepItem.step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
                    className="glass-card p-6 md:p-10 border border-zinc-900/5 dark:border-white/5 hover:border-terracotta/20 dark:hover:border-orange-500/20 shadow-md relative overflow-hidden"
                  >
                    
                    {/* Top Detail Headers */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-900/5 dark:border-white/5">
                      <div className="flex items-center gap-3.5">
                        <div className="px-4 py-2 rounded-2xl bg-terracotta/10 border border-terracotta/20 dark:bg-orange-500/15 dark:border-orange-500/30 text-terracotta dark:text-orange-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                          <span className="font-heading font-black italic">{stepItem.step}</span>
                          <span>—</span>
                          <span>{stepItem.phase}</span>
                        </div>
                      </div>

                      <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 bg-zinc-900/5 dark:bg-white/5 px-4 py-2 rounded-2xl">
                        <span>Speed:</span>
                        <span className="text-terracotta dark:text-orange-400">{stepItem.timeline}</span>
                      </div>
                    </div>

                    {/* Split Card Content */}
                    <div className="grid md:grid-cols-12 gap-8 items-start">
                      
                      {/* Left Block: Written highlights */}
                      <div className="md:col-span-12 space-y-6 relative">
                        {/* Red glow stroke that follows the outline of the active card */}
                        <div className="absolute -inset-[1px] rounded-[24px] z-[-1] bg-gradient-to-b from-terracotta/50 via-terracotta/5 to-transparent opacity-0 animate-[glow-pulse_3s_ease-in-out_infinite]" />
                        
                        <div className="space-y-2">
                          <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white leading-tight">
                            {stepItem.title}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                            {stepItem.description}
                          </p>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-3.5">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 block">
                            Execution Highlights
                          </span>
                          <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                            {stepItem.highlights.map((highlight, hIdx) => (
                              <li key={hIdx} className="flex gap-2.5 items-start">
                                <CheckCircle2 size={14} className="text-terracotta dark:text-orange-500 shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech tags */}
                        <div className="space-y-2.5 pt-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 block">
                            Skill Coordinates
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {stepItem.techTags.map((tag, tIdx) => (
                              <span 
                                key={tIdx}
                                className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400 hover:text-terracotta dark:hover:text-orange-400 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Aesthetic Node Graphic */}
                      <div className="md:col-span-5 flex justify-center items-center h-full min-h-[220px]">
                        <div className="relative w-48 h-48 rounded-3xl bg-zinc-900 dark:bg-black border border-zinc-900/10 dark:border-white/10 shadow-2xl flex flex-col justify-center items-center overflow-hidden">
                          {/* Inner glowing orbit */}
                          <div className="absolute inset-0 bg-radial-glow ambient-glow-light dark:ambient-glow-dark opacity-40" />
                          <div className="absolute w-36 h-36 rounded-full border border-dashed border-zinc-700/30 dark:border-white/10 animate-spin" style={{ animationDuration: '20s' }} />
                          <div className="absolute w-24 h-24 rounded-full border border-zinc-800/40 dark:border-zinc-800/60" />

                          {/* Node Dots */}
                          <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full bg-terracotta/40 dark:bg-orange-500/40 animate-ping" />
                          <div className="absolute top-10 left-10 w-1.5 h-1.5 rounded-full bg-terracotta dark:bg-orange-500" />

                          <div className="absolute bottom-12 right-10 w-2.5 h-2.5 rounded-full bg-emerald-accent/40 dark:bg-[#52c49a]/40 animate-ping" />
                          <div className="absolute bottom-12 right-10 w-1.5 h-1.5 rounded-full bg-emerald-accent dark:bg-[#52c49a]" />

                          {/* Center Node Container */}
                          <motion.div 
                            animate={{ scale: [0.95, 1.05, 0.95] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-2xl bg-zinc-950 dark:bg-zinc-900/90 border border-terracotta/30 dark:border-orange-500/30 shadow-[0_0_20px_rgba(194,65,12,0.15)] flex items-center justify-center relative z-10"
                          >
                            {getStepIcon(stepItem.phase)}
                          </motion.div>

                          {/* Captions */}
                          <span className="text-[8px] font-black uppercase tracking-[0.25em] text-terracotta dark:text-orange-400 mt-4 relative z-10">
                            {stepItem.phase}
                          </span>
                          <span className="text-[7px] font-bold text-zinc-500 dark:text-zinc-600 tracking-widest mt-0.5 relative z-10 uppercase">
                            Status · Complete
                          </span>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
