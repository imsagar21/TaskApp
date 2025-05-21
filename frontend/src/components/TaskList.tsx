import React from "react";
import type { TaskListProps } from "../types";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleEdit,
  handleDelete,
  handleToggleComplete,
}) => (
  <ul className="list-none p-0">
    {tasks.length === 0 && (
      <li className="text-center text-gray-500">No tasks found.</li>
    )}
    {tasks.map((t) => (
      <li
        key={t._id || t.id}
        className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={t.status === "completed"}
            onChange={() => handleToggleComplete(t)}
            className="accent-blue-600"
          />
          <div>
            <div
              className={`font-semibold text-gray-800 ${
                t.status === "completed" ? "line-through" : ""
              }`}
            >
              {t.title}
            </div>
            <div className="text-gray-600 text-sm">{t.description}</div>
            <div className="text-xs text-gray-500">
              Due:
              {t.dueDate
                ? new Date(t.dueDate).toLocaleDateString()
                : "No due date"}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(t)}
            className="border border-gray-300 bg-white rounded px-2 py-1 text-sm hover:bg-gray-200 transition"
          >
            Edit
          </button>
          <button
            onClick={() => (t._id || t.id) && handleDelete(t._id || t.id!)}
            className="border border-gray-300 bg-white rounded px-2 py-1 text-sm hover:bg-gray-200 transition"
            disabled={!(t._id || t.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default TaskList;
