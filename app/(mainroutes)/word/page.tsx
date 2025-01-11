import { getOrigin } from "@/app/actions/GetActions";
import WordClient from '@/app/(mainroutes)/word/_components/WordClient';

export default async function WordPage() {
  const originData = await getOrigin();
  
  return (
    <div className="text-lg font-monlam sm:ml-16 ml-2 mt-2">
      <img src="/images/logo.webp" className="w-16 rounded-md" alt="logo" />
      <p className="text-xl font-semibold mt-2">
        སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ་རྩོམ་སྒྲིག་མ་ལག
      </p>
      <WordClient originData={originData} />
    </div>
  );
}