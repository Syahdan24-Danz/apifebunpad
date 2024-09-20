/*
  Warnings:

  - You are about to drop the `lembagakemahasiswaan` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `admins` ADD COLUMN `managedById` INTEGER NULL;

-- DropTable
DROP TABLE `lembagakemahasiswaan`;

-- CreateTable
CREATE TABLE `lembaga_kemahasiswaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `bookletLink` VARCHAR(191) NULL,
    `pageLink` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `adminId` INTEGER NULL,

    UNIQUE INDEX `lembaga_kemahasiswaan_uniqueId_key`(`uniqueId`),
    UNIQUE INDEX `lembaga_kemahasiswaan_adminId_key`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_managedById_fkey` FOREIGN KEY (`managedById`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_kemahasiswaan` ADD CONSTRAINT `lembaga_kemahasiswaan_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
