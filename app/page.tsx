import { FeaturedCategories } from "./components/home/FeaturedCategories";
import { TopSellingProducts } from "./components/home/TopSellingProducts";
import { HeroBanner } from "./components/hero/HeroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedCategories />
      <TopSellingProducts />
    </div>
  );
}
