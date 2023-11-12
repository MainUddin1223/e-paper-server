import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import {
  changePasswordSchema,
  createAdminSchema,
  loginSchema,
} from './auth.validator';
import ApiError from '../../utils/errorHandlers/apiError';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { error } = createAdminSchema.validate(req.body);
  if (error) {
    const message = error.details[0]?.message || 'Validation error';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }

  const result = await authService.createAdmin(req.body.email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
    message: 'Admin created successfully',
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const message = error.details[0]?.message || 'Validation error';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }

  const result = await authService.login(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
    message: 'Successfully logged in',
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    const message = error.details[0]?.message || 'Validation error';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    const message = 'New password and confirm password mismatched';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }
  const userId = Number(req.user?.userId);
  const result = await authService.changePassword({ ...req.body, userId });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
    message: 'Password changed successfully',
  });
});

export const authController = { createAdmin, login, changePassword };
