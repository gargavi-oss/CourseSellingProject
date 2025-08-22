import { BarChart3, BookOpen, LogOut, Users, Menu } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin"; 
    }
    return location.pathname.startsWith(path);
  };
  

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/courses", label: "Courses", icon: BookOpen },
    { path: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <>
     
      <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
        <h2 className="text-xl font-bold text-indigo-600">Admin</h2>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <aside className="hidden md:flex w-64 bg-white p-6 flex-col justify-between border-r">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-8">
            Admin Dashboard
          </h2>
          <nav className="space-y-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 font-medium ${
                  isActive(path)
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                <Icon className="w-5 h-5" /> {label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={logOut}
          className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      <AnimatePresence>
        {open && (
         <motion.aside
         initial={{ x: "-100%" }}
         animate={{ x: 0 }}
         exit={{ x: "-100%" }}
         transition={{ type: "tween" }}
         className="fixed inset-y-0 left-0 w-64 bg-white p-6 flex flex-col justify-between shadow-lg z-50"
       >
         <div>
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold text-indigo-600">Admin Dashboard</h2>
             <button onClick={() => setOpen(false)}>
               <Menu className="w-6 h-6 text-gray-700" /> {/* acts as close */}
             </button>
           </div>
           
           <nav className="space-y-4">
             {navItems.map(({ path, label, icon: Icon }) => (
               <button
                 key={path}
                 onClick={() => {
                   navigate(path);
                   setOpen(false);
                 }}
                 className={`flex items-center gap-2 font-medium ${
                   isActive(path)
                     ? "text-indigo-600"
                     : "text-gray-600 hover:text-indigo-600"
                 }`}
               >
                 <Icon className="w-5 h-5" /> {label}
               </button>
             ))}
           </nav>
         </div>
       
         <button
           onClick={() => {
             logOut();
             setOpen(false);
           }}
           className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800"
         >
           <LogOut className="w-5 h-5" /> Logout
         </button>
       </motion.aside>
       
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
