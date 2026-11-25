import { useState, useEffect } from "react";
import HomeContent from "./components/HomeContent";
import StickyCtaBar from "./components/StickyCtaBar";
import AgeGateModal from "./components/AgeGateModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import SchemaOrg from "./components/SchemaOrg";
import CookieBanner from "./components/CookieBanner";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Impressum from "./pages/Impressum";
import Checkout from "./pages/Checkout";

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
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const onError = () => setStorageError(true);
    window.addEventListener("peptidpen-cart-storage-error", onError);
    return () => window.removeEventListener("peptidpen-cart-storage-error", onError);
  }, []);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(() => {
    try { return localStorage.getItem("peptidpen_age_confirmed") === "true"; }
    catch { return false; }
  });

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAgeConfirm = () => {
    try { localStorage.setItem("peptidpen_age_confirmed", "true"); } catch { /* Session-only confirmation. */ }
    setAgeConfirmed(true);
  };

  if (pathname === "/datenschutz") {
    return <><Datenschutz /><WhatsAppFloat /></>;
  }

  if (pathname === "/agb") {
    return <><AGB /><WhatsAppFloat /></>;
  }
  if (pathname === "/impressum") return <Impressum />;
  if (pathname === "/checkout") return <Checkout />;

  return (
    <>
      <SchemaOrg />
      {storageError && <div role="alert" className="fixed top-0 left-0 right-0 z-[10000] bg-amber-100 text-slate-900 p-4">Dein Browser konnte die Auswahl nicht speichern. Bitte erlaube den lokalen Website-Speicher, bevor du weiter auswählst.</div>}
      {!ageConfirmed && <AgeGateModal onConfirm={handleAgeConfirm} />}
      {showStickyBar && <StickyCtaBar />}

      <HomeContent />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
