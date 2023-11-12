import { PrismaClient } from '@prisma/client';
import {
  IChangePasswordPayload,
  ILoginPayload,
  IUpdateProfilePayload,
} from './auth.interface';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { authServiceMessage } from './auth.constant';
import bcrypt from 'bcrypt';
import { jwtToken } from '../../utils/auth_jwt/jwtToken';
import config from '../../utils/config';

const prisma = new PrismaClient();

const createAdmin = async (email: string) => {
  const defaultPassword = config.defaultPassword as string;
  const password = bcrypt.hashSync(defaultPassword, 10);
  const result = await prisma.users.create({ data: { email, password } });
  return { email: result.email, password: defaultPassword };
};

const login = async (payload: ILoginPayload) => {
  const { email, password } = payload;
  const isUserExist = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      authServiceMessage.serverError
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      authServiceMessage.serverError
    );
  }

  if (isUserExist?.accountStatus !== 'active') {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      `${authServiceMessage.accountStatus} ${isUserExist.accountStatus}`
    );
  }

  const authData = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
    isClaimed: isUserExist.passwordChanged,
  };
  const accessToken = await jwtToken.createToken(
    authData,
    config.access_secret as string,
    config.access_secret_expiry as string
  );
  return {
    accessToken,
    profile: {
      name: isUserExist.name,
      email: isUserExist.email,
      image: isUserExist.image,
      isClaimed: isUserExist.passwordChanged,
    },
  };
};
const changePassword = async (payload: IChangePasswordPayload) => {
  const { newPassword, oldPassword, userId } = payload;
  const isUserExist = await prisma.users.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      authServiceMessage.serverError
    );
  }
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      authServiceMessage.serverError
    );
  }

  const bcryptPassword = bcrypt.hashSync(newPassword, 10);
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: bcryptPassword,
      passwordChanged: true,
    },
  });
  const authData = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
    isClaimed: true,
  };

  const accessToken = await jwtToken.createToken(
    authData,
    config.access_secret as string,
    config.access_secret_expiry as string
  );

  return {
    accessToken,
    profile: {
      name: isUserExist.name,
      email: isUserExist.email,
      image: isUserExist.image,
      isClaimed: true,
    },
  };
};

const updateProfile = async (payload: IUpdateProfilePayload) => {
  const { userId, ...data } = payload;
  const result = await prisma.users.update({
    where: {
      id: userId,
    },
    data,
  });
  return {
    profile: {
      name: result.name,
      email: result.email,
      image: result.image,
    },
  };
};

export const authService = {
  login,
  createAdmin,
  changePassword,
  updateProfile,
};
