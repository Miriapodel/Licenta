/*
  Warnings:

  - You are about to drop the column `isCarer` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isClient` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `isCarer`,
    DROP COLUMN `isClient`,
    ADD COLUMN `role` ENUM('CLIENT', 'CARER', 'ADMIN') NOT NULL DEFAULT 'CLIENT';
