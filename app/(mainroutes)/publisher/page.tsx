'use client'

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { PublisherSchema } from "@/app/schemas/Schema"
import { createPublisher } from "@/app/actions/PostActions"
import Breadcrumb from "@/app/components/Card/BreadCrumb"
import Submits from "@/app/components/Buttons/Submit"
import SuccessMessage from "@/app/components/Card/SuccessMessage"

type InputParchang = z.infer<typeof PublisherSchema>

const Publisher = () => {
  const router = useRouter()
  const [showSuccess, setShowSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputParchang>({
    resolver: zodResolver(PublisherSchema),
    mode: "onChange",
  })

  const mutation = useMutation({
    mutationFn: createPublisher,
    onSuccess: () => {
      reset()
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        router.push("/")
      }, 3000)
    },
  })

  const onSubmit = async (data: InputParchang) => {
    mutation.mutate(data)
  }

  return (
    <div className="font-monlam sm:px-12 p-4">
      <img src="/images/logo.webp" alt="Logo" className="w-16 rounded-md" />
      <p className="text-xl font-semibold mt-2">
        སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ་རྩོམ་སྒྲིག་མ་ལག
      </p>

      <Breadcrumb name="དཔར་ཁང་།" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-4">
        <div className="flex items-center">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="name">མིང་།</label>
            <input
              id="name"
              className="ml-2 outline-none text-lg w-64"
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
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="location">ཆགས་ཡུལ།</label>
            <input
              id="location"
              className="ml-4 outline-none text-lg"
              {...register("location")}
              disabled={isSubmitting}
            />
          </div>
          {errors.location && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.location.message}
            </span>
          )}
        </div>
        <Submits disabled={isSubmitting || mutation.isPending} />
      </form>
      
      {mutation.isError && (
        <div className="bg-red-100 border w-fit right-0 absolute border-red-400 text-red-700 px-4 py-3 rounded-l-md mt-4">
          {mutation.error.message}
        </div>
      )}

      {showSuccess && <SuccessMessage />}
    </div>
  )
}

export default Publisher