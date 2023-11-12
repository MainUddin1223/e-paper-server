import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { createAdminSchema } from './auth.validator';
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

export const authController = { createAdmin };
