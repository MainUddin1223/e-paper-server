import { PrismaClient } from '@prisma/client';
import { ILoginPayload } from './auth.interface';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { authServiceMessage } from './auth.constant';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
};

export const authService = { login };
