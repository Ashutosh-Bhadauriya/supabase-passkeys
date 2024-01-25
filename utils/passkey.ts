"use server";

import { tenant } from "@teamhanko/passkeys-sdk";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const passkeyApi = tenant({
  apiKey: process.env.PASSKEYS_API_KEY!,
  tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
});

export async function startServerPasskeyRegistration() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) throw new Error("Not logged in");

  const createOptions = await passkeyApi.registration.initialize({
    userId: session.user.id,
    username: session.user.email || "",
  });

  return createOptions;
}

export async function finishServerPasskeyRegistration(credential: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Not logged in");

  await passkeyApi.registration.finalize(credential);

  // Now the user has registered their passkey and can use it to log in.
  // You don't have to do anything else here.
}



export async function startServerPasskeyLogin() {
    const options = await passkeyApi.login.initialize()
    return options;
}

export async function finishServerPasskeyLogin(options: any) {
   const response =  await passkeyApi.login.finalize(options);
   return response;
}
