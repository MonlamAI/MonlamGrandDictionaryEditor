'use client'
import ReactPortal from '@/app/Wrapper/ReactPortal'
import React, { useEffect } from 'react'

const PersonModal = ({isOpen, handleClose}:any) => {
    //disable scroll
    useEffect(() => {
       document.body.style.overflow = 'hidden'
       return () => {
         document.body.style.overflow = 'unset'
       }
    }, [isOpen])
  if(!isOpen) return null
  return (
    <ReactPortal wrapperId="modal-wrapper">
    <div className=' fixed top-0 left-0 w-screen h-screen bg-neutral-800 bg-opacity-50 z-50 flex items-center justify-center'>
        <div className='w-full max-w-md bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold'>གནས་ཡུལ་གསར་བསྡུས།</h2>
                <button onClick={handleClose} className='text-black bg-white p-2 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

        </div>
    </div>
    </ReactPortal>
  )
}

export default PersonModal