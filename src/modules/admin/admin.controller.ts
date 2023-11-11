import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { IUploadFile } from '../../utils/imageUploader/interface';
import { FileUploadHelper } from '../../utils/imageUploader/uploader';
import sendResponse from '../../utils/helpers/sendResponse';

const createNewsPage = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as IUploadFile[];
  const uploadedFiles = await FileUploadHelper.uploadToCloudinary(files);
  console.log(uploadedFiles);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: uploadedFiles,
    message: 'Successfully uploaded',
  });
});

export const adminController = { createNewsPage };
