"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { format, addDays, subDays, parseISO } from "date-fns";
import { useRef, useEffect } from "react";

const DatePagination = (props: { id: string }) => {
  const { id } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") ? searchParams.get("date") : null;
  const paginationRef = useRef<HTMLDivElement>(null);
  const currentDate = date ? parseISO(date) : new Date();

  const handlePrevDate = () => {
    const prevDate = subDays(currentDate, 1);
    router.push(`/movie/${id}?date=${format(prevDate, "yyyy-MM-dd")}`);
  };

  const handleNextDate = () => {
    const nextDate = addDays(currentDate, 1);
    router.push(`/movie/${id}?date=${format(nextDate, "yyyy-MM-dd")}`);
  };

  const handleToday = () => {
    const today = new Date();
    router.push(`/movie/${id}?date=${format(today, "yyyy-MM-dd")}`);
  };
  useEffect(() => {
    if (paginationRef.current && date) {
      paginationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [date]);

  return (
    <div ref={paginationRef}>
      <h1>Date Pagination</h1>
      <div className="flex gap-8">
        <p>{format(currentDate, "yyyy-MM-dd")}</p>
        <p>{format(addDays(currentDate, 1), "yyyy-MM-dd")}</p>
        <p>{format(addDays(currentDate, 2), "yyyy-MM-dd")}</p>
        <p>{format(addDays(currentDate, 3), "yyyy-MM-dd")}</p>
        <p>{format(addDays(currentDate, 4), "yyyy-MM-dd")}</p>
      </div>
      <button onClick={handlePrevDate}>Previous Day</button>
      <button onClick={handleNextDate}>Next Day</button>
      <button onClick={handleToday}>Today</button>
    </div>
  );
};

export default DatePagination;
