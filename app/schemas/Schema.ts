import { z } from "zod"
import { tibetanRegex } from "@/app/utils/util"

export const PublisherSchema = z.object({
  name: z
    .string()
    .min(3, "མིང་ཡིག་འབྲུ་གསུམ་ཡན་དགོས།")
    .regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
  location: z
    .string()
    .min(3, "ཆགས་ཡུལ་ཡིག་འབྲུ་གསུམ་ཡན་དགོས།")
    .regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
})

export const personSchema = z.object({
    type: z.string().min(1, "རིགས་འདེམས་རོགས།"),
    name: z
      .string()
      .min(3, "མིང་ཡིག་འབྲུ་གསུམ་ཡན་དགོས།")
      .regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
    year_of_birth: z.number().min(1, "སྐྱེས་ལོ་ཨང་ཀི་ནང་འབྲི་རོགས།"),
    year_of_death: z.number().min(1, "འདས་ལོ་ཨང་ཀི་ནང་འབྲི་རོགས།"),
    nationality: z
      .string()
      .min(2, "མི་རིགས་ཡིག་འབྲུ་གཉིས་ཡན་དགོས།")
      .regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
  });



export const bookSchema = z.object({
    title: z.string().min(1, "ངེས་པར་དུ་འབྲི་དགོས།").regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
    abbreviated_title: z.string().min(1, "ངེས་པར་དུ་འབྲི་དགོས།").regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
    year_of_publish: z.number().min(1, "ངེས་པར་དུ་འབྲི་དགོས།"),
    collection_name: z.string().regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
    print_methodId: z.string(),
    editorId: z.string(),
    tertonId: z.string(),
    authorId: z.string(),
    translatorId: z.string(),
    digital_ref: z.string(),
    publisherId: z.string(),
  });


export const WordSchema = z.object({
    lemma: z.string().min(1).regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
    is_reviewed: z.boolean(),
    is_mordern: z.boolean(),
    is_frequent: z.boolean(),
    originId: z.string(),
  });

  export const CitationSchema = z.object({
    text: z.string(),
    location: z.object({}), 
    bookId: z.string(),
  });
  

export const SenseSchema = z.object({
  description: z.string().min(1,"ཉུང་མཐར་ཡང་ཡིག་འབྲུ་ ༡ ཡོད་དགོས།").regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
  has_illustration: z.boolean(),
  example_sentence: z.string().min(1,"ཉུང་མཐར་ཡང་ཡིག་འབྲུ་ ༡ ཡོད་དགོས།").regex(tibetanRegex, "བོད་ཡིག་ནང་འབྲི་རོགས།"),
  posId: z.string(),
  name_entityId: z.string(),
  registerId: z.string(),
  domainIds: z.array(z.string()),
 
});