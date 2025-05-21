import React, { useState } from "react";
import type { TaskFormProps } from "../types";

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  editId,
  handleChange,
  handleSubmit,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [warnings, setWarnings] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Client-side validation
  const validate = () => {
    const newWarnings = { title: "", description: "", dueDate: "" };
    let hasError = false;
    if (!task.title.trim()) {
      newWarnings.title = "Title is required.";
      hasError = true;
    }
    if (!task.description.trim()) {
      newWarnings.description = "Description is required.";
      hasError = true;
    }
    if (!task.dueDate) {
      newWarnings.dueDate = "Due Date is required.";
      hasError = true;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(task.dueDate);
      if (due < today) {
        newWarnings.dueDate = "Due date cannot be in the past.";
        hasError = true;
      }
    }
    setWarnings(newWarnings);
    return hasError;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const hasError = validate();
    if (hasError) return;
    setWarnings({ title: "", description: "", dueDate: "" });
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-2 rounded border border-gray-300"
      />
      {submitted && warnings.title && (
        <div className="text-red-600 text-xs mt-0.5 ml-1">{warnings.title}</div>
      )}
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="p-2 rounded border border-gray-300"
      />
      {submitted && warnings.description && (
        <div className="text-red-600 text-xs mt-0.5 ml-1">
          {warnings.description}
        </div>
      )}
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]}
        className="p-2 rounded border border-gray-300"
      />
      {submitted && warnings.dueDate && (
        <div className="text-red-600 text-xs mt-0.5 ml-1">
          {warnings.dueDate}
        </div>
      )}
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="p-2 rounded border border-gray-300"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="p-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        {editId ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
