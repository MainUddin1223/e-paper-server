-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "passwordChanged" BOOLEAN NOT NULL DEFAULT false;
