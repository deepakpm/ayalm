import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ConnectSection from '../components/ConnectSection';
import TemplesCarousel from '../components/TemplesCarousel';
import TrustBadges from '../components/TrustBadges';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CategoryGrid />
      <ConnectSection />
      <TemplesCarousel />
      <TrustBadges />
    </main>
  );
}
