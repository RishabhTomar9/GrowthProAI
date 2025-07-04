import React, { useState } from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

const BusinessForm = ({ onSubmit, disabled }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const showSuccessToast = (msg = "Submitted successfully!") => {
    toast.success(
      <div className="flex items-center gap-2">
        <FaCheckCircle className="text-green-200 text-lg" />
        <span>{msg}</span>
      </div>,
      {
        className: "bg-green-600 text-white font-medium",
        progressClassName: "bg-green-300",
        icon: false,
        autoClose: 3000,
      }
    );
  };

  const showErrorToast = (msg = "Oops! Fill the details first.") => {
    toast.error(
      <div className="flex items-center gap-2">
        <FaExclamationCircle className="text-red-200 text-lg" />
        <span>{msg}</span>
      </div>,
      {
        className: "bg-red-600 text-white font-medium",
        progressClassName: "bg-red-300",
        icon: false,
        autoClose: 2000,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim()) {
      showErrorToast("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const isSubmitted = await onSubmit(name, location);
      if (isSubmitted) {
        showSuccessToast("Business data submitted!");
        setSuccess(true);
        setName("");         // Clear only on success
        setLocation("");
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch {
      toast.error("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg p-10 sm:p-12 bg-white/75 backdrop-blur-2xl border border-blue-100 rounded-3xl shadow-[0_40px_60px_-15px_rgba(0,0,255,0.2)] hover:shadow-[0_60px_90px_-10px_rgba(0,0,255,0.3)] transition-all duration-500"
    >
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10 tracking-tight">
        Business Insight
      </h2>

      {/* Business Name */}
      <div className="mb-8">
        <label className="text-sm font-semibold text-blue-700 flex items-center gap-2 mb-2">
          <FaBuilding />
          Business Name
        </label>
        <input
          type="text"
          value={name}
          disabled={disabled}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-4 px-5 text-lg rounded-xl border border-blue-200 bg-white/80 shadow-inner focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 hover:shadow-lg"
          placeholder="e.g., Cake & Co"
          required
        />
      </div>

      {/* Location */}
      <div className="mb-10">
        <label className="text-sm font-semibold text-blue-700 flex items-center gap-2 mb-2">
          <FaMapMarkerAlt />
          Location
        </label>
        <input
          type="text"
          value={location}
          disabled={disabled}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full py-4 px-5 text-lg rounded-xl border border-blue-200 bg-white/80 shadow-inner focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 hover:shadow-lg"
          placeholder="e.g., Mumbai"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || disabled}
        className={`w-full flex items-center justify-center gap-3 text-white text-lg font-bold py-3 px-5 rounded-xl shadow-md bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-900 transition-all duration-300 active:scale-[0.98] ${
          loading || disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            Submitting...
          </>
        ) : success ? (
          <>
            <FaCheckCircle className="text-green-300" />
            Success!
          </>
        ) : (
          "Submit Business"
        )}
      </button>
    </form>
  );
};

export default BusinessForm;
