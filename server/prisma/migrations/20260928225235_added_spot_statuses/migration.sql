/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `Spot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lat,lng]` on the table `Spot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Spot" ADD COLUMN     "address" TEXT,
ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "hasCharging" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasGenerator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasInternet" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Spot_adminId_key" ON "Spot"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Spot_lat_lng_key" ON "Spot"("lat", "lng");

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
