"use server";

import { cookies } from "next/headers";

export const updateCookie = async (cookieName: string, value: boolean) => {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, value ? "true" : "false");
};
