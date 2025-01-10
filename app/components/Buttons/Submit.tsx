import React from "react";

export interface SubmitsProps {
    disabled?: boolean;
  }
const Submits: React.FC<SubmitsProps> = ({
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="fixed bottom-8 right-0 text-base font-inter bg-secondary-400 text-secondary-50 py-4 px-8 rounded-l-md ">
      {disabled ? "Submitting..." : "Submit"}
    </button>
  );
};

export default Submits;
