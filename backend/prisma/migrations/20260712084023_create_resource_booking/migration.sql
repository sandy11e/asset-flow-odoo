-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."resource_bookings" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'UPCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resource_bookings_assetId_idx" ON "public"."resource_bookings"("assetId");

-- CreateIndex
CREATE INDEX "resource_bookings_userId_idx" ON "public"."resource_bookings"("userId");

-- AddForeignKey
ALTER TABLE "public"."resource_bookings" ADD CONSTRAINT "resource_bookings_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "public"."assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."resource_bookings" ADD CONSTRAINT "resource_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
