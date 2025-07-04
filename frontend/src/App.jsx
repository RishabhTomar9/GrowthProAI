import React, { useState } from "react";
import BusinessForm from "./components/BusinessForm";
import BusinessCard from "./components/BusinessCard";
import { FaSpinner, FaRedoAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);

  const fetchBusinessData = async (name, location) => {
    setLoading(true);
    try {
      const response = await fetch("/business-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      setBusinessData({ ...data, name, location });
      setBackendAvailable(true);
      return true;
    } catch (error) {
      console.error("Error fetching business data:", error.message);
      setBackendAvailable(false);
      toast.error(
        <div className="flex justify-between items-center gap-4">
          <span>Something went wrong. Please try again....</span>
          <button
            onClick={() => fetchBusinessData(name, location)}
            className="text-sm px-4 py-3 bg-white/20 text-white font-semibold border border-white/30 rounded-md hover:bg-white/30 transition duration-200"
            >
          <FaRedoAlt/>  
          </button>
        </div>,
        { autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true, }
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    if (!businessData?.name || !businessData?.location) return;

    try {
      const response = await fetch(
        `/regenerate-headline?name=${businessData.name}&location=${businessData.location}`
      );

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      setBusinessData((prev) => ({ ...prev, headline: data.headline }));
      toast.success("SEO headline regenerated!");
    } catch (error) {
      console.error("Error regenerating headline:", error);
      toast.error("❌ Could not regenerate headline.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-12 bg-gradient-to-br from-zinc-900 via-black to-neutral-950 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-[-100px] left-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-14 tracking-wider z-10 leading-tight">
        Local Business <span className="text-white/80">Dashboard</span>
      </h1>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-10">
        <BusinessForm onSubmit={fetchBusinessData} disabled={!backendAvailable} />

        {loading && (
          <div className="mt-6 flex items-center justify-center" aria-live="polite">
            <FaSpinner className="animate-spin text-white text-3xl" />
            <span className="ml-3 text-white font-semibold text-lg">
              Fetching insights...
            </span>
          </div>
        )}

        {businessData && !loading && (
          <BusinessCard data={businessData} onRegenerate={regenerateHeadline} />
        )}
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default App;
