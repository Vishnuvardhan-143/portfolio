import React, { useRef } from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Github, Linkedin } from './Icons';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    // Inject dynamic CSS to print only the resume container
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden !important;
        }
        #resume-print-area, #resume-print-area * {
          visibility: visible !important;
        }
        #resume-print-area {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: auto !important;
          margin: 0 !important;
          padding: 20px !important;
          background: white !important;
          color: black !important;
          box-shadow: none !important;
          border: none !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-zinc-950/70 dark:bg-black/85 backdrop-blur-md animate-[fade-in_0.2s_ease_both]">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#f5f1e8] dark:bg-[#0c0c0c] border border-zinc-900/10 dark:border-white/5 shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-[fade-in-up_0.3s_ease_both]">
        
        {/* Header Options Bar */}
        <div className="bg-zinc-950/2 dark:bg-white/2 border-b border-zinc-900/5 dark:border-white/5 px-6 py-4 flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-terracotta dark:bg-orange-500 animate-pulse" />
            <h3 className="font-heading text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
              Professional Resume Preview
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-zinc-900/5 dark:bg-white/5 hover:bg-zinc-900/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-900/5 dark:border-white/5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
              title="Print or Save as PDF"
            >
              <Printer size={12} />
              Print / Save
            </button>

            {/* Direct Download PDF Button */}
            <a
              href="/resume.pdf"
              download="Vishnu_Annareddy_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal hover:bg-terracotta dark:hover:bg-orange-500 dark:hover:text-charcoal transition-all duration-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
            >
              <Download size={12} />
              Download PDF
            </a>

            {/* Vertical Divider */}
            <div className="h-5 w-[1px] bg-zinc-900/10 dark:bg-white/10 mx-1" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-900/5 dark:hover:bg-white/5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Digital Resume Canvas */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-white dark:bg-[#0c0c0c] text-zinc-800 dark:text-zinc-300 font-sans selection:bg-terracotta/20">
          
          <div id="resume-print-area" ref={resumeRef} className="max-w-3xl mx-auto space-y-8 bg-white dark:bg-transparent text-left">
            
            {/* Resume Header */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                  {portfolioData.personalInfo.fullName}
                </h1>
                <p className="text-xs font-black uppercase tracking-widest text-terracotta dark:text-orange-500">
                  {portfolioData.personalInfo.tagline}
                </p>
                
                {/* Contact Coordinates */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-medium text-zinc-500 dark:text-zinc-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail size={12} className="text-zinc-400" />
                    {portfolioData.personalInfo.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={12} className="text-zinc-400" />
                    +91 {portfolioData.personalInfo.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-zinc-400" />
                    {portfolioData.personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Profiles links */}
              <div className="flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-wider no-print shrink-0">
                <a
                  href={portfolioData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:border-terracotta/30 text-zinc-600 dark:text-zinc-400 transition-colors"
                >
                  <Linkedin size={10} />
                  LinkedIn
                  <ExternalLink size={8} />
                </a>
                <a
                  href={portfolioData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:border-terracotta/30 text-zinc-600 dark:text-zinc-400 transition-colors"
                >
                  <Github size={10} />
                  GitHub
                  <ExternalLink size={8} />
                </a>
                <a
                  href={portfolioData.personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:border-terracotta/30 text-zinc-600 dark:text-zinc-400 transition-colors"
                >
                  LeetCode
                  <ExternalLink size={8} />
                </a>
              </div>
            </div>

            {/* Profile Overview */}
            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                Professional Profile
              </h2>
              <p className="text-xs font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
                {portfolioData.personalInfo.bio}
              </p>
            </div>

            {/* Core Competencies / Technical Skills */}
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                Technical Toolkit
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block mb-1">Languages:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolioData.skills.languages.map(s => (
                      <span key={s.name} className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 rounded border border-zinc-200 dark:border-white/5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block mb-1">Frameworks & Libraries:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolioData.skills.frameworks.map(s => (
                      <span key={s.name} className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 rounded border border-zinc-200 dark:border-white/5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block mb-1">Databases & Infrastructure:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[...portfolioData.skills.databases, ...portfolioData.skills.devops].map(s => (
                      <span key={s.name} className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 rounded border border-zinc-200 dark:border-white/5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block mb-1">Computer Science Fundamentals:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolioData.skills.fundamentals.map(s => (
                      <span key={s.name} className="px-2 py-0.5 bg-zinc-100 dark:bg-white/5 rounded border border-zinc-200 dark:border-white/5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience / Internship */}
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                Professional Experience
              </h2>
              
              {portfolioData.journey.filter(j => j.company.includes('Mphasis')).map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {exp.role} · <span className="text-terracotta dark:text-orange-500">{exp.company}</span>
                    </h3>
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">{exp.period}</span>
                  </div>
                  <p className="text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">{exp.location}</p>
                  
                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    {exp.details.map((d, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                Core Engineering Projects
              </h2>

              <div className="space-y-5">
                {portfolioData.projects.slice(0, 3).map((proj, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                        {proj.title} — <span className="text-zinc-500 dark:text-zinc-400 italic font-normal text-xs">{proj.subtitle}</span>
                      </h3>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-zinc-400 tracking-widest uppercase shrink-0">
                        {proj.tag}
                      </span>
                    </div>
                    
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/5 dark:border-white/5 text-[9px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education and Academics */}
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                Education & Achievements
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-xs">
                {/* SASTRA */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-zinc-900 dark:text-white uppercase">SASTRA Deemed University</h3>
                    <span className="text-[9px] font-bold text-zinc-400">2022 - 2026</span>
                  </div>
                  <p className="text-[10px] text-zinc-500">B.Tech in Computer Science & Engineering</p>
                  <p className="font-black text-terracotta dark:text-orange-400 text-[10px] tracking-wider">CGPA: 9.19 / 10</p>
                </div>

                {/* Intermediate */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-zinc-900 dark:text-white uppercase">Sri Chaitanya Junior College</h3>
                    <span className="text-[9px] font-bold text-zinc-400">2020 - 2022</span>
                  </div>
                  <p className="text-[10px] text-zinc-500">Intermediate Board (Vijayawada)</p>
                  <p className="font-black text-emerald-accent dark:text-[#52c49a] text-[10px] tracking-wider">Score: 97.3% · JEE: 95.07%ile</p>
                </div>
              </div>

              {/* GATE CSE Rank */}
              <div className="p-4 rounded-2xl bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/5 dark:border-white/5 flex gap-4 items-center mt-2">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                  <Award size={20} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                    GATE CSE 2025 Triumph
                  </h4>
                  <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                    Secured <span className="font-black text-terracotta dark:text-orange-500">All India Rank (AIR) 5005</span> with an absolute test score of <span className="font-bold">543</span> under nationwide competition.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
