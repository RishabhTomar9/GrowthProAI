import React, { useState } from "react";
import BusinessForm from "./components/BusinessForm";
import BusinessCard from "./components/BusinessCard";

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center uppercase tracking-wide">
        Local Business Dashboard
      </h1>
      <BusinessForm onSubmit={fetchBusinessData} />
      {loading && <p className="text-blue-500 mt-4 font-medium">Loading...</p>}
      {businessData && (
        <BusinessCard
          data={businessData}
          onRegenerate={regenerateHeadline}
        />
      )}
    </div>
  );
};

export default App;