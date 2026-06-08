import { motion } from 'framer-motion';

const journalEntries = [
  {
    title: "Designing for Distributed Systems",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    category: "Architecture"
  },
  {
    title: "The nuance of PySpark Optimization",
    date: "Sep 28, 2025",
    readTime: "8 min read",
    category: "Data Engineering"
  },
  {
    title: "Reflections on GATE 2025 Preparation",
    date: "Aug 15, 2025",
    readTime: "12 min read",
    category: "Personal"
  },
  {
    title: "Microservices vs Monoliths in Banking",
    date: "Jul 02, 2025",
    readTime: "6 min read",
    category: "Case Study"
  }
];

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary mb-4">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-muted md:text-lg">
              Writing about software architecture, engineering scaling, and system design.
            </p>
          </div>

          <a href="#" className="hidden md:inline-flex relative group rounded-full">
            <span className="absolute inset-0 rounded-full animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 px-6 py-3 bg-surface rounded-full text-sm text-text-primary transition-transform group-hover:scale-105 duration-300">
              View all articles
              <span className="text-muted group-hover:text-text-primary transition-colors">→</span>
            </div>
          </a>
        </motion.div>

        {/* Journal Entries List */}
        <div className="flex flex-col gap-4">
          {journalEntries.map((entry, idx) => (
            <motion.a
              href="#"
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 rounded-[32px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-300"
            >
              {/* Image Placeholder */}
              <div className="w-full sm:w-24 h-24 rounded-[24px] sm:rounded-full bg-bg border border-stroke flex-shrink-0 flex items-center justify-center">
                <span className="text-xs text-muted font-display italic">{entry.category}</span>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-4">
                <div>
                  <h3 className="text-xl md:text-2xl text-text-primary font-medium tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted uppercase tracking-wider">
                    <span>{entry.date}</span>
                    <span className="w-1 h-1 rounded-full bg-stroke" />
                    <span>{entry.readTime}</span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-stroke bg-bg group-hover:border-white/20 transition-colors">
                  <span className="text-muted group-hover:text-text-primary transition-colors">↗</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
