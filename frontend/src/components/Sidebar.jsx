import { BarChart3, BookOpen, LogOut, Users, Menu } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/courses", label: "Courses", icon: BookOpen },
    { path: "/admin/users", label: "Users", icon: Users },
  ];

  if (role?.toLowerCase() !== "admin") {
    return <div className="p-4 text-lg text-gray-700">hello</div>;
  }

  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col justify-between h-full">
     
      <div>
        <h2 className="text-2xl font-extrabold text-indigo-600 mb-10 tracking-wide">
          Admin Panel
        </h2>
        <nav className="space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              key={path}
              onClick={() => {
                navigate(path);
                onClose?.();
              }}
              className={`flex w-full items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                isActive(path)
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <Icon className="w-5 h-5" /> {label}
            </motion.button>
          ))}
        </nav>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          logOut();
          onClose?.();
        }}
        className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800"
      >
        <LogOut className="w-5 h-5" /> Logout
      </motion.button>
    </div>
  );

  return (
    <>
     
      <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
        <h2 className="text-xl font-bold text-indigo-600">Admin</h2>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <aside className="hidden md:flex w-64 bg-white/90 backdrop-blur-md border-r p-6 shadow-lg">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 left-0 w-64 bg-white p-6 shadow-xl z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-indigo-600">
                Admin Dashboard
              </h2>
              <button onClick={() => setOpen(false)}>
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <SidebarContent onClose={() => setOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
