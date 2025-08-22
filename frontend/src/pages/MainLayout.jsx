import Sidebar from '../components/Sidebar';
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex md:flex-row flex-col">
      <Sidebar role="admin" /> 
      <main className="flex-1">
   
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
