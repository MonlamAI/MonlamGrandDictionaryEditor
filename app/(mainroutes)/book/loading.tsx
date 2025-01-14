import React from 'react'

const Loading = () => {
  return (
    <div className=' ml-16 mt-2 w-screen h-screen'>
    <div className=' h-6 w-6 p-8 bg-slate-300 mb-4 '/>
  <div className=' bg-slate-300 animate-pulse p-4 w-80'/>
  <div className=' bg-slate-300 animate-pulse p-4 w-24 mt-4'/>
  <div className=' bg-slate-300 h-96 animate-pulse p-4 w-1/2 mt-4'/>
</div>
  )
}

export default Loading