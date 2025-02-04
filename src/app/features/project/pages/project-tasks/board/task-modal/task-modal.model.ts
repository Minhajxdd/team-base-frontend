export interface SubTask {
  title: string;
  done: boolean;
  _id: string;
}

export interface TaskModel {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  assignedBy: string;
  assignedTo: {
    _id: string;
    full_name: string;
    email: string;
  };
  priority: number;
  deadline: string;
  subTasks: SubTask[];
}
