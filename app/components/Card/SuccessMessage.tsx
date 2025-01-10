import React from 'react'
import {RxCross2,SiTicktick} from "../../utils/Icon";
const SuccessMessage = () => {
  return (
    <div className='flex flex-col items-center text-success-800 px-2 py-3 rounded-md justify-between font-inter text-sm absolute bottom-28 right-10 bg-success-50'>
    <div className=' flex w-full items-center justify-between' >
      <div className=' font-semibold space-x-2 flex items-center justify-center'>
      <SiTicktick/>  
      <p>Submitted Successfully</p>
      </div>
      <div>
        <RxCross2/>
      </div>
        </div>
        <p className='text-xs font-normal px-6'>The text has been successfully added in the Database</p>
        </div>
  )
}

export default SuccessMessage