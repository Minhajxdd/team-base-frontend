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
  };
  priority: 1 | 2 | 3;
  deadline: Date;
}
