import { FeaturedCategories } from "./components/home/FeaturedCategories";
import { HeroBanner } from "./components/hero/HeroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedCategories />
      <div className="container-site py-8">
        <p className="text-center text-muted-foreground">Home content</p>
      </div>
    </div>
  );
}
