import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import type { Task } from "../types";

type Filter = {
  status?: string;
  search?: string;
};

export const useTasks = (filter: Filter, page: number, limit: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", filter, page],
    queryFn: () => fetchTasks(filter, page, limit),
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: Task }) =>
      updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};
