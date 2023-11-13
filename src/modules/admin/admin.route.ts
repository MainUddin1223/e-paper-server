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
  .route('/news-pages/:id')
  .patch(
    verifyAdmin,
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      return adminController.updateNewsPage(req, res, next);
    }
  )
  .get(verifyAdmin, adminController.getNewsPageById);

router.route('/news-pages').get(verifyAdmin, adminController.getNewPages);

router
  .route('/create-news')
  .post(
    verifyAdmin,
    FileUploadHelper.upload.array('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      return adminController.uploadNews(req, res, next);
    }
  );
router
  .route('/news/:id')
  .patch(
    verifyAdmin,
    FileUploadHelper.upload.array('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      return adminController.updateNews(req, res, next);
    }
  )
  .get(verifyAdmin, adminController.getNewsById)
  .delete(verifyAdmin, adminController.deleteNewsById);

router
  .route('/advertisement')
  .patch(
    verifyAdmin,
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      return adminController.addAdvertisement(req, res, next);
    }
  );

export default { adminRouter: router };
