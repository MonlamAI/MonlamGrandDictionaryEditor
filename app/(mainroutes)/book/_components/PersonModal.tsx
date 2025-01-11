'use client'
import React, { useEffect } from 'react'
import ReactPortal from '@/app/Wrapper/ReactPortal'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { createPerson } from "@/app/actions/PostActions"
import { typeofMinaOptions } from "@/app/utils/util"
import { personSchema } from "@/app/schemas/Schema"

type InputMina = z.infer<typeof personSchema>

const PersonModal = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
  const router = useRouter()
  const [showSuccess, setShowSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputMina>({
    resolver: zodResolver(personSchema),
    mode: "onChange",
  })

  const mutation = useMutation({
    mutationFn: createPerson,
    onSuccess: () => {
      reset()
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        handleClose()
        router.refresh()
      }, 2000)
    },
  })

  const onSubmit = async (data: InputMina) => {
    mutation.mutate(data);
  };
  
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);
  

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit(onSubmit)(e)
  }
  return (
    <ReactPortal wrapperId="modal-wrapper">
      <div className="fixed font-monlam top-0 left-0 w-screen h-screen bg-neutral-800 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Image src="/images/logo.webp" alt="Logo" width={48} height={48} className="rounded-md" />
            </div>
            <button onClick={handleClose} className="text-black bg-white p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form  onSubmit={handleFormSubmit}   className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="shrink-0">རིགས།</label>
              <select
                className="w-64 border-b border-black outline-none"
                {...register("type")}
              >
                {typeofMinaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.type && (
                <span className="text-red-500 font-monlam text-sm ml-2">
                  *{errors.type.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center border-b border-black pb-2 w-full">
                <label>མིང་།</label>
                <input
                  id="name"
                  className="ml-2 outline-none w-full"
                  {...register("name")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 font-monlam text-sm ml-2">
                  *{errors.name.message}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <div className="flex items-center justify-between border-b border-black pb-2 w-64">
                <label>སྐྱེས་ལོ།</label>
                <input
                  id="birthyear"
                  type="number"
                  className="outline-none font-inter text-sm"
                  {...register("year_of_birth", {
                    valueAsNumber: true,
                    required: true,
                  })}
                  disabled={isSubmitting}
                />
              </div>
              {errors.year_of_birth && (
                <span className="text-red-500 font-inter text-sm ml-2">
                  *{errors.year_of_birth.message}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <div className="flex items-center justify-between border-b border-black pb-2 w-64">
                <label htmlFor="deathDate">འདས་ལོ།</label>
                <input
                  id="deathDate"
                  type="number"
                  className="outline-none font-inter text-sm"
                  {...register("year_of_death", { valueAsNumber: true })}
                  disabled={isSubmitting}
                />
              </div>
              {errors.year_of_death && (
                <span className="text-red-500 font-inter text-sm ml-2">
                  *{errors.year_of_death.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center border-b border-black pb-2 w-full">
                <label className=' shrink-0'>མི་རིགས།</label>
                <input
                  id="race"
                  className="ml-2 outline-none w-full"
                  {...register("nationality")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.nationality && (
                <span className="text-red-500 font-monlam text-sm ml-2">
                  *{errors.nationality.message}
                </span>
              )}
            </div>
            <button
      type="submit"
      disabled={isSubmitting}
      className=" text-base font-inter bg-secondary-400 text-secondary-50 px-2 py-1 rounded-md ">
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
            
          </form>

          {mutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">
              {mutation.error.message}
            </div>
          )}
         
          {showSuccess && 
          <div className='mt-4 p-2 w-fit mx-auto bg-success-100 border border-success-400 text-success-700 rounded-md'>
          Data submitted successfully
          </div>
            }
        </div>
      </div>
    </ReactPortal>
  )
}

export default PersonModal