/*
  Warnings:

  - A unique constraint covering the columns `[pageId]` on the table `newsPage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "newsPage_pageId_key" ON "newsPage"("pageId");
