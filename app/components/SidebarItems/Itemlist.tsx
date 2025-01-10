import React from 'react';
import Status from '../Status';

export interface ItemlistProps {
    searchQuery: string;
  }
const Itemlist: React.FC<ItemlistProps> = ({ searchQuery }) => {
  const dummyList = [
    {
      id: 1,
      itemName: "ཀ་བ་",
      states: "pending"
    },
    {
      id: 2,
      itemName: "ཀྱོག་ཀྱང་",
      states: "reviewed"
    },
    {
      id: 3,
      itemName: "ཀུན་སློང་",
      states: "pending"
    },
    {
      id: 4,
      itemName: "བསྟན་བཅོས་",
      states: "pending"
    },
  ];

  const filteredList = dummyList.filter(item =>
    item.itemName.includes(searchQuery)
  );

  return (
    <div className='mt-4 h-80 bg-secondary-700 overflow-y-scroll rounded-md'>
      <div className='space-y-2'>
        {filteredList.map((data) => (
          <div key={data.id} className='border-b border-secondary-500 p-2'>
            <div className='flex items-center justify-between cursor-pointer font-monlam'>
              {data.itemName}
              <Status statustype={data.states}/> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemlist;