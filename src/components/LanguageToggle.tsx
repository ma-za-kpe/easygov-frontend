// src/components/LanguageToggle.tsx
'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = (lang: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('language', lang);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="relative">
      <select
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-teal-600 text-white border border-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="en">English</option>
        <option value="sw">Swahili</option>
      </select>
    </div>
  );
}