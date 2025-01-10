'use client'
import Submits from '@/app/components/Buttons/Submit';
import { bookSchema } from '@/app/schemas/Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type WordType = z.infer<typeof bookSchema>
const WordForm = ({pubdata,EditorData,TertonData,TranslatorData,PrintMethodData,AuthorData}:any) => {
 
  const {register,handleSubmit, formState: { errors, isSubmitting },
  } = useForm<WordType>({
    resolver: zodResolver(bookSchema),
    mode: 'onChange',
  });

  // const mutation = useMutation({
  //   mutationFn: createPublisher,
  //   onSuccess: () => {
  //     reset()
  //     setShowSuccess(true)
  //     setTimeout(() => {
  //       setShowSuccess(false)
  //       router.push("/")
  //     }, 3000)
  //   },
  // })
  const onSubmit = async (data: WordType) => {
    console.log(data)
  }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-fit my-9">
        <div className="flex flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label >མཚན་བྱང་།</label>
            <input className="ml-2 outline-none text-lg w-64" {...register("title")} disabled={isSubmitting}/>
          </div>
          {errors.title && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.title.message}
            </span>
          )}
        </div>
        <div className="flex mt-3 max-sm:flex-col justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label >མཚན་བྱང་བསྡུས་པ།</label>
            <input className="ml-2 outline-none text-lg w-64" {...register("shortentitle")} disabled={isSubmitting}/>
          </div>
          {errors.shortentitle && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.shortentitle.message}
            </span>
          )}
        </div>
         
        <div className="flex flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label >པར་སྐྲུན་ལོ།</label>
            <input type='number' className="ml-2 outline-none text-lg w-64"
              {...register("year_of_publish",{
                valueAsNumber: true,
                required: true,
              })}
              disabled={isSubmitting}
            />
          </div>
          {errors.year_of_publish && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.year_of_publish.message}
            </span>
          )}
        </div>
        </div>
        <div className="flex mt-3 max-sm:flex-col justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="name">རྩོམ་སྒྲིག་གི་རྣམ་པ།</label>
            <input
              id="name"
              className="ml-2 outline-none text-lg w-64"
              {...register("collection")}
              disabled={isSubmitting}
            />
          </div>
          {errors.collection && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.collection.message}
            </span>
          )}
        </div>
          <div className="flex flex-col w-72">
            <div className="flex items-center space-x-2 border-b border-black pb-2">
              <label className="shrink-0">དཔར་སྐྲུན་བྱེད་སྟངས།</label>
              <select
                className={`w-64 outline-none ${errors.print_methodId ? "border-red-500" : ""}`}
                {...register("print_methodId")}
                disabled={isSubmitting}
              >
                {PrintMethodData.map((method:any) => (
                  <option className="text-sm" key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.print_methodId && (
              <span className="text-red-500 text-sm mt-1">
                {errors.print_methodId.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex max-sm:flex-col justify-between mt-3 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="name">རྩོམ་སྒྲིག་པ་མིང་།</label>
            <input
              id="name"
              className="ml-2 outline-none text-lg w-64"
              {...register("editorId")}
              disabled={isSubmitting}
            />
          </div>
          {errors.editorId && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.editorId.message}
            </span>
          )}
        </div>
         
        <div className="flex  flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="name">གཏེར་སྟོན་མིང་།</label>
            <input
              id="name"
              className="ml-2 outline-none text-lg w-64"
              {...register("tertonId")}
              disabled={isSubmitting}
            />
          </div>
          {errors.tertonId && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.tertonId.message}
            </span>
          )}
        </div>
          
        </div>
        <div className="flex max-sm:flex-col justify-between mt-3 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="name">རྩོམ་པ་པོ་མིང་།</label>
            <input
              id="name"
              className="ml-2 outline-none text-lg w-64"
              {...register("authorId")}
              disabled={isSubmitting}
            />
          </div>
          {errors.authorId && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.authorId.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="name">ལོ་ཙཱ་བ་མིང་།</label>
            <input
              id="name"
              className="ml-2 outline-none text-lg w-64"
              {...register("translatorId")}
              disabled={isSubmitting}
            />
          </div>
          {errors.tertonId && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.tertonId.message}
            </span>
          )}
        </div>
          
        </div>
        <div className="flex  flex-col mt-3">
          <div className="flex items-center border-b border-black pb-2 w-fit">
            <label htmlFor="name">དཔེ་སྐྲུན་པ།</label>
            <input
              id="name"
              className="ml-2 outline-none text-lg w-64"
              {...register("publisherId")}
              disabled={isSubmitting}
            />
          </div>
          {errors.publisherId && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.publisherId.message}
            </span>
          )}
        </div>
        
        <div className="flex flex-col mt-3">
          <div className="flex items-center font-inter text-sm border-b border-black pb-2 w-fit">
            <label className=' font-bold' >BDRC LINK</label>
            <input
              id="name"
              className="ml-2 outline-none w-64"
              {...register("digital_ref")}
              disabled={isSubmitting}
            />
          </div>
          {errors.digital_ref && (
            <span className="text-red-500 font-monlam text-sm ml-2">
              *{errors.digital_ref.message}
            </span>
          )}
        </div>
        <div className="mt-6">
          <Submits
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}

export default WordForm