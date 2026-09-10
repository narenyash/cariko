import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import CategoryTiles from "@/components/CategoryTiles";
import ReelRail from "@/components/ReelRail";
import ClientProof from "@/components/ClientProof";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Hero />
      <TrustStrip />
      <CategoryTiles />
      <ReelRail />
      <ClientProof />
      <HowItWorks />
      <Footer />
    </>
  );
}
