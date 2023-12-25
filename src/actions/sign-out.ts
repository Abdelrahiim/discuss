"use server";
import * as auth from "@/auth";
/**
 * Sign out using Next Auth Library
 * @returns
 */
export async function signOut() {
  return auth.signOut();
}
