import axios from "axios";
import type { Filter, Task, TaskResponse } from "../types";

const BASE_URL = "http://localhost:5050";

export const fetchTasks = async (
  filter: Filter,
  page: number,
  limit: number
): Promise<TaskResponse> => {
  const params = {
    page,
    limit,
  } as Record<string, string | number>;
  if (filter.status && filter.status !== "all") params.status = filter.status;
  if (filter.priority) params.priority = filter.priority;
  const res = await axios.get(`${BASE_URL}/tasks/get`, {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
  return res.data;
};

export const createTask = async (task: Task) => {
  await axios.post(`${BASE_URL}/tasks/create`, task, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
};

export const updateTask = async (id: string, task: Task) => {
  await axios.put(`${BASE_URL}/tasks/update/${id}`, task, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${BASE_URL}/tasks/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
};
