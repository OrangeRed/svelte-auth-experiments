<script lang="ts">
	import SignInForm from '$lib/forms/SignInForm.svelte';
	import { AlertTriangleIcon } from 'lucide-svelte';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	$: redirectMessage =
		$page.url.searchParams.get('message') || 'You must be signed in to access this page.';
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4">
	<section class="img-bg h-[32rem] w-[32rem]" />

	{#if $page.url.searchParams.has('redirectTo')}
		<div class="variant-filled-error alert relative flex w-[32rem]">
			<AlertTriangleIcon class="scale-125 fill-surface-500 text-error-500" />
			<span class="text-md alert-message w-full">{redirectMessage}</span>
		</div>
	{/if}

	<SignInForm data={data.form} />
</main>
