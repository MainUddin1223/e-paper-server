import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { IUploadFile } from '../../utils/imageUploader/interface';
import { FileUploadHelper } from '../../utils/imageUploader/uploader';
import sendResponse from '../../utils/helpers/sendResponse';
import { adminService } from './admin.service';
import { createPageSchema } from './admin.validator';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';

const createNewsPage = catchAsync(async (req: Request, res: Response) => {
  const { error } = createPageSchema.validate(req.body);
  if (error) {
    const message = error.details[0]?.message || 'Validation error';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }
  const userId = Number(req.user?.userId);
  const file = req.file as IUploadFile;

  let pageImg = null;
  if (file) {
    pageImg = await FileUploadHelper.uploadToCloudinary(file);
  }

  const result = await adminService.createNewsPage({
    ...req.body,
    userId,
    pageImg,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Successfully uploaded',
  });
});

const updateNewsPage = catchAsync(async (req: Request, res: Response) => {
  const { error } = createPageSchema.validate(req.body);
  if (error) {
    const message = error.details[0]?.message || 'Validation error';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }
  const pageId = Number(req.params.id);
  const file = req.file as IUploadFile;
  console.log(pageId);
  let pageImg = req.body.pageImg || null;
  if (file) {
    pageImg = await FileUploadHelper.uploadToCloudinary(file);
  }

  const result = await adminService.updateNewsPage(pageId, {
    ...req.body,
    pageImg,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'News page updated Successfully',
  });
});

const getNewPages = catchAsync(async (req: Request, res: Response) => {
  const date = req.query.date?.toString() || '';
  const result = await adminService.getNewPages(date);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'News pages fetched successfully',
  });
});

const getNewsPageById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.getNewsPageById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'News page fetched successfully',
  });
});

// const NewsPage = catchAsync(async (req: Request, res: Response) => {
//   const userId = Number(req.user?.userId)
//   const files = req.files as IUploadFile[];
//   const uploadedFiles: string[] = [];

//   await Promise.all(
//     files.map(async file => {
//       const imgUrl = await FileUploadHelper.uploadToCloudinary(file);
//       uploadedFiles.push(imgUrl);
//     })
//   );
//   const pageImg =

//   const result = await adminService.createNewsPage({...req.body,userId,})

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     data: uploadedFiles,
//     message: 'Successfully uploaded',
//   });
// });

export const adminController = {
  createNewsPage,
  updateNewsPage,
  getNewPages,
  getNewsPageById,
};
