import React from "react";

const FormLoadingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header with logo and title */}
      <div className="flex flex-col space-y-4">
        <div className="w-16 h-16 bg-orange-100 rounded-lg animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-96 animate-pulse" />
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Main title */}
      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-8" />

      {/* Form fields in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Left column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="w-40 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-48 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-36 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-44 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="w-40 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-36 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-44 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end mt-8">
        <div className="w-24 h-10 bg-blue-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default FormLoadingSkeleton;
