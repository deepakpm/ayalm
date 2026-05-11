import Navbar from '../../components/Navbar';
import OfferingsHero from '../../components/OfferingsHero';
import TrustBadges from '../../components/TrustBadges';
import { Landmark, Users, Flame, ShieldCheck } from 'lucide-react';

const offeringsTrustBadges = [
  { icon: <Landmark size={28} />, title: '1000+', subtitle: 'Temples' },
  { icon: <Users size={28} />, title: '500K+', subtitle: 'Happy Devotees' },
  { icon: <Flame size={28} />, title: '50K+', subtitle: 'Poojas Performed' },
  { icon: <ShieldCheck size={28} />, title: '100%', subtitle: 'Safe & Secure' },
];

export default function OfferingsPage() {
  return (
    <main>
      <Navbar />
      <OfferingsHero />
      <TrustBadges badges={offeringsTrustBadges} />
    </main>
  );
}
