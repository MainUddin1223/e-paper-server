import express, { NextFunction, Request, Response } from 'express';
import { adminController } from './admin.controller';
import { FileUploadHelper } from '../../utils/imageUploader/uploader';

const router = express.Router();

router
  .route('/create-news-page')
  .post(
    FileUploadHelper.upload.array('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      return adminController.createNewsPage(req, res, next);
    }
  );

export default { adminRouter: router };
