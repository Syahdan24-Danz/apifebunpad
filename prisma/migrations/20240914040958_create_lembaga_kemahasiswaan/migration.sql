-- CreateTable
CREATE TABLE `LembagaKemahasiswaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `bookletLink` VARCHAR(191) NULL,
    `pageLink` VARCHAR(191) NULL,

    UNIQUE INDEX `LembagaKemahasiswaan_uniqueId_key`(`uniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
