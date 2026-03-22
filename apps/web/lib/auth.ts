import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { admins } from "./db/schema";

export async function getAdminSession(): Promise<{ id: number; email: string; name: string } | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  if (!sessionToken) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(sessionToken, "base64").toString("utf-8")
    );
    if (!payload.id || !payload.email) return null;

    const db = getDb();
    const admin = await db
      .select({ id: admins.id, email: admins.email, name: admins.name })
      .from(admins)
      .where(eq(admins.id, payload.id))
      .limit(1);

    if (!admin[0]) return null;
    return admin[0];
  } catch {
    return null;
  }
}

export function createSessionToken(id: number, email: string): string {
  return Buffer.from(JSON.stringify({ id, email })).toString("base64");
}
