<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message/client';

	import type { SubmitFunction } from '@sveltejs/kit';

	const flash = getFlash(page);

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

<main class="flex h-full w-full flex-col items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />

	<form
		class="border-surface-400 bg-surface-500 text-token w-[32rem] space-y-6 rounded-xl border p-8 shadow-md"
		method="POST"
		use:enhance={submitForm}
	>
		<h2 class="h2 decoration-primary-400 text-center underline">Email verification</h2>

		{#if submitting}
			<LoadingSpinner />
		{:else}
			<p class="text-center">Please verify your email address.</p>

			<div class="flex justify-center">
				<button type="submit" class="btn variant-filled-primary">
					Resend verification email
				</button>
			</div>
		{/if}
	</form>

	{#if !submitting && $flash}
		<div class="variant-filled-success alert relative my-4 flex w-[32rem]">
			<span class="text-md alert-message w-full whitespace-pre-wrap text-center [&>a]:underline">
				{@html $flash.message}
			</span>
		</div>
	{/if}
</main>
