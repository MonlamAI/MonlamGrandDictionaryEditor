import React, { useState, useEffect, useRef } from "react";
import { filterSuggestions } from "@/app/utils/util";
import { FaPlus } from "@/app/utils/Icon";

const AutoSuggestionBook = ({
  label,
  name,
  data,
  register,
  isSubmitting,
  type = 'person',
  value // Add value prop to track the selected value
}: {
  label: string;
  name: string;
  data: any[];
  register: any;
  isSubmitting: boolean;
  type?: 'person' | 'publisher';
  value?: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showmodal, setShowmodal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const suggestionsRef = useRef(null);

  const { onChange, ...rest } = register(name);

  // Update input value when value prop changes or component mounts
  useEffect(() => {
    if (value) {
      const selectedItem = data.find(item => item.id === value);
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
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            autoComplete="off"
            disabled={isSubmitting}
          />
          <input
            type="hidden"
            {...rest}
            value={selectedPerson?.id || ""}
            disabled={isSubmitting}
          />
        </div>
      </div>
      {showSuggestions && !isSubmitting && (
        <div ref={suggestionsRef} className="absolute z-10 mt-1 font-monlam text-sm w-64 bg-white border border-black shadow-lg flex flex-col">
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
          <div onClick={() => setShowmodal(!showmodal)} className="flex items-center justify-between border-t p-2 border-gray-600 bg-primary-50 rounded-md cursor-pointer">
            <p>སྣོན་པ། </p>
            <FaPlus />
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoSuggestionBook;