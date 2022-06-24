/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `SubDirectory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `SubDirectory_name_userId_key` ON `SubDirectory`(`name`, `userId`);
