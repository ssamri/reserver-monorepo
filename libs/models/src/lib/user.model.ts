export type UserRole = 'CLIENT' | 'HOTEL' | 'ADMIN';

export interface UserModel {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
