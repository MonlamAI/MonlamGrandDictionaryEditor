import React from 'react'
const Status = ({statustype}:{statustype:string}) => {
  return (
    <div className={`flex  w-28 font-inter items-center font-semibold space-x-2 justify-center text-xs ${statustype=="pending"?"bg-secondary-100 text-secondary-700":" bg-success-100 text-success-600"}   px-4 py-1.5 rounded-full`}>
      <div className={`flex-shrink-0 rounded-full w-3 h-3 border-2 ${statustype=="pending"?"border-secondary-300 bg-secondary-600":"border-success-300 bg-success-600"}  `}/>
     {
        statustype == "pending"?<p>Pending</p>: <p>Reviewed</p>
     }
    </div>
  )
}

export default Status