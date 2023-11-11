export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IChangePasswordPayload {
  password: string;
  userId: number;
}
