export const tibetanRegex = /^[\u0F00-\u0FFF\u0F00-\u0FFF\s]+$/;
export const typeofMinaOptions = [
    "རྩོམ་སྒྲིག་པ་",
    "གཏེར་སྟོན་",
    "ལོ་ཙཱ་བ་",
    "རྩོམ་པ་པོ་",
  ] as const
export const typeMap: { [key: string]: string } = {
  "རྩོམ་སྒྲིག་པ་": "editor",
  "གཏེར་སྟོན་": "terton",
  "ལོ་ཙཱ་བ་": "translator",
  "རྩོམ་པ་པོ་": "author",
}
export function cleanData(data: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
  }
  
  export const filterSuggestions = (inputValue: string, data: any[]) => {
    return inputValue.trim()
      ? data.filter((option) =>
          option.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];
  };
  