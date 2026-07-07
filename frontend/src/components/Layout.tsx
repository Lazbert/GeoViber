import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";

const Layout: React.FC = () => {
  return (
    <div className="relative flex flex-col w-full min-h-screen bg-gradient-to-b from-black-olive via-gunmetal to-deep-space overflow-hidden">
      <div className="absolute inset-0 bg-[url('/cosmos-bg.jpg')] bg-cover bg-center opacity-15 pointer-events-none" />
      <NavigationBar />
      <div className="relative z-10 flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
