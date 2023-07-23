<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { AlertCircleIcon } from 'lucide-svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	const { form, message, errors, enhance } = superForm(data.form, {
		defaultValidator: 'clear',
		onUpdate: ({ form }) => {
			form.data.password = '';
		}
	});
</script>

<main class="flex h-full w-full items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />
	<form
		class="w-96 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
		method="POST"
		use:focusTrap={true}
		use:enhance
	>
		<h2 class="mb-8 text-center text-2xl">Sign In</h2>

		<label class="py-2" for="email">Email</label>
		<div class="relative flex flex-col">
			<input
				class="input"
				name="email"
				type="email"
				placeholder="john.smith@example.com"
				bind:value={$form.email}
			/>

			{#if $errors.email}
				<AlertCircleIcon class="absolute right-0 mx-3 mt-[0.6rem] text-red-500" />
			{/if}
		</div>
		<small class="text-red-500">{$errors.email?.[0] ?? ''}</small>

		<label class="py-2" for="password">Password</label>
		<div class="relative flex flex-col">
			<input
				class="input"
				name="password"
				type="password"
				placeholder="Password"
				bind:value={$form.password}
			/>
			{#if $errors.password}
				<AlertCircleIcon class="absolute right-0 mx-3 mt-[0.6rem] text-red-500" />
			{/if}
		</div>
		<small class="text-red-500">{$errors.password?.[0] ?? ''}</small>

		<p class="pt-4 text-center text-red-500">{$message ?? ''}</p>

		<div class="flex w-full justify-center p-2">
			<button type="submit" class="btn variant-filled-success">Submit</button>
		</div>
	</form>
</main>
