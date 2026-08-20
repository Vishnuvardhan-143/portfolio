import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, Clock, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import RotatingText from './RotatingText';
import TextType from './TextType';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [copiedField, setCopiedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text, field) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('sending');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "008c4b15-91b5-49a9-b86b-d6aa3315b47c",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error("Form submission failed:", result);
        alert("Something went wrong. Please try again or email me directly.");
        setStatus('idle');
      }
    } catch (error) {
      console.error("Network error during submission:", error);
      alert("Network error. Please try again or email me directly.");
      setStatus('idle');
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-28 bg-beige dark:bg-charcoal border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500 overflow-hidden"
    >
      {/* Background glow layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full">
        
        {/* Section Heading with Rotating Text */}
        <div className="flex flex-col items-center gap-3 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-sm"
          >
            <Sparkles size={11} className="animate-pulse" />
            Collaborations
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white min-h-[75px] flex items-center justify-center">
            <RotatingText
              texts={[
                'Get In Touch.',
                'Start A Project.',
                'Build The Future.',
                'Let\'s Connect.'
              ]}
              auto={true}
              rotationInterval={4000}
              animatePresenceInitial={true}
              staggerDuration={0.03}
              staggerFrom="first"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              splitLevelClassName="overflow-hidden pb-1 pr-3"
            />
          </h2>
          
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full mt-1" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-400 block">
                Contact Info
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-snug">
                Let's build something <span className="text-cyan-400 italic font-heading">exceptional</span> together.
              </h3>
              <div className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-md min-h-[65px] pt-1">
                <TextType
                  text="Have an exciting project, research collaboration, or corporate opportunity? Reach out via the form, direct email, or social networks."
                  as="p"
                  typingSpeed={30}
                  initialDelay={600}
                  loop={false}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </div>
            </div>

            {/* Interactive Contact Cards */}
            <div className="space-y-4 pt-2">
              
              {/* Email Card */}
              <motion.div 
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass-card p-4 flex items-center justify-between group border border-zinc-900/10 dark:border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-lg relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-400/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Email Address</span>
                    <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-xs font-bold text-zinc-800 dark:text-[#f5f1e8] hover:text-cyan-400 transition-colors">
                      {portfolioData.personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.personalInfo.email, 'email')}
                  className="p-2.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <CheckCircle size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </motion.div>

              {/* Phone Card */}
              <motion.div 
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass-card p-4 flex items-center justify-between group border border-zinc-900/10 dark:border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-lg relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Call / WhatsApp</span>
                    <a href={`tel:${portfolioData.personalInfo.phone}`} className="text-xs font-bold text-zinc-800 dark:text-[#f5f1e8] hover:text-emerald-400 transition-colors">
                      +91 {portfolioData.personalInfo.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`+91${portfolioData.personalInfo.phone}`, 'phone')}
                  className="p-2.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? <CheckCircle size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </motion.div>

              {/* Location Card */}
              <motion.a 
                whileHover={{ scale: 1.02, x: 4 }}
                href="https://maps.google.com/?q=Proddatur,Kadapa,Andhra+Pradesh,India"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-4 group border border-zinc-900/10 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-lg"
              >
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Base Location</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-[#f5f1e8]">{portfolioData.personalInfo.location}</span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 border border-zinc-900/10 dark:border-white/10 relative shadow-2xl rounded-3xl bg-zinc-900/40 backdrop-blur-xl">
              
              {/* Form Status Badge Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                    Direct Message Channel
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  <Clock size={10} className="text-cyan-400" />
                  <span>Avg Response: ~2h</span>
                </div>
              </div>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-[fade-in-up_0.3s_ease_both]">
                  <div className="p-4 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 animate-bounce">
                    <CheckCircle size={38} />
                  </div>
                  <h4 className="font-heading text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                    Message Received!
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                    Thank you, your message has been logged! Vizz will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell me about your project, timeline or role..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 text-charcoal font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] active:scale-[0.99] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl"
                  >
                    {status === 'sending' ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={13} className="stroke-[2.5]" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
