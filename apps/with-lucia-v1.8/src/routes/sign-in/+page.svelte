<script lang="ts">
	import SignInForm from '$lib/forms/SignInForm.svelte';
	import { AlertTriangleIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message/client';

	import type { PageData } from './$types';

	export let data: PageData;

	const flash = getFlash(page);
</script>

<main class="flex h-full w-full flex-col items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />

	{#if $flash}
		<div class="variant-filled-error alert relative my-4 flex w-[32rem]">
			<AlertTriangleIcon class="fill-surface-500 text-error-500 scale-125" />
			<span class="text-md alert-message w-full">{$flash.message}</span>
		</div>
	{/if}

	<SignInForm data={data.form} />
</main>
