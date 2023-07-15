<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { AlertCircleIcon } from 'lucide-svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form, {
		defaultValidator: 'clear'
	});

	const isFocused = true;
</script>

<main
	class="variant-gradient-primary-secondary flex h-full w-full items-center justify-center bg-gradient-to-br"
>
	<div class="absolute top-0 z-10 m-16 w-full">
		<SuperDebug data={$form} />
	</div>
	<form
		class="w-[400px] rounded-xl bg-surface-500 p-8 shadow-md text-token"
		method="POST"
		use:focusTrap={isFocused}
		use:enhance
	>
		<h2 class="mb-8 text-center text-2xl">Sign Up</h2>

		<label class="py-2" for="first_name">First Name</label>
		<div class="relative flex flex-col justify-center">
			<input
				class="input"
				name="first_name"
				type="text"
				placeholder="John"
				bind:value={$form.first_name}
			/>
			{#if $errors.first_name}
				<AlertCircleIcon class="absolute right-0 mx-3 text-red-500" />
			{/if}
		</div>
		<small class="text-red-500">{$errors.first_name?.[0] ?? ''}</small>

		<label class="py-2" for="last_name">Last Name</label>
		<div class="relative flex flex-col">
			<input
				class="input"
				name="last_name"
				type="text"
				placeholder="Smith"
				bind:value={$form.last_name}
			/>
			{#if $errors.last_name}
				<AlertCircleIcon class="absolute right-0 mx-3 mt-[0.6rem] text-red-500" />
			{/if}
		</div>
		<small class="text-red-500">{$errors.last_name?.[0] ?? ''}</small>

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

		<label class="py-2" for="confirm_password">Confirm Password</label>
		<div class="relative flex flex-col">
			<input
				class="input"
				name="confirm_password"
				type="password"
				placeholder="Confirm"
				bind:value={$form.confirm_password}
			/>
			{#if $errors.confirm_password}
				<AlertCircleIcon class="absolute right-0 mx-3 mt-[0.6rem] text-red-500" />
			{/if}
		</div>
		<small class="text-red-500">{$errors.confirm_password?.[0] ?? ''}</small>

		<div class="flex w-full justify-center p-2">
			<button type="submit" class="btn variant-filled-success">Submit</button>
		</div>
	</form>
</main>
