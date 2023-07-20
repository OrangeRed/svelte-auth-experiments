import '@total-typescript/ts-reset';
import type { AuthRequest } from 'lucia-auth';
import type { LuciaAuth } from '$lib/server/auth';
import type { AuthUser } from '$lib/server/schema/users';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			auth: AuthRequest;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = LuciaAuth;
		type UserAttributes = AuthUser;
	}
}
