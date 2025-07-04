import React from "react";

const BusinessCard = ({ data, onRegenerate }) => {
  return (
    <div className="mt-8 w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-800 mb-3">
        {data.name} - {data.location}
      </h2>
      <p className="mb-2 text-gray-800 font-medium">⭐ Rating: {data.rating}</p>
      <p className="mb-2 text-gray-800 font-medium">📝 Reviews: {data.reviews}</p>
      <p className="mb-2 text-gray-700 font-semibold italic">💡 SEO Headline:</p>
      <p className="mb-4 text-gray-600 text-base">{data.headline}</p>
      <button
        onClick={onRegenerate}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-200"
      >
        Regenerate SEO Headline
      </button>
    </div>
  );
};

export default BusinessCard;