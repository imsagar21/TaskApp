// User types
export interface UserResponse {
  _id: string;
  username: string;
  email: string;
}

export interface UserRequest {
  email: string;
  password?: string;
}

export interface AuthContextType {
  user: UserResponse | null;
  login: (user: UserRequest) => Promise<void>;
  logout: () => void;
}

// Task types
export interface Task {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: "active" | "completed";
}

export interface TaskResponse {
  tasks: Task[];
  total: number;
}

export type Filter = {
  status?: string;
  search?: string;
  priority?: string;
};

export interface TaskFiltersProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

// TaskForm Props
export interface TaskFormProps {
  task: Pick<Task, "title" | "description" | "priority" | "dueDate">;
  editId: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// TaskList Props
export interface TaskListProps {
  tasks: Task[];
  handleEdit: (task: Task) => void;
  handleDelete: (id: string) => void;
  handleToggleComplete: (task: Task) => void;
}
