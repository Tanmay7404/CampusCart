/*
  Warnings:

  - Added the required column `statusCode` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `statusCode` INTEGER NOT NULL;
