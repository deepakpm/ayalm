import Navbar from '../../components/Navbar';
import TemplesDirectory from '../../components/TemplesDirectory';
import TrustBadges from '../../components/TrustBadges';

export default function TemplesPage() {
  return (
    <main>
      <Navbar />
      <TemplesDirectory />
      <TrustBadges className="temples-trust-badges" />
    </main>
  );
}
