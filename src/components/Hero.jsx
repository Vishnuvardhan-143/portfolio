import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';

const roles = ["Creative", "Fullstack", "Engineer", "Scholar"];

export default function Hero() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Setup HLS video
    const video = videoRef.current;
    const hlsSource = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.error("Video play failed", e));
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsSource;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.error("Video play failed", e));
      });
    }
  }, []);

  useEffect(() => {
    // Roles interval
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.name-reveal', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      )
      .fromTo('.blur-in', 
        { opacity: 0, filter: 'blur(10px)', y: 20 }, 
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Overlays - Reduced to show galaxy */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          {portfolioData.personalInfo.fullName}
        </h1>

        <div className="blur-in text-lg md:text-2xl text-muted mb-6 flex items-center gap-2">
          A <span key={roleIndex} className="font-display italic text-text-primary animate-role-fade-in inline-block">{roles[roleIndex]}</span> lives in {portfolioData.personalInfo.location.split(',')[0]}.
        </div>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          {portfolioData.personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-col sm:flex-row items-center gap-4">
          <a href="#work" className="relative group inline-flex rounded-full">
            <span className="absolute inset-0 rounded-full animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button className="relative rounded-full px-7 py-3.5 text-sm bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors hover:scale-105 duration-300">
              See Works
            </button>
          </a>
          <a href={`mailto:${portfolioData.personalInfo.email}`} className="relative group inline-flex rounded-full">
            <span className="absolute inset-0 rounded-full animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button className="relative rounded-full px-7 py-3.5 text-sm border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent transition-all hover:scale-105 duration-300">
              Reach out...
            </button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-full bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
