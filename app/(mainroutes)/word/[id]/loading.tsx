import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with icon and title */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-orange-100 rounded-lg animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-96 animate-pulse" />
      </div>

      {/* Status section */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <div className="w-3 h-3 rounded-full bg-blue-200 animate-pulse" />
          <div className="w-20 h-6 bg-blue-100 rounded-full animate-pulse" />
        </div>
        <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Content sections */}
      <div className="space-y-6">
        {/* First expandable section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Second expandable section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
