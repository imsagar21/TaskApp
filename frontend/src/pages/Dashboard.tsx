import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";
import Pagination from "../components/Pagination";
import type { Filter, Task } from "../types";

const Dashboard: React.FC = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    status: "active",
  });
  const navigate = useNavigate();
  const [editId, setEditId] = useState<string | null>(null);

  const [filter, setFilter] = useState<Filter>({
    status: "all",
    priority: "",
  });

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data,
    isLoading,
    isError,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  } = useTasks(filter, page, limit);

  const tasks = data?.tasks || [];
  const total = data?.total || 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTaskMutation.mutateAsync({ id: editId, task });
        setEditId(null);
      } else {
        await createTaskMutation.mutateAsync(task);
      }
      alert("Task saved successfully");
      setTask({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        status: "active",
      });
    } catch (error) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to create a task");
        navigate("/login");
        return;
      }
      alert("Failed to save task");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTaskMutation.mutateAsync(id);
    } catch (error) {
      alert("Failed to delete task");
      console.error(error);
    }
  };

  const handleEdit = (task: Task) => {
    setTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate || "",
      status: task.status || "active",
      id: task.id,
      _id: task._id,
    });
    setEditId(task._id || task.id || null);
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedStatus =
        task.status === "completed" ? "active" : "completed";
      await updateTaskMutation.mutateAsync({
        id: task._id || task.id!,
        task: { ...task, status: updatedStatus },
      });
    } catch (error) {
      alert("Failed to update task status");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow max-w-5xl w-full mt-10 p-6 flex flex-col md:flex-row gap-8">
        {/* Create Task (Left) */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center md:text-left">
            Create New Task
          </h2>
          <TaskForm
            task={task}
            editId={editId}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
        {/* My Tasks (Right) */}
        <div className="md:w-1/2 w-full">
          <h3 className="text-xl font-bold mb-4 text-blue-700 text-center md:text-left">
            My Tasks
          </h3>
          <TaskFilters filter={filter} setFilter={setFilter} />
          {isLoading ? (
            <div className="text-center text-gray-500">Loading tasks...</div>
          ) : isError ? (
            <div className="text-center text-red-500">
              Failed to load tasks.
            </div>
          ) : (
            <>
              <TaskList
                tasks={tasks}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleToggleComplete={handleToggleComplete}
              />
              <Pagination
                page={page}
                total={total}
                limit={limit}
                setPage={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
