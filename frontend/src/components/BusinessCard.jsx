import React, { useState } from "react";
import {
  FaRedoAlt,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

const BusinessCard = ({ data, onRegenerate }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-[2px]">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-lg animate-pulse" />
        ))}
        {hasHalfStar && (
          <FaStarHalfAlt className="text-yellow-400 text-lg animate-pulse" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-300 text-lg opacity-80" />
        ))}
      </div>
    );
  };

  const handleRegenerate = async () => {
    setIsSpinning(true);
    await onRegenerate();
    setTimeout(() => setIsSpinning(false), 1000); // Reset spin after 1s
  };

  return (
    <div className="mt-10 w-full max-w-lg p-8 sm:p-10 rounded-[2rem] bg-white/75 backdrop-blur-xl border border-blue-100 shadow-[0_40px_80px_-20px_rgba(30,64,175,0.3)] transition-transform hover:-translate-y-1 hover:shadow-[0_60px_100px_-10px_rgba(30,64,175,0.35)] duration-500 relative overflow-hidden">

      {/* Subtle background gradient glow */}
      <div className="absolute inset-0 z-[-1] rounded-[2rem] bg-gradient-to-br from-blue-100 via-transparent to-purple-100 opacity-30 pointer-events-none" />

      <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-4 tracking-wide">
        📍 {data.name} – {data.location}
      </h2>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-gray-800 font-semibold text-base sm:text-lg">⭐ Rating:</span>
        {generateStars(data.rating)}
        <span className="text-sm text-gray-500">({data.rating})</span>
      </div>

      <p className="text-base sm:text-lg text-gray-800 font-medium mb-4">
        📝 <span className="font-semibold">Reviews:</span> {data.reviews}
      </p>

      <div className="mb-6">
        <p className="text-blue-700 font-semibold italic mb-1">💡 SEO Headline:</p>
        <p className="text-gray-800 bg-white/70 border border-blue-200 rounded-xl px-4 py-4 text-base shadow-inner leading-relaxed font-medium">
          “{data.headline}”
        </p>
      </div>

      <button
        onClick={handleRegenerate}
        className="relative w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white font-bold rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
      >
        <FaRedoAlt className={`${isSpinning ? "animate-spin" : ""}`} />
        Regenerate Headline
      </button>
    </div>
  );
};

export default BusinessCard;
