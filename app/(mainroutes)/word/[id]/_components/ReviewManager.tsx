import React, { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Status from "@/app/components/Status";
import { updateword } from "@/app/actions/PostActions";
import { useRouter } from "next/navigation";
import SuccessMessage from "@/app/components/Card/SuccessMessage";
import { getNextUnreviewedWord } from "@/app/actions/GetActions";

const ReviewContext = createContext(null);

export const ReviewProvider = ({ children, worddetail, userRole }: any) => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const [checkedItems, setCheckedItems] = useState({
    lemma: false,
    senses: new Array(worddetail.sense.length).fill(false),
  });

  const reviewMutation = useMutation({
    mutationFn: () => {
      return updateword(worddetail.id, {
        lemma: worddetail.lemma,
        is_modern: worddetail.is_modern,
        is_reviewed: true,
        is_frequent: worddetail.is_frequent,
        originId: worddetail.originId,
      });
    },
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(async () => {
        setShowSuccess(false);

        try {
          const nextWord = await getNextUnreviewedWord();
          if (nextWord) {
            router.push(`/word/${encodeURIComponent(nextWord.lemma)}`);
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("Error fetching next word:", error);
          router.push("/");
        }
      }, 3000);
    },
  });

  const isAllChecked = () => {
    return checkedItems.lemma && checkedItems.senses.every((item) => item);
  };

  const toggleLemmaCheck = () => {
    setCheckedItems((prev) => ({
      ...prev,
      lemma: !prev.lemma,
    }));
  };

  const toggleSenseCheck = (index: any) => {
    setCheckedItems((prev) => ({
      ...prev,
      senses: prev.senses.map((item, i) => (i === index ? !item : item)),
    }));
  };

  const handleReviewSubmit = () => {
    if (isAllChecked()) {
      reviewMutation.mutate();
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        checkedItems,
        toggleLemmaCheck,
        toggleSenseCheck,
        isAllChecked,
        handleReviewSubmit,
        worddetail,
        userRole,
      }}
    >
      {children}
      {showSuccess && <SuccessMessage />}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return context;
};

export const ReviewStatus = () => {
  const { isAllChecked, handleReviewSubmit, worddetail, userRole } =
    useReview();

  if (userRole !== "editor") return null;

  return (
    <div className="w-full flex justify-between items-center mb-2">
      <div className="flex text-sm gap-x-2 justify-between w-full items-center p-2 rounded-full">
        <span className="p-2 rounded flex items-center gap-x-2">
          <p>Status:</p>
          {worddetail.is_reviewed == false ? (
            <Status statustype="pending" />
          ) : (
            <Status statustype="reviewed" />
          )}
        </span>
        <button
          onClick={handleReviewSubmit}
          disabled={!isAllChecked()}
          className={`px-4 py-2 rounded-md font-inter transition-colors ${
            isAllChecked()
              ? "bg-success-500 text-success-50 hover:bg-success-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Review Changes
        </button>
      </div>
    </div>
  );
};

export const LemmaCheckbox = () => {
  const { toggleLemmaCheck, checkedItems, worddetail, userRole } = useReview();

  if (userRole !== "editor" || worddetail.is_reviewed) return null;

  return (
    <input
      type="checkbox"
      checked={checkedItems.lemma}
      onChange={toggleLemmaCheck}
      onClick={(e) => e.stopPropagation()}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
  );
};

export const SenseCheckbox = ({ index }: any) => {
  const { toggleSenseCheck, checkedItems, worddetail, userRole } = useReview();

  if (userRole !== "editor" || worddetail.is_reviewed) return null;

  return (
    <input
      type="checkbox"
      checked={checkedItems.senses[index]}
      onChange={() => toggleSenseCheck(index)}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    />
  );
};

export default ReviewProvider;
