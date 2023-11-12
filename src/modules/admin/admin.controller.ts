import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { IUploadFile } from '../../utils/imageUploader/interface';
import { FileUploadHelper } from '../../utils/imageUploader/uploader';
import sendResponse from '../../utils/helpers/sendResponse';

const createNewsPage = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as IUploadFile[];
  const uploadedFiles: string[] = [];

  await Promise.all(
    files.map(async file => {
      const imgUrl = await FileUploadHelper.uploadToCloudinary(file);
      uploadedFiles.push(imgUrl);
    })
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: uploadedFiles,
    message: 'Successfully uploaded',
  });
});

export const adminController = { createNewsPage };
