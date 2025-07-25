// src/components/Dashboard.jsx
import React, { useState } from "react";
import BusinessForm from "./BusinessForm";
import BusinessCard from "./BusinessCard";
import { FaSpinner, FaRedoAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://growthproai-gk8c.onrender.com"); // ✅ make sure this matches Render backend

const Dashboard = () => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);

  const fetchBusinessData = async (name, location) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/business-data`, {
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
            className="text-sm px-3 py-2 bg-white/20 text-white font-semibold border border-white/30 rounded hover:bg-white/30 flex items-center gap-2"
          >
            <FaRedoAlt />
          </button>
        </div>,
        {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        }
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
        `${API_BASE}/regenerate-headline?name=${businessData.name}&location=${businessData.location}`
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
    <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-10">
      <BusinessForm
        onSubmit={fetchBusinessData}
        disabled={!backendAvailable}
      />

      {loading && (
        <div
          className="mt-6 flex items-center justify-center"
          aria-live="polite"
        >
          <FaSpinner className="animate-spin text-white text-3xl" />
          <span className="ml-3 text-white font-semibold text-lg">
            Fetching insights...
          </span>
        </div>
      )}

      {businessData && !loading && (
        <BusinessCard
          data={businessData}
          onRegenerate={regenerateHeadline}
        />
      )}
    </div>
  );
};

export default Dashboard;
