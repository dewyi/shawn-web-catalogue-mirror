import { cn } from "@/shared/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  const navigate = (newPage: number) => {
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set("page", String(newPage));
    window.location.href = url.toString();
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        className={cn(
          "rounded-md p-2 text-gray-600 hover:bg-gray-100",
          !currentPage && "opacity-50 cursor-not-allowed",
        )}
        disabled={!currentPage}
        onClick={() => navigate(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page) => {
        if (page === "...") {
          return (
            <span key="ellipsis" className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        return (
          <button
            type="button"
            key={pageNum}
            className={cn(
              "min-w-[2rem] rounded-md p-2 text-sm font-medium",
              pageNum === currentPage
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100",
            )}
            onClick={() => navigate(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        className={cn(
          "rounded-md p-2 text-gray-600 hover:bg-gray-100",
          currentPage >= totalPages && "opacity-50 cursor-not-allowed",
        )}
        disabled={currentPage >= totalPages}
        onClick={() => navigate(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
