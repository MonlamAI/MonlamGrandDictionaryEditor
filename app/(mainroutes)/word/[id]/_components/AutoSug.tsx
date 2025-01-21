import React, { useState, useEffect, useRef } from "react";
import { filterSuggestions } from "@/app/utils/util";

const AutoSug = ({
  label,
  name,
  data,
  register,
  isSubmitting,
  value,
  disabled = false,
}: {
  label: string;
  name: string;
  data: any[];
  register: any;
  isSubmitting: boolean;
  type?: "person" | "publisher";
  value?: string;
  disabled?: boolean;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const suggestionsRef = useRef(null);

  const { onChange, ...rest } = register(name);

  useEffect(() => {
    if (value) {
      const selectedItem = data.find((item) => item.id === value);
      if (selectedItem) {
        setInputValue(selectedItem.name);
        setSelectedPerson(selectedItem);
      }
    }
  }, [value, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !(suggestionsRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSelectedPerson(null);
      onChange({ target: { value: "", name } });
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setInputValue(suggestion.name);
    setSelectedPerson(suggestion);
    setShowSuggestions(false);
    onChange({ target: { value: suggestion.id, name } });
  };

  const filteredSuggestions = filterSuggestions(inputValue, data);

  return (
    <div className="relative">
      <div className="flex items-center border-b border-black pb-2 w-fit">
        <label>{label}</label>
        <div className="relative flex items-center ml-4">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className={`outline-none text-lg w-64 ${
              isSubmitting || disabled ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            autoComplete="off"
            disabled={isSubmitting || disabled}
          />
          <input
            type="hidden"
            {...rest}
            value={selectedPerson?.id || ""}
            disabled={isSubmitting || disabled}
          />
        </div>
      </div>
      {showSuggestions && !isSubmitting && !disabled && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 font-monlam text-sm w-64 bg-white border border-black shadow-lg flex flex-col"
        >
          <div className="max-h-28 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion: any) => (
                <div
                  key={suggestion.id}
                  className="p-2 border-b border-black hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-center text-gray-500 font-inter text-sm">
                No matching data found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoSug;
