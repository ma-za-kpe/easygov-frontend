'use client';
import Link from 'next/link';
import { useState } from 'react';
import SuspenseLanguageToggle from './SuspenseLanguageToggle'; // Updated import

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-teal-500 text-white p-4 sticky top-0 z-10 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          WaziGov
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        <ul
          className={`md:flex md:space-x-6 ${
            isOpen ? 'block' : 'hidden'
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-teal-500 md:bg-transparent p-4 md:p-0 transition-all duration-300`}
        >
          <li>
            <Link
              href="/"
              className="block py-2 md:py-0 hover:text-yellow-400 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/women"
              className="block py-2 md:py-0 hover:text-yellow-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/regions"
              className="block py-2 md:py-0 hover:text-yellow-400 transition-colors"
            >
              Regions
            </Link>
          </li>
          <li>
            <SuspenseLanguageToggle /> {/* Updated to use Suspense wrapper */}
          </li>
        </ul>
      </nav>
    </header>
  );
}