'use client';
import { Suspense } from 'react';
import LanguageToggle from './LanguageToggle';

export default function SuspenseLanguageToggle() {
  return (
    <Suspense fallback={<div>Loading language toggle...</div>}>
      <LanguageToggle />
    </Suspense>
  );
}