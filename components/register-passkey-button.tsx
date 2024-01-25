"use client"

import {
    create,
    type CredentialCreationOptionsJSON,
} from "@github/webauthn-json";

import { finishServerPasskeyRegistration, startServerPasskeyRegistration } from '@/utils/passkey';

export default function RegisterPasskey() {

    async function registerPasskey() {
        const createOptions = await startServerPasskeyRegistration();
        const credential = await create(createOptions as CredentialCreationOptionsJSON);
        await finishServerPasskeyRegistration(credential);
    }

    return (
        <button onClick={() => registerPasskey()} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Register passkey
        </button>
    )
}
