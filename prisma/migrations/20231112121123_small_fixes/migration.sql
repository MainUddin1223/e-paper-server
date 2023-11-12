/*
  Warnings:

  - Added the required column `order` to the `newsImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `newsPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "newsImages" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "newsPage" ADD COLUMN     "pageId" INTEGER NOT NULL;
