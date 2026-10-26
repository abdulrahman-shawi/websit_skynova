import { getDb } from "./db";
import { verifyCustomerSessionValue } from "./customer-auth";

export async function findOwnedDevice(
  deviceId: number,
  sessionToken: string | undefined
) {
  const customerId = verifyCustomerSessionValue(sessionToken);
  if (!customerId) return null;
  const db = getDb();
  if (!db) return null;
  try {
    const device = await db.customerDevice.findFirst({
      where: { id: deviceId, customerId },
    });
    return device;
  } catch {
    return null;
  }
}
