-- CreateTable
CREATE TABLE `prestasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `npm` VARCHAR(15) NOT NULL,
    `namaKejuaraan` VARCHAR(100) NOT NULL,
    `prodi` VARCHAR(50) NOT NULL,
    `tanggalKejuaraan` DATETIME(3) NOT NULL,
    `peringkat` VARCHAR(50) NOT NULL,
    `imageKejuaraan` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
