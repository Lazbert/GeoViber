import NavigationBar from "@/components/NavigationBar";
import HeroSection from "./HeroSection";
import InteractiveEarth from "./InteractiveEarth";

const HomePage: React.FC = () => {
  return (
    <div className="relative flex flex-col w-full h-full bg-gradient-to-b from-black-olive to-gunmental overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cosmos-bg.jpg')] bg-cover bg-center opacity-20" />
        <NavigationBar />
        <div className="relative z-10 flex h-full justify-center items-center px-6 gap-[28px]">
            <HeroSection />
            <InteractiveEarth />
        </div>
    </div>
  );
};

export default HomePage;