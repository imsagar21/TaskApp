import React from "react";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  limit,
  setPage,
}) => (
  <div className="flex justify-center gap-2 mt-4">
    <button
      onClick={() => setPage(Math.max(1, page - 1))}
      disabled={page === 1}
      className="px-3 py-1 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
    >
      Prev
    </button>
    <span className="px-2">Page {page}</span>
    <button
      onClick={() => setPage(page * limit < total ? page + 1 : page)}
      disabled={page * limit >= total}
      className="px-3 py-1 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
