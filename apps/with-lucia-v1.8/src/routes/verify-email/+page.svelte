<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { enhance } from '$app/forms';

	import type { SubmitFunction } from '@sveltejs/kit';

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

	<form
		class="border-surface-400 bg-surface-500 text-token w-[32rem] space-y-6 rounded-xl border p-8 shadow-md"
		method="POST"
		use:enhance={submitForm}
	>
		<h2 class="h2 decoration-primary-400 text-center underline">Email verification</h2>

		{#if submitting}
			<LoadingSpinner />
		{:else}
			<p class="text-center">
				A verification email was sent to your inbox. <br /> (i.e. console)
			</p>

			<div class="flex justify-center">
				<button type="submit" class="btn variant-filled-primary">
					Resend verification email
				</button>
			</div>
		{/if}
	</form>
</main>
