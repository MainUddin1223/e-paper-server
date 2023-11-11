-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('owner', 'superAdmin', 'admin');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'admin',
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'active',
    "credintial" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsPage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "newsDate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "pageImg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsImages" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pageId" INTEGER NOT NULL,
    "images" TEXT[],
    "refrencePage" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisements" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "topAds" TEXT[],
    "leftAds" TEXT[],
    "bottomAds" TEXT[],
    "rightAds" TEXT[],
    "popupAds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "advertisements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featuredPage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "publishedDate" TIMESTAMP(3) NOT NULL,
    "pageImage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featuredPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "newsPage" ADD CONSTRAINT "newsPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsImages" ADD CONSTRAINT "newsImages_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "newsPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsImages" ADD CONSTRAINT "newsImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featuredPage" ADD CONSTRAINT "featuredPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
