import React from 'react';

const DetailsPopup = ({ 
  person, 
  type 
}: { 
  person: any; 
  type: 'person' | 'publisher';
}) => {
  // Check if we should show publisher view
  if (type === 'publisher') {
    return (
      <div className="absolute z-20 bg-white border border-black shadow-lg p-2 w-44 -translate-x-full">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between w-full">
            <p className="text-secondary-600">གནས་ཡུལ།</p>
            <span className="font-monlam px-4 py-1 text-secondary-400 bg-secondary-50 rounded-lg">
              {person.location ?? "null"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default person view
  return (
    <div className="absolute z-20 bg-white border border-black shadow-lg p-2 w-44 -translate-x-full">
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between w-full">
          <p className="text-secondary-600">སྐྱེས་ལོ།</p>
          <span className="font-inter px-4 py-1 text-secondary-400 bg-secondary-50 rounded-lg">
            {person.year_of_birth ?? "null"}
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-secondary-600">འདས་ལོ།</p>
          <span className="font-inter px-4 py-1 text-secondary-400 bg-secondary-50 rounded-lg">
            {person.year_of_death ?? "null"}
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-secondary-600">མི་རིགས།</p>
          <span className="font-monlam px-4 py-1 text-secondary-400 bg-secondary-50 rounded-lg">
            {person.nationality ?? "null"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;