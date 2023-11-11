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
        config.jwt.jwt_access_secret as string
      );
      let isExist;
      if (!decoded.authId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (decoded.role === 'agency') {
        isExist = await prisma.agency.findUnique({
          where: {
            id: decoded.userId,
          },
          select: {
            id: true,
            auth: {
              select: {
                id: true,
                role: true,
                accountStatus: true,
              },
            },
          },
        });
      } else {
        isExist = await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },
          select: {
            id: true,
            auth: {
              select: {
                id: true,
                role: true,
                accountStatus: true,
              },
            },
          },
        });
      }

      if (!isExist?.id || !allowedRoles.includes(isExist.auth?.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = {
        authId: isExist.auth.id,
        role: isExist.auth.role,
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
    const decoded = jwtToken.verifyToken(
      token,
      config.jwt.jwt_access_secret as string
    );
    let isExist;
    if (!decoded.authId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (decoded.role === 'agency') {
      isExist = await prisma.agency.findUnique({
        where: {
          id: decoded.userId,
        },
        select: {
          id: true,
          auth: {
            select: {
              id: true,
              role: true,
              accountStatus: true,
            },
          },
        },
      });
    } else {
      isExist = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
        select: {
          id: true,
          auth: {
            select: {
              id: true,
              role: true,
              accountStatus: true,
            },
          },
        },
      });
    }
    if (isExist?.auth.accountStatus !== 'active') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = {
      authId: isExist.auth.id,
      role: isExist.auth.role,
      userId: isExist.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = verifyAuthWithRole(['admin', 'super_admin']);
const verifySuperAdmin = verifyAuthWithRole(['super_admin']);
const verifyUser = verifyAuthWithRole(['user']);
const verifyAgency = verifyAuthWithRole(['agency']);

export { verifyAdmin, verifyUser, verifyAuth, verifySuperAdmin, verifyAgency };
