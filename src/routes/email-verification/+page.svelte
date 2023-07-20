<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main
	class="variant-gradient-primary-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
>
	<div class="w-1/2 rounded-xl bg-surface-500 p-8 shadow-md text-token">
		<h1 class="text-center text-2xl">Email verification</h1>

		<p class="my-4 text-center">
			An email verification link was sent to your inbox (i.e. console).
		</p>

		<form class="flex justify-center pt-4" method="POST" use:enhance>
			<button type="submit" class="btn variant-filled-success">Resend verification link</button>
		</form>

		{#if form?.success}
			<p class="text-center">Your verification link was resent</p>
		{/if}
	</div>
</main>
