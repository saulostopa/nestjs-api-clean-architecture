export interface IUserObject {
  email: string;
  name?: string | null;
  password?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
