/*
  Warnings:

  - You are about to drop the column `query` on the `SearchHistory` table. All the data in the column will be lost.
  - Added the required column `search` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SearchHistory` DROP COLUMN `query`,
    ADD COLUMN `search` VARCHAR(191) NOT NULL;
