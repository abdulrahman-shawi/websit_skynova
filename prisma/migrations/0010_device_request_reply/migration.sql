-- AlterTable
ALTER TABLE "device_requests" ADD COLUMN "reply" TEXT NOT NULL DEFAULT '',
ADD COLUMN "replied_at" TIMESTAMP(3);
