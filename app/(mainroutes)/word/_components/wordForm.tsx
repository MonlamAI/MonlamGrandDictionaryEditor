'use client'
import React from 'react'
import Submits from '@/app/components/Buttons/Submit'
import Toggle from '@/app/components/Buttons/Toggle'
import { WordSchema } from '@/app/schemas/Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export type InputWord = z.infer<typeof WordSchema>;
const wordForm = (data: any) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<InputWord>({
        resolver: zodResolver(WordSchema),
        mode: "onChange",
      });
    
      const onSubmit: SubmitHandler<InputWord> = (data) => {
        console.log(data);
        reset();
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-fit">
        <div className="flex w-full items-center border-b border-black mt-4 pb-2">
          <label className="flex-shrink-0 w-fit">མ་ཚིག</label>
          <input
            className="ml-2 outline-none flex-grow"
            {...register("lemma")}
          />
        </div>
        {errors.lemma && (
          <p className="text-red-500 text-sm">{errors.lemma.message}</p>
        )}
        <div className="flex max-sm:flex-col mt-4">
          <div className="flex mr-16">
            <div className="flex items-center">
              <p>མ་ཚིག་གསར་པ།</p>
              <div className="mb-2">
                <Toggle register={register} value="is_mordern" />
              </div>
            </div>

            <div className="flex items-center">
              <p className="ml-12">རྒྱུན་སྤྱོད།</p>
              <div className="mb-2">
                <Toggle register={register} value="is_frequent" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center mt-1 space-x-2">
            <label className="shrink-0">འབྱུང་ཁུངས།</label>
            <select
              className="w-fit border-b border-black outline-none"
              {...register("originId")}
            >
              {data.data.map((item:any) => (
                <option key={item.id} value={item.id}>
                  {item.language}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Submits />
      </form>
  )
}

export default wordForm