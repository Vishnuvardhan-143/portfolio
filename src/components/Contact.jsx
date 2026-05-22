import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Code } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      className="relative py-24 bg-beige dark:bg-charcoal border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-500 overflow-hidden"
    >
      {/* Background glow layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-terracotta/5 dark:bg-orange-500/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 mb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-terracotta dark:text-orange-500">
            Collaborations
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-terracotta dark:bg-orange-500 mt-2 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block">
              Contact Info
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Let's build something exceptional together.
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Have an exciting project, research collaboration, or corporate opportunity? Reach out via the form, direct email, or social networks.
            </p>

            <div className="space-y-4 pt-4">
              {/* Email */}
              <a 
                href={`mailto:${portfolioData.personalInfo.email}`}
                className="glass-card p-4 flex items-center gap-4 hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-terracotta dark:text-orange-500">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Email Address</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-[#f5f1e8]">{portfolioData.personalInfo.email}</span>
                </div>
              </a>

              {/* Call */}
              <a 
                href={`tel:${portfolioData.personalInfo.phone}`}
                className="glass-card p-4 flex items-center gap-4 hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-emerald-accent dark:text-[#52c49a]">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Call / WhatsApp</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-[#f5f1e8]">+91 {portfolioData.personalInfo.phone}</span>
                </div>
              </a>

              {/* Location */}
              <a 
                href="https://maps.google.com/?q=Proddatur,Kadapa,Andhra+Pradesh,India"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-4 hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-purple-500">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Base Location</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-[#f5f1e8]">{portfolioData.personalInfo.location}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 border border-zinc-900/5 dark:border-white/5 relative">
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-[fade-in-up_0.3s_ease_both]">
                  <div className="p-4 rounded-full bg-emerald-accent/15 border border-emerald-accent/20 text-emerald-accent dark:text-[#52c49a] animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="font-heading text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                    Message Received!
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
                    Thank you, your message has been successfully logged! Vizz will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border border-zinc-900/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/10 dark:border-white/10 text-xs focus:border-terracotta dark:focus:border-orange-500 outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/10 dark:border-white/10 text-xs focus:border-terracotta dark:focus:border-orange-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell me about your project, timeline or role..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/2 dark:bg-white/2 border border-zinc-900/10 dark:border-white/10 text-xs focus:border-terracotta dark:focus:border-orange-500 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl bg-zinc-900 text-beige dark:bg-[#f5f1e8] dark:text-charcoal text-xs font-black uppercase tracking-widest hover:bg-terracotta dark:hover:bg-orange-500 dark:hover:text-charcoal hover:-translate-y-0.5 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {status === 'sending' ? (
                      'Sending Message...'
                    ) : (
                      <>
                        Send Message
                        <Send size={12} />
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
