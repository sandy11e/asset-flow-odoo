/*
  Warnings:

  - You are about to drop the `AssetCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."AssetCategory";

-- CreateTable
CREATE TABLE "public"."asset_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."CategoryStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "asset_categories_name_key" ON "public"."asset_categories"("name");
