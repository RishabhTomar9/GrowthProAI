// src/App.jsx
import React from "react";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-12 bg-gradient-to-br from-zinc-900 via-black to-neutral-950 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-[-100px] left-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-14 tracking-wider z-10 leading-tight">
        Local Business <span className="text-white/80">Dashboard</span>
      </h1>

      {/* Dashboard Section */}
      <Dashboard />

      {/* Toast Notifications */}
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default App;
