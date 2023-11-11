import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import * as fs from 'fs';
import { ICloudinaryResponse, IUploadFile } from './interface';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse> => {
  const path = file.path;
  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Dhaka',
  }).format(new Date());
  const folderName = publishedDate.replace(/\//g, '-');
  const options = { folder: `companyName/${folderName}-epaper` };
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      options,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          console.log('-------error', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
