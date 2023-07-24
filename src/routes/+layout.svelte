<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';

	import { page } from '$app/stores';

	export let data: PageData;
</script>

<AppShell>
	<!-- Header -->
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Svelte Auth Experiment</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if !data.user}
					<a class="btn variant-filled" href="/sign-in">Login</a>
				{:else}
					<form method="POST" action="?/logout">
						<button type="submit" class="btn variant-filled">Logout</button>
					</form>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Main Content -->
	<main class="container mx-auto flex h-full">
		<slot />
	</main>

	<!-- Footer -->
	<svelte:fragment slot="footer">
		<div class="m-8 flex flex-row justify-center">
			<a href="/">Home</a>
		</div>
	</svelte:fragment>
</AppShell>
