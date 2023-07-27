<script lang="ts">
	import { enhance } from '$app/forms';
	import { ConicGradient, modalStore } from '@skeletonlabs/skeleton';

	import type { SubmitFunction } from '@sveltejs/kit';

	modalStore.close();

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
		class="w-[32rem] space-y-6 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
		method="POST"
		use:enhance={submitForm}
	>
		<h2 class="h2 text-center underline decoration-primary-400">Email verification</h2>

		{#if submitting}
			<ConicGradient
				stops={[
					{ color: 'transparent', start: 0, end: 25 },
					{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
				]}
				spin
				width="w-6"
			/>
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
