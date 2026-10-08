import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ServicesGrid from "@/components/ServicesGrid";
import CategoryTiles from "@/components/CategoryTiles";
import ReelRail from "@/components/ReelRail";
import ClientProof from "@/components/ClientProof";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <CategoryTiles />
      <ReelRail />
      <ClientProof />
      <HowItWorks />
      <Faq />
      <CtaBand />
      <Footer />
    </>
  );
}
