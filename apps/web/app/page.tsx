import { cookies } from 'next/headers';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ConnectSection from '../components/ConnectSection';
import TemplesCarousel from '../components/TemplesCarousel';
import TrustBadges from '../components/TrustBadges';
import { configApi } from '../lib/api';

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('ayalam_lang')?.value || 'en';
  
  let config = { features: [], banners: [] };
  try {
    config = await configApi.getHome(lang.toUpperCase());
  } catch (err) {
    console.error("Failed to fetch home config server-side:", err);
  }

  return (
    <main>
      <Navbar />
      <Hero banners={config.banners} />
      <CategoryGrid features={config.features} />
      <ConnectSection />
      <TemplesCarousel />
      <TrustBadges />
    </main>
  );
}
