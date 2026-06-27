import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import PenSystemBanner from "./components/PenSystemBanner";
import HowItWorksSection from "./components/HowItWorksSection";
import ProductsSection from "./components/ProductsSection";
import TrustSection from "./components/TrustSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import StickyCtaBar from "./components/StickyCtaBar";
import AgeGateModal from "./components/AgeGateModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import SchemaOrg from "./components/SchemaOrg";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";

/** Einfaches URL-basiertes Routing ohne externe Abhängigkeiten */
function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  return pathname;
}

export default function App() {
  const pathname = usePathname();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(() => {
    return localStorage.getItem("peptidpen_age_confirmed") === "true";
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem("peptidpen_age_confirmed", "true");
    setAgeConfirmed(true);
  };

  // Rechtliche Seiten — kein Age-Gate, kein Sticky-Bar
  if (pathname === "/datenschutz") {
    return (
      <>
        <Datenschutz />
        <WhatsAppFloat />
      </>
    );
  }

  if (pathname === "/agb") {
    return (
      <>
        <AGB />
        <WhatsAppFloat />
      </>
    );
  }

  // Hauptseite
  return (
    <>
      <SchemaOrg />

      {!ageConfirmed && <AgeGateModal onConfirm={handleAgeConfirm} />}

      {/* Sticky CTA — erscheint nach 400px Scroll */}
      {showStickyBar && <StickyCtaBar />}

      <main>
        <HeroSection />
        <ProblemSection />
        <PenSystemBanner />
        <HowItWorksSection />
        <ProductsSection />
        <TrustSection />
        <FaqSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
