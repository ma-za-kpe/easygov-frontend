// src/app/women/page.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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

    console.log(isMobile)
    
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

  const slides = [
    {
      title: 'WaziGov',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 px-6 h-full">
          <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-xl">
            <i className="fas fa-hands-helping text-6xl text-teal-600"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
            Clear Policies, Empowered Women
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white drop-shadow-md">
            Transforming Lives for SDG 5 & 10
          </h2>
          <p className="text-xl text-white bg-black bg-opacity-20 px-4 py-2 rounded-lg">
            Maku Mazakpe | Arua, Uganda | GNEC Hackathon 2025
          </p>
          <p className="text-2xl italic text-white font-medium drop-shadow-md">
            "Empowering Every Woman to Know Her Rights"
          </p>
        </div>
      ),
      bg: 'bg-gradient-to-br from-teal-700 to-coral-700',
      style: {
        position: 'relative',
        overflow: 'hidden',
      },
      after: `
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.15;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(255, 255, 255, 0.2) 50px,
            rgba(255, 255, 255, 0.2) 100px
          );
          z-index: 0;
        }
      `,
    },
    {
      title: 'The Problem',
      content: (
        <div className="px-6 h-full">
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Why Women Miss Out
            </h2>
            <h3 className="text-xl md:text-2xl font-medium text-gray-700">
              Barriers to Government Policies in Uganda
            </h3> */}
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-center bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-teal-100 rounded-full mr-4">
                  <i className="fas fa-file-alt text-2xl text-teal-600"></i>
                </div>
                <span>Dense, jargon-heavy documents exclude 75% of women</span>
              </li>
              <li className="flex items-center bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-teal-100 rounded-full mr-4">
                  <i className="fas fa-language text-2xl text-teal-600"></i>
                </div>
                <span>Only 20% of Ugandans speak English fluently</span>
              </li>
              <li className="flex items-center bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-teal-100 rounded-full mr-4">
                  <i className="fas fa-book text-2xl text-teal-600"></i>
                </div>
                <span>30% of rural women have no formal education</span>
              </li>
              <li className="flex items-center bg-white p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-teal-100 rounded-full mr-4">
                  <i className="fas fa-wifi text-2xl text-teal-600"></i>
                </div>
                <span>Limited internet (10% rural access) isolates communities</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      bg: '#1e3a8a',
      style: {
        position: 'relative',
      },
      titleStyle: {
        color: '#1e3a8a', // Blue-900 color for visibility against light backgrounds
        fontWeight: 'bold'
      }
    },
    {
      title: 'Our Solution: WaziGov',
      content: (
        <div className="px-6 h-full">
          <div className="space-y-4 max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg">
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-robot text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">AI-powered summaries of complex budgets</span>
              </li>
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-language text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">Translated into Swahili, Luganda, and more</span>
              </li>
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-volume-up text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">Audio summaries for low-literacy users</span>
              </li>
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-globe text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">Accessible via app, SMS, and radio</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      bg: 'bg-gradient-to-br from-teal-700 to-teal-600',
      style: {
        position: 'relative',
      },
      after: `
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background: repeating-linear-gradient(
            135deg,
            transparent,
            transparent 50px,
            rgba(255, 255, 255, 0.2) 50px,
            rgba(255, 255, 255, 0.2) 100px
          );
          z-index: 0;
        }
      `,
    },
    {
      title: 'Market Opportunity',
      content: (
        <div className="flex flex-col items-center text-center space-y-6 px-6 h-full">
          <div className="flex items-center justify-center w-28 h-28 bg-teal-600 rounded-full shadow-xl mb-4">
            <i className="fas fa-chart-line text-5xl text-white"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            A Growing Opportunity
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-4">
            Empowering Africa's Women
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-teal-600">
              <div className="flex items-center justify-center min-w-16 h-16 bg-teal-100 rounded-full mr-4">
                <i className="fas fa-users text-3xl text-teal-600"></i>
              </div>
              <span className="text-xl text-gray-700 font-medium">12M women in Uganda</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-teal-600">
              <div className="flex items-center justify-center min-w-16 h-16 bg-teal-100 rounded-full mr-4">
                <i className="fas fa-globe text-3xl text-teal-600"></i>
              </div>
              <span className="text-xl text-gray-700 font-medium">300M in East Africa</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-coral-600">
              <div className="flex items-center justify-center min-w-16 h-16 bg-teal-100 rounded-full mr-4">
                <i className="fas fa-coins text-3xl text-teal-600"></i>
              </div>
              <span className="text-xl text-gray-700 font-medium">$360B gender equality market</span>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-coral-600">
              <div className="flex items-center justify-center min-w-16 h-16 bg-teal-100 rounded-full mr-4">
                <i className="fas fa-phone text-3xl text-teal-600"></i>
              </div>
              <span className="text-xl text-gray-700 font-medium">70% mobile penetration</span>
            </div>
          </div>
        </div>
      ),
      bg: 'bg-gradient-to-br from-teal-50 to-teal-500',
      style: {
        position: 'relative',
      },
      titleStyle: {
        color: '#1e3a8a', // Blue-900 color for visibility against light backgrounds
        fontWeight: 'bold'
      }
    },
    {
      title: 'Business Model',
      content: (
        <div className="px-6 h-full">
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              Sustainable Impact
            </h2>
            <h3 className="text-xl md:text-2xl font-medium text-white drop-shadow-md">
              How WaziGov Thrives
            </h3> */}
            <ul className="space-y-4 text-lg">
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-unlock text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">Free access to summaries and audio</span>
              </li>
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-star text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">Premium features (e.g., personalized alerts)</span>
              </li>
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-handshake text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">NGO grants (e.g., GNEC, UN Women)</span>
              </li>
              <li className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg shadow-md">
                <div className="flex items-center justify-center min-w-12 h-12 bg-white rounded-full mr-4">
                  <i className="fas fa-hand-holding-usd text-2xl text-yellow-500"></i>
                </div>
                <span className="text-yellow-500 font-medium">Government partnerships for policy dissemination</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      bg: 'bg-gradient-to-br from-coral-700 to-coral-600',
      style: {
        position: 'relative',
      },
      after: `
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(255, 255, 255, 0.2) 50px,
            rgba(255, 255, 255, 0.2) 100px
          );
          z-index: 0;
        }
      `,
    },
    {
      title: 'Technology Stack',
      content: (
        <div className="px-6 h-full">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Built to Scale
            </h2>
            <h3 className="text-xl md:text-2xl font-medium text-gray-700">
              WaziGov's Tech Powerhouse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-green-500">
                <div className="flex items-center justify-center min-w-14 h-14 bg-green-100 rounded-full mr-4">
                  <i className="fab fa-python text-3xl text-green-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">Django & PostgreSQL</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-purple-500">
                <div className="flex items-center justify-center min-w-14 h-14 bg-purple-100 rounded-full mr-4">
                  <i className="fas fa-brain text-3xl text-purple-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">Hugging Face NLP</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-red-500">
                <div className="flex items-center justify-center min-w-14 h-14 bg-red-100 rounded-full mr-4">
                  <i className="fas fa-tasks text-3xl text-red-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">Celery & Redis</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-center min-w-14 h-14 bg-blue-100 rounded-full mr-4">
                  <i className="fas fa-volume-up text-3xl text-blue-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">Text-to-Speech API</span>
              </div>
            </div>
          </div>
        </div>
      ),
      bg: 'bg-gradient-to-br from-yellow-50 to-yellow-500',
      style: {
        position: 'relative',
      },
      titleStyle: {
        color: '#1e3a8a', // Blue-900 color for visibility against light backgrounds
        fontWeight: 'bold'
      }
    },
    {
      title: 'Impact (SDG 5 & 10)',
      content: (
        <div className="px-6 h-full">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              Empowering Communities
            </h2>
            <h3 className="text-xl md:text-2xl font-medium text-white drop-shadow-md">
              Advancing SDG 5 & 10
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-center min-w-14 h-14 bg-pink-100 rounded-full mr-4">
                  <i className="fas fa-venus text-3xl text-pink-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">Gender Equality (SDG 5)</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-center min-w-14 h-14 bg-blue-100 rounded-full mr-4">
                  <i className="fas fa-balance-scale text-3xl text-blue-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">Reduced Inequalities (SDG 10)</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-center min-w-14 h-14 bg-green-100 rounded-full mr-4">
                  <i className="fas fa-users text-3xl text-green-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">100,000 users by 2026</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-center min-w-14 h-14 bg-yellow-100 rounded-full mr-4">
                  <i className="fas fa-handshake text-3xl text-yellow-600"></i>
                </div>
                <span className="text-lg text-gray-700 font-medium">10+ NGO partnerships</span>
              </div>
            </div>
          </div>
        </div>
      ),
      bg: 'bg-gradient-to-br from-teal-700 to-teal-600',
      style: {
        position: 'relative',
      },
      after: `
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background: repeating-linear-gradient(
            135deg,
            transparent,
            transparent 50px,
            rgba(255, 255, 255, 0.2) 50px,
            rgba(255, 255, 255, 0.2) 100px
          );
          z-index: 0;
        }
      `,
    },
    {
      title: 'Our Team',
      content: (
        <div className="flex flex-col items-center px-6 h-full">
          <div className="flex items-center justify-center w-28 h-28 bg-teal-600 rounded-full shadow-xl mb-6">
            <i className="fas fa-users text-5xl text-white"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-6">
            Meet Our Dedicated Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {[
              { name: 'Maku Mazakpe', role: 'TechLead', linkedin: 'https://www.linkedin.com/in/maku-mazakpe-700a3a165/' },
              { name: 'Sarah Ajekwe', role: 'Marketing', linkedin: 'https://www.linkedin.com/in/kadoon-ajekwe/' },
              { name: 'Awadifo Jeninga', role: 'Head of Community', linkedin: 'https://www.linkedin.com/in/awadifo-jeninga-384072158/' }
            ].map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-teal-600"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-coral-600 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <p className="text-xl font-bold text-teal-700 mb-1">{member.name}</p>
                <p className="text-lg text-gray-600 mb-3">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-lg font-medium hover:bg-blue-200 transition-colors"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                >
                  <i className="fab fa-linkedin mr-2"></i> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      ),
      bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      style: {
        position: 'relative',
      },
      titleStyle: {
        color: '#1e3a8a', // Blue-900 color for visibility against light backgrounds
        fontWeight: 'bold'
      }
    },
    {
      title: 'Roadmap',
      content: (
        <div className="px-6 py-8 h-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <i className="fas fa-road text-3xl text-teal-500"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md mb-3">
            Our Vision for Impact
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-white drop-shadow-md mb-10">
            Key Features Driving WaziGov’s Mission for SDG 5 & 10
          </h3>
          
          <div className="w-full max-w-5xl">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  icon: 'sms',
                  title: 'SMS Integration',
                  desc: 'Offline policy summaries via SMS (e.g., “Text HEALTH to 1234”), vital for rural areas with 10% internet access.',
                },
                {
                  icon: 'language',
                  title: 'Expanded Languages',
                  desc: 'Lugbara, Acholi, Runyankole added, with AI translation for 10+ African languages.',
                },
                {
                  icon: 'share-alt',
                  title: 'Social Media',
                  desc: 'TikTok/YouTube channels for audio summaries, engaging urban youth.',
                },
                {
                  icon: 'broadcast-tower',
                  title: 'Radio Partnerships',
                  desc: 'Broadcasts on Radio Pacis reach low-literacy users without phones.',
                },
                {
                  icon: 'bell',
                  title: 'Policy Alerts',
                  desc: 'AI-driven notifications for relevant policies via app and SMS.',
                },
                {
                  icon: 'comments',
                  title: 'Community Feedback',
                  desc: 'SMS/app feedback refines summaries, fostering ownership.',
                },
                {
                  icon: 'mobile-alt',
                  title: 'Offline App',
                  desc: 'React Native app with offline caching for low-connectivity areas.',
                },
  
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 border-t-2 border-yellow-400"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-white text-coral-600 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <i className={`fas fa-${item.icon} text-xl text-yellow-500`}></i>
                    </div>
                    <p className="text-teal-600 font-medium text-lg">{item.title}</p>
                  </div>
                  <p className="text-teal-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      bg: 'bg-gradient-to-br from-coral-600 to-teal-600',
      style: {
        position: 'relative',
        overflow: 'hidden',
      },
      after: `
        &::after {
          content: "\\f018";
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          color: white;
          font-size: 100px;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(255, 255, 255, 0.2) 50px,
            rgba(255, 255, 255, 0.2) 100px
          );
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 0;
        }
      `,
    },
    {
      title: 'Join Us!',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 px-6 h-full">
          <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-xl">
            <i className="fas fa-hands-helping text-6xl text-teal-600"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
            Empower Women with WaziGov
          </h2>
          <h3 className="text-xl md:text-2xl font-medium text-white drop-shadow-md">
            Support Us at GNEC Hackathon 2025
          </h3>
          <div className="bg-white p-4 rounded-lg max-w-xl">
            <p className="text-xl text-teal-500 font-medium">
              Seeking $10,000 to Reach 100,000 Women
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/maku-mazakpe/"
            target="_blank"
            className="inline-flex items-center bg-yellow-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-yellow-600 transition-all"
            aria-label="Join our Discord community"
          >
            <i className="fab fa-linkedin mr-3 text-2xl"></i> Follow On LinkedIn
          </a>
        </div>
      ),
      bg: 'bg-gradient-to-br from-coral-700 to-teal-700',
      style: {
        position: 'relative',
      },
      after: `
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background: repeating-linear-gradient(
            135deg,
            transparent,
            transparent 50px,
            rgba(255, 255, 255, 0.2) 50px,
            rgba(255, 255, 255, 0.2) 100px
          );
          z-index: 0;
        }
      `,
    }
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