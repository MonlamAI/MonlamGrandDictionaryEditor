import React, { useState, useEffect, useRef } from "react";
import DetailsPopup from "./DetailsPopup";
import { filterSuggestions } from "@/app/utils/util";
import { FaPlus } from "@/app/utils/Icon";
import PersonModal from "./PersonModal";

const AutoSuggestion = ({
  label,
  name,
  data,
  register,
  isSubmitting,
  type = 'person'
}: {
  label: string;
  name: string;
  data: any[];
  register: any;
  isSubmitting: boolean;
  type?: 'person' | 'publisher';
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showmodal, setShowmodal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const suggestionsRef = useRef(null);
  
  const { onChange, ...rest } = register(name);

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
          {selectedPerson && (
            <div
              className={`relative ml-2 ${isSubmitting ? "opacity-50" : ""}`}
              onMouseEnter={() => !isSubmitting && setShowDetails(true)}
              onMouseLeave={() => !isSubmitting && setShowDetails(false)}
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center text-white">
                <div className="bg-white p-1 rounded-full" />
              </div>
              {showDetails && !isSubmitting && (
                <DetailsPopup 
                  person={selectedPerson} 
                  type={type}  // Explicitly pass the type prop
                />
              )}
            </div>
          )}
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
      {
        showmodal && <PersonModal isOpen={showmodal} handleClose={() => setShowmodal(!showmodal)} />
      }
    </div>
  );
};

export default AutoSuggestion;