import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { IUploadFile } from '../../utils/imageUploader/interface';
import { FileUploadHelper } from '../../utils/imageUploader/uploader';
import sendResponse from '../../utils/helpers/sendResponse';

const createNewsPage = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as IUploadFile;
  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: uploadedImage,
    message: 'Successfully uploaded',
  });
});

export const adminController = { createNewsPage };
