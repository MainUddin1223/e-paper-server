import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  defaultPassword: process.env.DEFAULT_PASSWORD,
  server_url: process.env.SERVER_URL,
  api_route: process.env.API_ROUTE,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  bcrypt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  access_secret: process.env.ACCESS_SECRET,
  access_secret_expiry: process.env.ACCESS_EXPIRE_IN,
};
