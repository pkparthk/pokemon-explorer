import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-8 border-red-600 border-t-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full"></div>
      </div>
      <p className="mt-6 text-xl font-semibold text-gray-700">
        Loading Pokémon...
      </p>
    </div>
  );
};

export default LoadingSpinner;
