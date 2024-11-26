import FeatureSection from "@/components/core/feature-section";
import Footer from "@/components/core/footer";
import HeroSection from "@/components/core/hero-section";
import Navbar from "@/components/core/navbar";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session?.user} />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
