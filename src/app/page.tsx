import { Suspense } from 'react';
import SearchParamsWrapper from '../components/SearchParamsWrapper';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper />
    </Suspense>
  );
}