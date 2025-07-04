import React, { useState } from "react";

const BusinessForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && location) {
      onSubmit(name, location);
    } else {
      alert("Please enter both business name and location.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-3xl duration-300 animate-fade-in"
    >
      <div className="mb-6">
        <label className="block text-gray-800 text-lg font-bold mb-2">
          Business Name
        </label>
        <input
          type="text"
          className="w-full p-3 sm:p-4 text-base border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Cake & Co"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 text-lg font-bold mb-2">
          Location
        </label>
        <input
          type="text"
          className="w-full p-3 sm:p-4 text-base border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Mumbai"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-xl transition duration-300"
      >
        🚀 Submit
      </button>
    </form>
  );
};

export default BusinessForm;
