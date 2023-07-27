<script lang="ts">
	import SignInForm from '$lib/forms/SignInForm.svelte';
	import { AlertTriangleIcon } from 'lucide-svelte';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	$: redirectMessage = $page.url.searchParams.get('message');
</script>

<main class="flex h-full w-full flex-col items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />

	{#if redirectMessage}
		<div class="variant-filled-error alert relative my-4 flex w-[32rem]">
			<AlertTriangleIcon class="fill-surface-500 text-error-500 scale-125" />
			<span class="text-md alert-message w-full">{redirectMessage}</span>
		</div>
	{/if}

	<SignInForm data={data.form} />
</main>
