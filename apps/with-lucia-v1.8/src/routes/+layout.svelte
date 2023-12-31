<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { AppBar, AppShell, Avatar, Modal } from '@skeletonlabs/skeleton';
	import { page, navigating } from '$app/stores';
	import { GithubIcon } from 'lucide-svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let initials: string;
	$: if (data.user) {
		initials = data.user.firstName.slice(0, 1) + data.user.lastName.slice(0, 1);
	}
</script>

<Modal />

<AppShell>
	<!-- Header -->
	<svelte:fragment slot="header">
		<AppBar background="bg-transparent">
			<svelte:fragment slot="lead">
				<a href="/" class="text-xl uppercase"><strong>Svelte Auth Experiment</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if !data.user && $page.route.id === '/'}
					<a class="btn variant-outline-primary uppercase tracking-widest" href="/sign-in">
						Sign in
					</a>
					<a class="btn variant-ghost-primary uppercase tracking-widest" href="/sign-up">
						Sign up
					</a>
				{/if}

				{#if data.user}
					<form method="POST" action="/?/logout">
						<button type="submit" class="btn variant-outline-primary uppercase tracking-widest">
							Logout
						</button>
					</form>
					<a href="/profile" class="rounded-full">
						<Avatar
							class="variant-ghost-primary h-11 w-fit rounded-full"
							background="bg-transparent"
							{initials}
						/>
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Main Content -->
	<main class="h-full">
		{#if $navigating}
			<div class="flex h-full items-center justify-center">
				<LoadingSpinner />
			</div>
		{:else}
			<slot />
		{/if}
	</main>

	<!-- Footer -->
	<svelte:fragment slot="footer">
		<div class="flex h-full w-full flex-row justify-between bg-transparent p-4">
			<div />
			<a href="/" class="duration-150 hover:underline hover:opacity-70">Home</a>
			<a href="https://github.com/OrangeRed/svelte-auth-experiments" target="_blank">
				<GithubIcon class="w-full duration-150 hover:opacity-70" />
			</a>
		</div>
	</svelte:fragment>
</AppShell>
