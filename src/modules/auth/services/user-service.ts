import "server-only";
import { users } from "@/db/schema";
import { db } from "@/shared/lib/db";
import { hash } from "bcrypt-ts";
import { eq } from "drizzle-orm";

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const passwordHash = await hash(data.password, 12);

  const result = await db
    .insert(users)
    .values({
      email: data.email,
      passwordHash,
      name: data.name,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
    });

  return result[0];
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

  return result[0] || null;
}
