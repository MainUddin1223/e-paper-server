import express, { NextFunction, Request, Response } from 'express';
import { adminController } from './admin.controller';
import { FileUploadHelper } from '../../utils/imageUploader/uploader';
import { verifyAdmin } from '../../utils/auth_jwt/verifyAuth';

const router = express.Router();

router
  .route('/create-news-page')
  .post(
    verifyAdmin,
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      return adminController.createNewsPage(req, res, next);
    }
  );
router
  .route('/update-news-page/:id')
  .patch(
    verifyAdmin,
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      return adminController.updateNewsPage(req, res, next);
    }
  );
// .route('/create-news-page')
// .post(
//   FileUploadHelper.upload.array('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     return adminController.createNewsPage(req, res, next);
//   }
// );

export default { adminRouter: router };
