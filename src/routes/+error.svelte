<script lang="ts">
	import { page } from '$app/stores';
	import { modalStore } from '@skeletonlabs/skeleton';

	modalStore.close();
</script>

<div class="flex h-full flex-col items-center justify-center">
	{#if $page.status === 404}
		<h1 class="h1">Page Not Found.</h1>
	{:else}
		<h1 class="h1">Unexpected Error</h1>
		<h3 class="mt-6">We're investigating the issue.</h3>
	{/if}
</div>
