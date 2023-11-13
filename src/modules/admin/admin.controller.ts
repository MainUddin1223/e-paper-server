import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { IUploadFile } from '../../utils/imageUploader/interface';
import { FileUploadHelper } from '../../utils/imageUploader/uploader';
import sendResponse from '../../utils/helpers/sendResponse';
import { adminService } from './admin.service';
import {
  createNewsSchema,
  createPageSchema,
  updateNewsSchema,
} from './admin.validator';
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

const uploadNews = catchAsync(async (req: Request, res: Response) => {
  const { error } = createNewsSchema.validate(req.body);
  if (error) {
    const message = error.details[0]?.message || 'Validation error';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }
  const userId = Number(req.user?.userId);
  const files = req.files as IUploadFile[];
  const uploadedFiles: string[] = [];

  await Promise.all(
    files.map(async file => {
      console.log('mapinggggg');
      const imgUrl = await FileUploadHelper.uploadToCloudinary(file);
      uploadedFiles.push(imgUrl);
    })
  );

  const result = await adminService.uploadNews({
    ...req.body,
    userId,
    images: uploadedFiles,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Successfully uploaded',
  });
});

const updateNews = catchAsync(async (req: Request, res: Response) => {
  const { error } = updateNewsSchema.validate(req.body);
  if (error) {
    const message = error.details[0]?.message || 'Validation error';
    throw new ApiError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, message);
  }
  const id = Number(req.params.id);
  const files = req.files as IUploadFile[];
  const uploadedFiles: string[] = [];
  let result;
  if (files) {
    await Promise.all(
      files.map(async file => {
        const imgUrl = await FileUploadHelper.uploadToCloudinary(file);
        uploadedFiles.push(imgUrl);
      })
    );
    result = await adminService.updateNews(id, {
      ...req.body,
      images: uploadedFiles,
    });
  } else {
    result = await adminService.updateNews(id, { ...req.body });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Successfully updated',
  });
});

const getNewsById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.getNewsById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'News page fetched successfully',
  });
});

const deleteNewsById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.deleteNewsById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'News page fetched successfully',
  });
});

const addAdvertisement = catchAsync(async (req: Request, res: Response) => {
  const adSection = req.query.adSection as
    | 'topAds'
    | 'leftAds'
    | 'bottomAds'
    | 'rightAds'
    | 'popupAds';
  if (!adSection) {
    throw new ApiError(500, 'Add section needed');
  }
  const file = req.file as IUploadFile;
  let pageImg = req.body.pageImg || null;
  if (file) {
    pageImg = await FileUploadHelper.uploadToCloudinary(file);
  }

  const result = await adminService.addAdvertisement({
    position: adSection,
    add: pageImg,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Ad added successfully',
  });
});

export const adminController = {
  createNewsPage,
  updateNewsPage,
  getNewPages,
  getNewsPageById,
  uploadNews,
  updateNews,
  getNewsById,
  deleteNewsById,
  addAdvertisement,
};
