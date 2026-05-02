import { Header } from "./components/Header";
import { NavbarCategories } from "./components/NavbarCategories";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <NavbarCategories />
      <main className="container-site flex-1 py-8">
        <p className="text-center text-muted-foreground">Home content</p>
      </main>
    </div>
  );
}
