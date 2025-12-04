import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * Get the current user's id from the server session.
 * Throws an Error when there is no authenticated user.
 */
export async function getUserIdFromSession() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id) throw new Error("Unauthenticated");
  return id;
}/**
 * Get the current user's id from a `NextRequest` by validating the JWT.
 * Useful inside Route Handlers (app/api) where you have the request object.
 */
export async function getUserIdFromRequest(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const id = token?.sub as string | undefined;
	if (!id) throw new Error("Unauthenticated");
	return id;
}