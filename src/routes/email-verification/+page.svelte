<script lang="ts">
	import { enhance } from '$app/forms';

	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let submitting = false;
	const submitForm: SubmitFunction = () => {
		// Before the form submits
		submitting = true;

		return async ({ update }) => {
			// After the form submits
			submitting = false;
			await update();
		};
	};
</script>

<main class="flex h-full w-full items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />

	<div
		class="w-[32rem] rounded-xl border border-surface-500 bg-surface-500 p-8 shadow-md text-token"
	>
		<h1 class="text-center text-2xl">Email verification</h1>

		<p class="my-4 text-center">
			An email verification link was sent to your inbox <br /> (i.e. console).
		</p>

		<form class="flex justify-center pt-4" method="POST" use:enhance={submitForm}>
			<button type="submit" class="btn variant-filled-success">Resend verification link</button>
		</form>

		{#if !submitting && form?.success}
			<p class="text-center">A new verification link was resent</p>
		{/if}
	</div>
</main>
