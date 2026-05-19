import { cookies } from 'next/headers';
import Navbar from '../../components/Navbar';
import TemplesDirectory from '../../components/TemplesDirectory';
import TrustBadges from '../../components/TrustBadges';
import { templeApi } from '../../lib/api';

export default async function TemplesPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('ayalam_lang')?.value || 'en';
  
  let initialTemples = [];
  try {
    const data = await templeApi.getAll({ lang: lang.toUpperCase() });
    initialTemples = Array.isArray(data) ? data : (data.items || []);
  } catch (err) {
    console.error("Failed to fetch temples server-side:", err);
  }

  return (
    <main>
      <Navbar />
      <TemplesDirectory initialTemples={initialTemples} />
      <TrustBadges className="temples-trust-badges" />
    </main>
  );
}
