export interface IUploadFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IUpdateProfile {
  name: string;
  image: string;
  id: number;
}
export interface ICreateNewsPage {
  userId: number;
  title: string;
  pageId: number;
  newsDate: string;
  pageImg: string;
}
