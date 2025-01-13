import { getAuthor, getBook, getDomain, getEditor, getNameEntity, getOrigin, getPos, getPrintMethod, getPublisher, getRegister, getTerton, getTranslator } from "@/app/actions/GetActions";
import WordClient from '@/app/(mainroutes)/word/_components/WordClient';
import { classifyDomains } from "@/app/utils/util";

export default async function WordPage() {
  const [domaindata,originData,posData,registerData,nameEntityData,bookdata,Authordata,Editordata,Tertondata,Translatordata,PublisherData,printmethoddata] = 
  await Promise.all([getDomain(),getOrigin(),getPos(),getRegister(),getNameEntity(),getBook(),getAuthor(),getEditor(),getTerton(),getTranslator(),getPublisher(),getPrintMethod()])

 const { parents, sub } = classifyDomains(domaindata);
 console.log('i am parent',parents)
 console.log('i am children',sub)
 return (
    <div className="text-lg font-monlam sm:ml-16 ml-2 mt-2">
      <img src="/images/logo.webp" className="w-16 rounded-md" alt="logo" />
      <p className="text-xl font-semibold mt-2">
        སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ་རྩོམ་སྒྲིག་མ་ལག
      </p>
      <WordClient 
      domaindata={domaindata}
      bookData={bookdata} 
      originData={originData} 
      posData={posData} 
      registerData={registerData} 
      nameEntityData={nameEntityData} 
      Authordata={Authordata}
      Editordata={Editordata}
      Tertondata={Tertondata}
      Translatordata={Translatordata}
      PublisherData={PublisherData}
      printmethoddata={printmethoddata}

      />
    </div>
  );
}