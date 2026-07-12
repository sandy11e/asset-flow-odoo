-- CreateEnum
CREATE TYPE "public"."AssetStatus" AS ENUM ('AVAILABLE', 'ALLOCATED', 'RESERVED', 'UNDER_MAINTENANCE', 'LOST', 'RETIRED', 'DISPOSED');

-- CreateEnum
CREATE TYPE "public"."AssetCondition" AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'POOR');

-- CreateTable
CREATE TABLE "public"."assets" (
    "id" TEXT NOT NULL,
    "assetTag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serialNumber" TEXT,
    "categoryId" TEXT NOT NULL,
    "acquisitionDate" TIMESTAMP(3),
    "acquisitionCost" DECIMAL(10,2),
    "condition" "public"."AssetCondition" NOT NULL DEFAULT 'GOOD',
    "status" "public"."AssetStatus" NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT NOT NULL,
    "isBookable" BOOLEAN NOT NULL DEFAULT false,
    "qrCode" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assets_assetTag_key" ON "public"."assets"("assetTag");

-- CreateIndex
CREATE UNIQUE INDEX "assets_serialNumber_key" ON "public"."assets"("serialNumber");

-- CreateIndex
CREATE INDEX "assets_assetTag_idx" ON "public"."assets"("assetTag");

-- CreateIndex
CREATE INDEX "assets_serialNumber_idx" ON "public"."assets"("serialNumber");

-- CreateIndex
CREATE INDEX "assets_status_idx" ON "public"."assets"("status");

-- CreateIndex
CREATE INDEX "assets_categoryId_idx" ON "public"."assets"("categoryId");

-- AddForeignKey
ALTER TABLE "public"."assets" ADD CONSTRAINT "assets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."asset_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
