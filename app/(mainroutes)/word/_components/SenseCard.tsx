import React from 'react'
import {  FaEdit } from "@/app/utils/Icon";
const SenseCard = ( {sense, handleEditSense}:{sense:any,handleEditSense:(sense:any)=>void}) => {
  return (
    <div key={sense.id} className=" p-2 bg-primary-100 font-monlam text-sm border-b border-black">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">འགྲེལ་བ། {sense.description}</h3>
              </div>
              <button
                onClick={() => handleEditSense(sense)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
          </div>
  )
}

export default SenseCard