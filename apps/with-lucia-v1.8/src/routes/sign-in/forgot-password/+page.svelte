<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { AlertCircleIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message/client';

	import type { PageData } from './$types';
	export let data: PageData;

	const flash = getFlash(page);

	const { form, message, errors, enhance, delayed } = superForm(data.form, {
		defaultValidator: 'clear',
		onError: 'apply'
	});
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4">
	<section class="img-bg h-[32rem] w-[32rem]" />

	<form
		class="border-surface-400 bg-surface-500 text-token relative w-[32rem] space-y-6 rounded-xl border p-8 shadow-md"
		method="POST"
		use:enhance
	>
		<h2 class="h2 decoration-primary-400 text-center underline">Forgot your password?</h2>

		<p class="text-center">We can send an email to reset your password.</p>

		<label class="label relative">
			<span>Email</span>
			<input
				id="email"
				name="email"
				type="email"
				class="input"
				placeholder="john@example.com"
				autocomplete="email"
				data-invalid={$errors.email}
				bind:value={$form.email}
				class:input-error={$errors.email}
			/>
			{#if $errors.email}
				<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
				<small class="text-red-500">{$errors.email[0]}</small>
			{/if}
		</label>

		<button type="submit" class="btn variant-filled-primary w-full">
			{#if $delayed}
				<LoadingSpinner />
			{:else}
				Reset Password
			{/if}
		</button>

		{#if $message}
			<p class="text-secondary-300 text-center font-semibold">{$message}</p>
		{:else}
			<div class="flex justify-center">
				<a href="/sign-in" class="text-secondary-300 hover:underline hover:opacity-80">
					Go back to sign in
				</a>
			</div>
		{/if}
	</form>

	{#if $flash}
		<div class="variant-filled-success alert relative my-4 flex w-[32rem]">
			<span class="text-md alert-message w-full whitespace-pre-wrap text-center [&>a]:underline">
				{@html $flash.message}
			</span>
		</div>
	{/if}
</main>
