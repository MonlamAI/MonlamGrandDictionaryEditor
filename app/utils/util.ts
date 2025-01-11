export const tibetanRegex = /^[\u0F00-\u0FFF\u0F00-\u0FFF\s]+$/;
export const typeofMinaOptions = [
    "རྩོམ་སྒྲིག་པ་",
    "གཏེར་སྟོན་",
    "ལོ་ཙཱ་བ་",
    "རྩོམ་པ་པོ་",
  ] as const

export function cleanData(data: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
  }
  