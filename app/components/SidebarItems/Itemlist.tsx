"use client";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Status from "../Status";
import { useDebounce } from "use-debounce";
import { useInView } from "react-intersection-observer";
import { getWords } from "@/app/actions/GetActions";
import { useRouter } from "next/navigation";

interface Word {
  id: number;
  lemma: string;
  is_modern: boolean | null;
  is_reviewed: boolean;
  origin: string | null;
  sense: string | null;
  originId: string | null;
  is_frequent: boolean;
}

interface WordsResponse {
  words: Word[];
  total_count: number;
  current_page: number;
  total_pages: number;
}

export interface ItemlistProps {
  searchQuery: string;
}

const PAGE_SIZE = 20;

const Itemlist = ({ searchQuery }: ItemlistProps) => {
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const { ref, inView } = useInView();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: infiniteStatus,
  } = useInfiniteQuery<WordsResponse>({
    queryKey: ["words"],
    queryFn: ({ pageParam }) => getWords(pageParam as number, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.total_pages
        ? lastPage.current_page + 1
        : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (infiniteStatus === "error") {
    return <div className="text-red-500">Error loading words</div>;
  }

  const renderContent = () => {
    if (infiniteStatus === "pending") {
      return <div className="text-center p-4">Loading...</div>;
    }

    const allWords = infiniteData?.pages.flatMap((page) => page.words) || [];

    const filteredWords = debouncedSearch
      ? allWords.filter((word) =>
          word.lemma.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
      : allWords;

    if (debouncedSearch && filteredWords.length === 0) {
      return <div className="text-center p-4">No matching words found</div>;
    }

    return filteredWords.map((word: Word) => (
      <WordItem key={word.id} word={word} />
    ));
  };

  return (
    <div className="mt-4 h-80 bg-secondary-700 overflow-y-scroll rounded-md">
      <div className="space-y-2">
        {renderContent()}
        {!debouncedSearch && (
          <div ref={ref} className="h-10">
            {isFetchingNextPage && (
              <div className="text-center">Loading more...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const WordItem: React.FC<{ word: Word }> = ({ word }) => {
  const router = useRouter();
  const handleWordClick = (word: string) => {
    router.push(`/word/${word}`);
  };
  return (
    <div
      className="border-b border-secondary-500 p-2 "
      onClick={() => handleWordClick(word.lemma)}
    >
      <div className="flex items-center justify-between cursor-pointer font-monlam">
        {word.lemma}
        <Status statustype={word.is_reviewed ? "reviewed" : "pending"} />
      </div>
    </div>
  );
};
export default Itemlist;
