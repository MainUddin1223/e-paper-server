import { AccountStatus, PrismaClient } from '@prisma/client';
import { ICreateNewsPage, IUpdateProfile } from './admin.interface';

const prisma = new PrismaClient();

const manageAdmin = async (id: number, status: AccountStatus) => {
  const result = await prisma.users.update({
    where: {
      id,
    },
    data: {
      accountStatus: status,
    },
  });
  return result;
};

const getAllAdmins = async () => {
  const result = await prisma.users.findMany({
    where: {
      role: 'admin',
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      accountStatus: true,
    },
  });
  return result;
};

const updateProfile = async (payload: IUpdateProfile) => {
  const { id, ...data } = payload;
  const result = await prisma.users.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const createNewsPage = async (payload: ICreateNewsPage) => {
  const result = await prisma.newsPage.create({ data: payload });
  return result;
};

const updateNewsPage = async (
  pageId: number,
  payload: Partial<ICreateNewsPage>
) => {
  const result = await prisma.newsPage.update({
    where: {
      id: pageId,
    },
    data: payload,
  });
  return result;
};

const getNewPages = async (date: string) => {
  const result = await prisma.newsPage.findMany({
    where: {
      newsDate: date,
    },
  });
  return result;
};
const getNewsPageById = async (id: number) => {
  console.log(id);
  const result = await prisma.newsPage.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const adminService = {
  createNewsPage,
  manageAdmin,
  getAllAdmins,
  updateProfile,
  updateNewsPage,
  getNewsPageById,
  getNewPages,
};
