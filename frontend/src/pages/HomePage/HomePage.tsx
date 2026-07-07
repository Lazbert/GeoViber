import HeroSection from "./HeroSection";
import InteractiveEarth from "./InteractiveEarth";

const HomePage: React.FC = () => {
  return (
    <main className="relative flex flex-col lg:flex-row flex-1 items-center justify-center gap-10 lg:gap-16 px-6 sm:px-10 py-10 lg:py-0">
      <HeroSection />
      <InteractiveEarth />
    </main>
  );
};

export default HomePage;
