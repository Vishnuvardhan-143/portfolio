import { motion } from 'framer-motion';

export default function Stats() {
  const stats = [
    { value: "5005", suffix: "AIR", label: "GATE CSE 2025" },
    { value: "9.19", suffix: "", label: "SASTRA CGPA" },
    { value: "4", suffix: "+", label: "Prod Systems Deployed" },
  ];

  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-stroke/50">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex flex-col items-center text-center ${idx !== 0 ? 'pt-12 md:pt-0' : ''}`}
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-6xl md:text-7xl lg:text-8xl font-display text-text-primary tracking-tight">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-3xl md:text-4xl font-display italic text-accent">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
