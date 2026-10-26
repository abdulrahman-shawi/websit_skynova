-- CreateTable
CREATE TABLE "device_requests" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'followup',
    "message" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_notes" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "device_requests" ADD CONSTRAINT "device_requests_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "customer_devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_notes" ADD CONSTRAINT "device_notes_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "customer_devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
