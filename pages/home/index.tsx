import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function Home() {
  const HankoAuth = dynamic(
    // replace with path to your component using the <hanko-auth> element
    () => import('../../components/HankoAuth'),
    { ssr: false }
  );
  return (
    <Suspense fallback={'Loading ...'}>
      <HankoAuth />
    </Suspense>
  );
}
