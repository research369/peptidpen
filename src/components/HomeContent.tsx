import HeroSection from "./HeroSection";
import SystemExplainer from "./SystemExplainer";
import PenSystemBanner from "./PenSystemBanner";
import ProductsSection from "./ProductsSection";
import DiscountSection from "./DiscountSection";
import CheckoutSection from "./CheckoutSection";
import FaqSection from "./FaqSection";
import TravelTubeSection from "./TravelTubeSection";
import Footer from "./Footer";

export default function HomeContent() {
  return <><main><HeroSection /><SystemExplainer /><PenSystemBanner />
    <TravelTubeSection /><DiscountSection /><ProductsSection />
    <CheckoutSection /><FaqSection /></main><Footer /></>;
}
