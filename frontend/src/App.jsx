import React, { useState } from "react";
import BusinessForm from "./components/BusinessForm";
import BusinessCard from "./components/BusinessCard";
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from "react-icons/fa";

const App = () => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBusinessData = async (name, location) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/business-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location }),
      });
      const data = await response.json();
      setBusinessData({ ...data, name, location });
    } catch (error) {
      console.error("Error fetching business data:", error);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    if (!businessData?.name || !businessData?.location) return;
    try {
      const res = await fetch(
        `http://localhost:5000/regenerate-headline?name=${businessData.name}&location=${businessData.location}`
      );
      const data = await res.json();
      setBusinessData((prev) => ({ ...prev, headline: data.headline }));
    } catch (error) {
      console.error("Error regenerating headline:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-12 bg-gradient-to-br from-zinc-900 via-black to-neutral-950 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-[-100px] left-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-14 tracking-wider z-10 leading-tight">
        Local Business <span className="text-white/80">Dashboard</span>
      </h1>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-10">
        <BusinessForm onSubmit={fetchBusinessData} />

        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <FaSpinner className="animate-spin text-white text-3xl" />
            <span className="ml-3 text-white font-semibold text-lg">Fetching insights...</span>
          </div>
        )}

        {businessData && !loading && (
          <BusinessCard
            data={businessData}
            onRegenerate={regenerateHeadline}
          />
        )}
      </div>
    </div>
  );
};

export default App;
