import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { PrismaClient } from '@prisma/client';
import { jwtToken } from './jwtToken';

const prisma = new PrismaClient();

const verifyAuthWithRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwtToken.verifyToken(
        token,
        config.access_secret as string
      );
      if (!decoded.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const isExist = await prisma.users.findUnique({
        where: {
          id: decoded.userId,
        },
        select: {
          id: true,
          role: true,
          accountStatus: true,
          passwordChanged: true,
        },
      });

      if (!isExist?.id || !allowedRoles.includes(isExist.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (!isExist?.passwordChanged) {
        return res.status(401).json({ message: 'Change your password' });
      }

      req.user = {
        role: isExist.role,
        userId: isExist.id,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
};

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwtToken.verifyToken(token, config.access_secret as string);
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const isExist = await prisma.users.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        passwordChanged: true,
        accountStatus: true,
        role: true,
      },
    });
    if (isExist?.accountStatus !== 'active') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = {
      role: isExist.role,
      userId: isExist.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = verifyAuthWithRole(['admin', 'super_admin']);
const verifySuperAdmin = verifyAuthWithRole(['super_admin']);
const verifyOwner = verifyAuthWithRole(['owner']);

export { verifyAdmin, verifyOwner, verifyAuth, verifySuperAdmin };
