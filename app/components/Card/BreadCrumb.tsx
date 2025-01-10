'use client'
import React from "react"
import { RiArrowRightSLine, IoHomeOutline } from '../../utils/Icon'
import { useRouter } from "next/navigation"

const Breadcrumb = ({ name }: { name: string }) => {
  const router = useRouter()
  
  return (
    <div className="flex space-x-2 mt-6 border bg-surface-light rounded-md w-fit items-center justify-center px-4 py-1">
      <IoHomeOutline
        onClick={() => router.push('/')}
        className="w-4 h-4 cursor-pointer"
      />
      <RiArrowRightSLine />
      <p className="text-sm mt-1 font-monlam">{name}</p>
    </div>
  )
}

export default Breadcrumb