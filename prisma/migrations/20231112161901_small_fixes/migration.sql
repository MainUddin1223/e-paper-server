/*
  Warnings:

  - You are about to drop the column `refrencePage` on the `newsImages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "newsImages" DROP COLUMN "refrencePage",
ADD COLUMN     "referencePage" INTEGER;
