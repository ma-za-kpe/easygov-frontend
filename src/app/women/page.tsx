// src/app/women/page.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { africanCountries } from '../../lib/africanCountries';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock team data (replace with real team details)
  const team = [
    { name: 'Maku Mazakpe', role: 'Project Lead', linkedin: 'https://www.linkedin.com/in/maku-mazakpe-700a3a165/', avatar: '/avatars/jane.jpg' },
    { name: 'John Smith', role: 'Developer', linkedin: 'https://linkedin.com/in/johnsmith', avatar: '/avatars/john.jpg' },
    { name: 'Aisha Khan', role: 'UI/UX Designer', linkedin: 'https://linkedin.com/in/aishakhan', avatar: '/avatars/aisha.jpg' },
    { name: 'David Okoth', role: 'Data Scientist', linkedin: 'https://linkedin.com/in/davidokoth', avatar: '/avatars/david.jpg' },
    { name: 'Mary Njoroge', role: 'Content Manager', linkedin: 'https://linkedin.com/in/marynjoroge', avatar: '/avatars/mary.jpg' },
    { name: 'Samuel Kofi', role: 'Business Dev', linkedin: 'https://linkedin.com/in/samuelkofi', avatar: '/avatars/samuel.jpg' },
  ];

  // Slide data with icons
  // Slide data with redesigned content
