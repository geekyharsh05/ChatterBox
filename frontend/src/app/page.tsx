import FeatureSection from "@/components/core/feature-section";
import Footer from "@/components/core/footer";
import HeroSection from "@/components/core/hero-section";
import Navbar from "@/components/core/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
