import "server-only";
import { auth } from "./auth";

export async function getServerSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return null;
  }
  return session;
}

export async function requireAdmin() {
  const session = await getServerSession();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return null;
  }
  return session;
}