const slides = [
  {
    title: 'WaziGov: Empowering Communities',
    content: (
      <div className="flex flex-col items-center text-center space-y-6 px-4">
        <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg">
          <i className="fas fa-hands-helping text-4xl text-teal-500"></i>
        </div>
        <p className="text-2xl md:text-3xl font-semibold text-white leading-tight">
          Simplifying Government Access for Gender Equality (SDG 5) & Reduced Inequalities (SDG 10)
        </p>
        <p className="text-lg text-white">GNEC Hackathon 2025</p>
      </div>
    ),
    bg: 'bg-gradient-to-br from-teal-600 to-coral-600',
  },
  {
    title: 'The Problem',
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex items-center justify-center w-16 h-16 bg-coral-100 rounded-full shadow-md">
          <i className="fas fa-exclamation-triangle text-3xl text-coral-500"></i>
        </div>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-medium text-gray-800">
            Over 60% of African women face barriers to government information:
          </p>
          <ul className="space-y-3 text-lg text-gray-600">
            <li className="flex items-center">
              <i className="fas fa-file-alt text-teal-500 mr-3"></i> Complex legal jargon
            </li>
            <li className="flex items-center">
              <i className="fas fa-book text-teal-500 mr-3"></i> Literacy and language barriers
            </li>
            <li className="flex items-center">
              <i className="fas fa-low-vision text-teal-500 mr-3"></i> Inaccessible formats
            </li>
            <li className="flex items-center">
              <i className="fas fa-map-marked-alt text-teal-500 mr-3"></i> Regional disparities
            </li>
          </ul>
        </div>
      </div>
    ),
    bg: 'bg-white',
  },
  {
    title: 'Our Solution: WaziGov',
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full shadow-md">
          <i className="fas fa-lightbulb text-3xl text-teal-500"></i>
        </div>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-medium text-gray-800">WaziGov provides:</p>
          <ul className="space-y-3 text-lg text-gray-600">
            <li className="flex items-center">
              <i className="fas fa-robot text-coral-500 mr-3"></i> AI-summarized documents
            </li>
            <li className="flex items-center">
              <i className="fas fa-language text-coral-500 mr-3"></i> Multilingual support
            </li>
            <li className="flex items-center">
              <i className="fas fa-volume-up text-coral-500 mr-3"></i> Text-to-speech
            </li>
            <li className="flex items-center">
              <i className="fas fa-globe-africa text-coral-500 mr-3"></i> Region-specific access
            </li>
          </ul>
        </div>
      </div>
    ),
    bg: 'bg-teal-50',
  },
  {
    title: 'Market Opportunity',
    content: (
      <div className="flex flex-col items-center text-center space-y-6 px-4">
        <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full shadow-md">
          <i className="fas fa-chart-line text-3xl text-yellow-500"></i>
        </div>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800">
          500M+ African women and communities
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <i className="fas fa-users text-2xl text-teal-500 mr-3"></i>
            <span className="text-lg text-gray-600">10M users by 2030</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <i className="fas fa-chart-pie text-2xl  text-teal-500 mr-3"></i>
            <span className="text-lg text-gray-600">Growing civic tech market</span>
          </div>
        </div>
      </div>
    ),
    bg: 'bg-yellow-100',
  },
  {
    title: 'Business Model',
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex items-center justify-center w-16 h-16 bg-coral-100 rounded-full shadow-md">
          <i className="fas fa-coins text-3xl text-coral-500"></i>
        </div>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-medium text-gray-800">Freemium Model:</p>
          <ul className="space-y-3 text-lg text-gray-600">
            <li className="flex items-center">
              <i className="fas fa-unlock text-teal-500 mr-3"></i> Free summaries & TTS
            </li>
            <li className="flex items-center">
              <i className="fas fa-star text-teal-500 mr-3"></i> Premium reports
            </li>
            <li className="flex items-center">
              <i className="fas fa-handshake text-teal-500 mr-3"></i> NGO partnerships
            </li>
            <li className="flex items-center">
              <i className="fas fa-hand-holding-usd text-teal-500 mr-3"></i> Civic tech grants
            </li>
          </ul>
        </div>
      </div>
    ),
    bg: 'bg-coral-50',
  },
  {
    title: 'Technology Stack',
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full shadow-md">
          <i className="fas fa-code text-3xl text-gray-700"></i>
        </div>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-medium text-gray-800">Powered by:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <i className="fab fa-react text-2xl text-blue-500 mr-3"></i>
              <span className="text-lg text-gray-600">Next.js frontend</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <i className="fas fa-brain text-2xl text-purple-500 mr-3"></i>
              <span className="text-lg text-gray-600">Hugging Face LLMs</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <i className="fab fa-python text-2xl text-green-500 mr-3"></i>
              <span className="text-lg text-gray-600">Django REST APIs</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <i className="fas fa-volume-up text-2xl text-red-500 mr-3"></i>
              <span className="text-lg text-gray-600">Web Speech API</span>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: 'bg-white',
  },
  {
    title: 'Impact (SDG 5 & 10)',
    content: (
      <div className="flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full shadow-md">
          <i className="fas fa-hand-holding-heart text-3xl text-teal-500"></i>
        </div>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-medium text-gray-800">Empowering Communities:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <div className="flex h-10 w-10 rounded-full bg-pink-100 items-center justify-center mr-3">
                <i className="fas fa-venus text-xl text-pink-500"></i>
              </div>
              <span className="text-lg text-gray-600">Women’s rights (SDG 5)</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <div className="flex h-10 w-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <i className="fas fa-balance-scale text-xl text-blue-500"></i>
              </div>
              <span className="text-lg text-gray-600">Equitable access (SDG 10)</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <div className="flex h-10 w-10 rounded-full bg-green-100 items-center justify-center mr-3">
                <i className="fas fa-users text-xl text-green-500"></i>
              </div>
              <span className="text-lg text-gray-600">10,000+ users by 2026</span>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <div className="flex h-10 w-10 rounded-full bg-yellow-100 items-center justify-center mr-3">
                <i className="fas fa-handshake text-xl text-yellow-500"></i>
              </div>
              <span className="text-lg text-gray-600">5+ NGO partnerships</span>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: 'bg-teal-50',
  },
  {
    title: 'Our Team',
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-coral-500 rounded-full flex items-center justify-center text-white text-xl mb-3">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <p className="text-lg font-semibold text-teal-500">{member.name}</p>
            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
            <Link
              href={member.linkedin}
              target="_blank"
              className="text-teal-500 flex items-center text-coral-500 hover:text-coral-600 transition-colors"
              aria-label={`Visit ${member.name}'s LinkedIn profile`}
            >
              <i className="text-teal-500 fab fa-linkedin mr-1"></i> LinkedIn
            </Link>
          </div>
        ))}
      </div>
    ),
    bg: 'bg-yellow-100',
  },
  {
    title: 'Roadmap',
    content: (
      <div className="flex flex-col items-center px-4">
        <div className="relative w-full max-w-3xl">
          <div className="hidden md:block absolute h-1 bg-teal-500 top-8 left-0 right-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="bg-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10">
                <i className="fas fa-rocket text-xl"></i>
              </div>
              <p className="font-bold text-teal-500">Q2 2025</p>
              <p className="text-center text-sm text-gray-600">MVP in Uganda, Kenya</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10">
                <i className="fas fa-expand-arrows-alt text-xl"></i>
              </div>
              <p className="font-bold text-teal-500">Q4 2025</p>
              <p className="text-center text-sm text-gray-600">Expand to 5 countries</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10">
                <i className="fas fa-language text-xl"></i>
              </div>
              <p className="font-bold text-teal-500">2026</p>
              <p className="text-center text-sm text-gray-600">Add 3 languages</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <p className="font-bold text-teal-500">2027</p>
              <p className="text-center text-sm text-gray-600">Scale to 20M users</p>
            </div>
          </div>
        </div>
      </div>
    ),
    bg: 'bg-coral-50',
  },
  {
    title: 'Join Us!',
    content: (
      <div className="flex flex-col items-center text-center space-y-6 px-4">
        <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg">
          <i className="fas fa-hands-helping text-4xl text-teal-500"></i>
        </div>
        <p className="text-2xl md:text-3xl font-semibold text-white">
          Empower Women & Communities with WaziGov
        </p>
        <p className="text-lg text-white">Support us at GNEC Hackathon 2025</p>
        <Link
          href="https://discord.gg/n5pcCHcGC6"
          target="_blank"
          className="inline-flex items-center bg-white text-teal-500 px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-teal-50 transition-all"
          aria-label="Join our Discord community"
        >
          <i className="fab fa-discord mr-2"></i> Join Our Discord
        </Link>
      </div>
    ),
    bg: 'bg-gradient-to-br from-coral-600 to-teal-600',
  },
];

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (deckRef.current?.requestFullscreen) {
        deckRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Handle fullscreen change events
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [currentSlide, isFullscreen]);

  // Touch swipe functionality
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX.current;
    
    // If swipe is significant enough (more than 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentSlide > 0) {
        // Swipe right -> previous slide
        setCurrentSlide(currentSlide - 1);
      } else if (diffX < 0 && currentSlide < slides.length - 1) {
        // Swipe left -> next slide
        setCurrentSlide(currentSlide + 1);
      }
    }
  };

  return (
    <div className="space-y-12">
      {/* FontAwesome CDN (important for icons) */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      
      {/* Slide Deck */}
      <div className="relative px-4">
        <div
           ref={deckRef}
           className={`relative w-full mx-auto rounded-xl shadow-xl overflow-hidden ${
             isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'max-w-5xl'
           }`}
           role="region"
           aria-label="Pitch deck presentation"
           onTouchStart={handleTouchStart}
           onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className={`p-6 md:p-10 h-full flex flex-col justify-center items-center ${slides[currentSlide].bg}`}
            >
              <h2
                className={`text-2xl md:text-4xl font-bold mb-6 text-center ${
                  slides[currentSlide].bg.includes('white') ? 'text-teal-600' : 'text-white'
                }`}
              >
                {slides[currentSlide].title}
              </h2>
              <div className="w-full max-w-4xl">{slides[currentSlide].content}</div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            ></div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-2 rounded-full disabled:opacity-50 hover:bg-teal-600 transition-colors shadow-lg"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide(currentSlide + 1)}
            disabled={currentSlide === slides.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-2 rounded-full disabled:opacity-50 hover:bg-teal-600 transition-colors shadow-lg"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Control buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {/* Slide Counter */}
            <div className="bg-white bg-opacity-80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow">
              {currentSlide + 1} / {slides.length}
            </div>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="bg-coral-500 text-white p-2 rounded-full hover:bg-coral-600 transition-colors shadow"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 space-x-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-teal-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center bg-gradient-to-r from-coral-500 to-yellow-400 text-white py-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold">About WaziGov</h1>
          <p className="text-lg mt-2">Empowering Women & Communities through Accessible Government Information</p>
        </div>
        <div className="space-y-6 text-gray-700">
          <h2 className="text-2xl font-semibold text-teal-500">Our Mission</h2>
          <p className="text-lg">
          WaziGov simplifies complex government documents into clear, multilingual summaries to empower African women (SDG 5) and underserved communities (SDG 10). By addressing literacy, language, and accessibility barriers, we ensure women understand their rights and communities access vital information.
          </p>
          <h2 className="text-2xl font-semibold text-teal-500">How We Address Hackathon Challenges</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              <strong>Impact</strong>: Empowers 500M+ African women with clear rights information, reducing gender and regional inequalities.
            </li>
            <li>
              <strong>Innovation</strong>: Uses AI (Hugging Face LLMs) for summarization and Web Speech API for text-to-speech, tailored for low-literacy and visually impaired users.
            </li>
            <li>
              <strong>Feasibility</strong>: Built with scalable tech (Next.js, Django) and tested with real documents (e.g., Uganda’s 2024/25 budget).
            </li>
            <li>
              <strong>Design</strong>: Vibrant, user-friendly UI with large fonts, high contrast, and intuitive navigation for all literacy levels.
            </li>
            <li>
              <strong>Presentation</strong>: Professional slide deck and clear messaging for judges, showcasing SDG alignment and user impact.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-teal-500">Alignment with SDGs</h2>
          <p className="text-lg">
            <strong>SDG 5 (Gender Equality)</strong>: WaziGov provides women with clear summaries of rights-related documents (e.g., healthcare policies), enabling informed decisions. Features like text-to-speech support visually impaired women.
          </p>
          <p className="text-lg">
            <strong>SDG 10 (Reduced Inequalities)</strong>: Multilingual summaries (English, Swahili) and region-specific access (e.g., Uganda, Kenya) ensure underserved communities are included.
          </p>
          <h2 className="text-2xl font-semibold text-teal-500">Join Us</h2>
          <p className="text-lg">
          WaziGov is more than an app—it’s a movement to empower communities. Join our{' '}
            <Link href="https://discord.gg/n5pcCHcGC6" target="_blank" className="text-coral-500 hover:underline">
              Discord
            </Link>{' '}
            to collaborate, contribute, or learn more!
          </p>
        </div>
      </div>
    </div>
  );
}