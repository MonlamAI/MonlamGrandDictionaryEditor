import React from "react";

const RecipeFormLoading = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header section with logo and title */}
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

      {/* Status indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-blue-200 animate-pulse" />
        <div className="w-20 h-6 bg-blue-100 rounded-full animate-pulse" />
      </div>

      {/* Main title */}
      <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />

      {/* Toggle switches section */}
      <div className="space-y-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center justify-between">
          <div className="w-40 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Add section button */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <div className="w-24 h-10 bg-blue-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default RecipeFormLoading;
