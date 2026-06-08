import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const videoRef = useRef(null);
  const marqueeRef = useRef(null);

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
    // GSAP Infinite Marquee
    const ctx = gsap.context(() => {
      gsap.to('.marquee-inner', {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden min-h-[80vh] flex flex-col justify-between">
      
      {/* Background Video (Flipped) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        {/* Overlays - Reduced to show galaxy */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {/* GSAP Marquee */}
        <div ref={marqueeRef} className="w-full overflow-hidden flex whitespace-nowrap mb-12 select-none">
          <div className="marquee-inner flex">
            {Array(10).fill("BUILDING THE FUTURE • ").map((text, i) => (
              <span key={i} className="text-6xl md:text-8xl lg:text-[140px] font-display italic text-text-primary/10 tracking-tight pr-8">
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center px-4 mb-24">
          <a 
            href={`mailto:vishnuvardhan5770648@gmail.com`}
            className="relative group inline-flex rounded-full hover:scale-105 transition-transform duration-500"
          >
            <span className="absolute inset-0 rounded-full animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative rounded-full px-10 py-5 bg-surface/80 backdrop-blur-md text-lg text-text-primary group-hover:bg-bg/90 transition-colors duration-300 border border-stroke group-hover:border-transparent flex items-center gap-3 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              vishnuvardhan5770648@gmail.com
              <span className="text-muted group-hover:text-text-primary transition-colors">↗</span>
            </div>
          </a>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke/50">
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">LinkedIn</a>
          <a href={portfolioData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GitHub</a>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-stroke/50 backdrop-blur-md">
          <div className="relative w-2 h-2">
            <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            <span className="relative block w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <span className="text-xs text-text-primary uppercase tracking-widest">Available for projects</span>
        </div>

        <div className="text-sm text-muted">
          © {new Date().getFullYear()} {portfolioData.personalInfo.fullName}. All rights reserved.
        </div>
      </div>

    </footer>
  );
}
