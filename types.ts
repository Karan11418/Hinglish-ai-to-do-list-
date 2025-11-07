
export enum Priority {
  URGENT = 'Urgent',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum Status {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  tags: string[];
  createdAt: string;
}

export interface ParsedTask {
  title: string;
  dueDate?: string;
  priority?: Priority;
  tags?: string[];
}
