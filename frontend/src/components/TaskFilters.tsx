import React from "react";
import type { TaskFiltersProps } from "../types";

const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, setFilter }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((f) => ({ ...f, status: e.target.value }));
  };
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((f) => ({ ...f, priority: e.target.value }));
  };

  return (
    <div className="flex gap-2 mb-4 justify-center items-center">
      <select
        value={filter.status || "all"}
        onChange={handleStatusChange}
        className="p-2 rounded border border-gray-300"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={filter.priority || ""}
        onChange={handlePriorityChange}
        className="p-2 rounded border border-gray-300"
      >
        <option value="">Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="button"
        onClick={() => setFilter({ status: "all", priority: "" })}
        className="p-2 rounded border border-gray-300 bg-gray-100 font-medium hover:bg-gray-200 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default TaskFilters;
