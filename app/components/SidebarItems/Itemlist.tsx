"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Status from "../Status";
import { getWords } from "@/app/actions/GetActions";

interface ItemlistProps {
  searchQuery: string;
}

interface Word {
  id: number;
  lemma: string;
  is_reviewed: boolean;
}

const PAGE_SIZE = 20;

const Itemlist: React.FC<ItemlistProps> = ({ searchQuery }) => {
  const { ref, inView } = useInView();

  const fetchWords = async ({ pageParam = 1 }) => {
    const data = await getWords(pageParam, PAGE_SIZE);
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["words", searchQuery],
      queryFn: fetchWords,
      getNextPageParam: (lastPage) =>
        lastPage.current_page < lastPage.total_pages
          ? lastPage.current_page + 1
          : undefined,
      initialPageParam: 1,
    });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const allWords = data?.pages.flatMap((page) => page.words) || [];
  const filteredWords = allWords.filter((word) =>
    word.lemma.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (status === "pending")
    return (
      <div className="text-center font-monlam animate-pulse p-4">
        སྒུག་རོགས་གནང་། .....
      </div>
    );
  if (status === "error")
    return <div className="text-center p-4">Error fetching words</div>;
  if (filteredWords.length === 0)
    return <div className="text-center p-4">No matching words found</div>;

  return (
    <div className="mt-4 h-80 bg-secondary-700 overflow-y-scroll rounded-md">
      <div className="space-y-2">
        {filteredWords.map((word, index) => (
          <WordItem
            key={word.id}
            word={word}
            ref={index === filteredWords.length - 1 ? ref : null}
          />
        ))}
        {isFetchingNextPage && (
          <div className="text-center text-white font-monlam animate-pulse p-4">
            སྤྲོད་ལེན་བྱེད་བཞིན་པ།...
          </div>
        )}
      </div>
    </div>
  );
};

const WordItem = React.forwardRef<HTMLDivElement, { word: Word }>(
  ({ word }, ref) => {
    const router = useRouter();
    const handleWordClick = () => {
      router.push(`/word/${word.lemma}`);
    };

    return (
      <div
        ref={ref}
        className="border-b border-secondary-500 p-2"
        onClick={handleWordClick}
      >
        <div className="flex items-center justify-between cursor-pointer font-monlam">
          {word.lemma}
          <Status statustype={word.is_reviewed ? "reviewed" : "pending"} />
        </div>
      </div>
    );
  },
);

WordItem.displayName = "WordItem";

export default Itemlist;
