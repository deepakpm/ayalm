import Navbar from '../../../components/Navbar';
import TempleDetailLayout from '../../../components/TempleDetail/TempleDetailLayout';
import TrustBadges from '../../../components/TrustBadges';



import { cookies } from 'next/headers';
import { templeApi } from '../../../lib/api';

export default async function TempleDetailPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  
  const cookieStore = await cookies();
  const lang = cookieStore.get('ayalam_lang')?.value?.toUpperCase() || 'EN';
  
  let initialTemple = null;
  try {
    initialTemple = await templeApi.getBySlug(id, lang);
  } catch (error) {
    console.error("Failed to pre-fetch temple on server:", error);
  }

  const activeTab = tab || 'Overview';

  return (
    <main>
      <Navbar />
      <TempleDetailLayout id={id} initialTemple={initialTemple} activeTab={activeTab} />
      <TrustBadges className="temples-trust-badges" />
    </main>
  );
}
