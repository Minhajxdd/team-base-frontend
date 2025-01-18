export interface projectMember {
  role: string;
  userId: {
    _id: string;
    full_name: string;
    email: string;
    isBlocked: string;
  };
}
