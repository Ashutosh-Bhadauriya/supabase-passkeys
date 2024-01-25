"use client"

import { get } from "@github/webauthn-json";

import { startServerPasskeyLogin, finishServerPasskeyLogin } from '@/utils/passkey';
import { getUserID } from "@/utils/verifiy-jwt";

export default function SignInWithPasskey() {

    async function signIn() {
        const assertion = await startServerPasskeyLogin();
        const credential = await get(assertion as any);
        const response = await finishServerPasskeyLogin(credential);
        if (!response || !response.token) {
            return null;
        }
        const {token} = response;
        const userID = await getUserID(token);
        console.log(userID);
    }
    return (
        <button onClick={signIn} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Sign in with passkey
        </button>
    )
}
