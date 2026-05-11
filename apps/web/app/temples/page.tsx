import Navbar from '../../components/Navbar';
import TemplesDirectory from '../../components/TemplesDirectory';
import TrustBadges from '../../components/TrustBadges';
import { Landmark, ShieldCheck, HeadphonesIcon } from 'lucide-react';

const templeTrustBadges = [
  { icon: <Landmark size={28} />, title: '1000+ Temples', subtitle: 'Across Tamil Nadu' },
  { icon: <span style={{ fontSize: '28px' }}>🙏</span>, title: 'Verified Priests', subtitle: 'Poojas performed as per Agama' },
  { icon: <ShieldCheck size={28} />, title: 'Secure & Trusted', subtitle: 'Trusted by 5L+ Devotees' },
  { icon: <HeadphonesIcon size={28} />, title: 'Support 24/7', subtitle: 'We are here to help you' },
];

export default function TemplesPage() {
  return (
    <main>
      <Navbar />
      <TemplesDirectory />
      <TrustBadges badges={templeTrustBadges} className="temples-trust-badges" />
    </main>
  );
}
