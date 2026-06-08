import { motion } from 'framer-motion';
import { Server, Database, Sparkles, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function SelectedWorks() {
  const projects = portfolioData.projects.slice(0, 4);
  const colSpans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];

  return (
    <section id="work" className="bg-bg py-12 md:py-16 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary mb-4">
              Featured <span className="font-display italic text-text-primary/90">projects</span>
            </h2>
            <p className="text-muted md:text-lg">
              A selection of projects I've worked on, showcasing full-stack capabilities, distributed systems, and generative AI.
            </p>
          </div>

          <a href="#" className="hidden md:inline-flex relative group rounded-full">
            <span className="absolute inset-0 rounded-full animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 px-6 py-3 bg-surface rounded-full text-sm text-text-primary transition-transform group-hover:scale-105 duration-300">
              View all work
              <span className="text-muted group-hover:text-text-primary transition-colors">→</span>
            </div>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 perspective-[1000px]">
          {projects.map((project, idx) => {
            
            // Map tag to an icon
            let BgIcon = Code2;
            if (project.tag === 'Distributed Systems') BgIcon = Server;
            else if (project.tag === 'Big Data') BgIcon = Database;
            else if (project.tag === 'Generative AI') BgIcon = Sparkles;

            return (
              <motion.a 
                href={project.githubLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                key={project.title}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`${colSpans[idx % 4]} godmode-glass relative group rounded-3xl overflow-hidden aspect-square sm:aspect-[4/3] md:aspect-auto min-h-[350px] md:min-h-[420px] cursor-pointer block`}
              >
                {/* Halftone Overlay */}
                <div 
                  className="absolute inset-0 z-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                  }}
                />

                {/* Large Background Icon (Fills the empty space) */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                  <BgIcon size={240} strokeWidth={1} />
                </div>
                
                {/* Top Layer Info */}
                <div className="absolute inset-x-6 top-6 z-10 flex justify-between items-start">
                  <div className="px-3 py-1.5 rounded-full border border-stroke/50 bg-black/20 backdrop-blur-md text-[10px] text-muted uppercase tracking-widest group-hover:border-white/20 transition-colors">
                    {project.tag}
                  </div>
                </div>

                {/* Tech Stack Pills (Fills empty space in the middle) */}
                <div className="absolute inset-x-8 top-20 z-10 flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {project.tech?.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-surface/50 border border-white/5 text-[10px] text-muted tracking-wider backdrop-blur-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Central Project Title & Description (Restored) */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <h3 className="font-display italic text-3xl sm:text-4xl text-text-primary mb-3 drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted/90 max-w-lg leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Godmode Hover Overlay Flare */}
                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(137,170,204,0.15),transparent_60%)]" />

                {/* View Label Pill (Floats on hover) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none">
                  <div className="relative group/label">
                    <span className="absolute inset-0 rounded-full animated-gradient-border opacity-50" />
                    <div className="relative px-6 py-2.5 bg-surface text-text-primary rounded-full flex items-center gap-2 backdrop-blur-md shadow-2xl shadow-black">
                      <span className="text-xs font-medium uppercase tracking-wider">GitHub ↗</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
