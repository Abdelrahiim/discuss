"use server";
import * as auth from "@/auth";
/**
 * Sign in Using Next auth  Server Action
 * @returns method the Sign in with Github
 */
export async function signIn() {
  return auth.signIn("github");
}
