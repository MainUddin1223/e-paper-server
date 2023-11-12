export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  userId: number;
}

export interface IUpdateProfilePayload {
  name?: string;
  image?: string;
  userId: number;
}
