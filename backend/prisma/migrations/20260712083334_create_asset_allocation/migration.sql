-- CreateEnum
CREATE TYPE "public"."AllocationStatus" AS ENUM ('ACTIVE', 'RETURNED');

-- CreateTable
CREATE TABLE "public"."asset_allocations" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "allocatedById" TEXT NOT NULL,
    "allocatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedReturnDate" TIMESTAMP(3),
    "returnedAt" TIMESTAMP(3),
    "status" "public"."AllocationStatus" NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,

    CONSTRAINT "asset_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "asset_allocations_assetId_idx" ON "public"."asset_allocations"("assetId");

-- CreateIndex
CREATE INDEX "asset_allocations_userId_idx" ON "public"."asset_allocations"("userId");

-- AddForeignKey
ALTER TABLE "public"."asset_allocations" ADD CONSTRAINT "asset_allocations_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "public"."assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."asset_allocations" ADD CONSTRAINT "asset_allocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."asset_allocations" ADD CONSTRAINT "asset_allocations_allocatedById_fkey" FOREIGN KEY ("allocatedById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
