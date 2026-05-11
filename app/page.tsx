import { FeaturedCategories } from "./components/home/FeaturedCategories";
import { HomeDatesShowcase, HomeHoneyShowcase } from "./components/home/HomeCategoryProductStrips";
import { OurBrands } from "./components/home/OurBrands";
import { TopSellingProducts } from "./components/home/TopSellingProducts";
import { HeroBanner } from "./components/hero/HeroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedCategories />
      <TopSellingProducts />
      <OurBrands />
      <HomeHoneyShowcase />
      <HomeDatesShowcase />
    </div>
  );
}
