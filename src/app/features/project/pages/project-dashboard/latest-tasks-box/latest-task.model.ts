export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  assignedBy: string;
  assignedTo: string;
  priority: number;
  deadline: string;
}

export interface LatestTask {
  _id: string;
  lastTwoTasks: Task[];
}

export interface LatestTasks {
  data: LatestTask[];
}
