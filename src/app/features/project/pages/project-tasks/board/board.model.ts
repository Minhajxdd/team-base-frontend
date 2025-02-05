export interface SubTasks {
  _id: string;
  title: string;
  done: string;
}

export interface BoardCardModel {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'progress' | 'done';
  assignedBy: string;
  assignedTo: {
    _id: string;
    email: string;
    full_name: string;
    isBlocked: boolean;
    profile?: string;
  };
  subTasks: SubTasks[];
  priority: 1 | 2 | 3;
  deadline: Date;
}
