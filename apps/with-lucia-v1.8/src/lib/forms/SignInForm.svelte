<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { AlertCircleIcon } from 'lucide-svelte';

	import type { SuperValidated } from 'sveltekit-superforms';
	import type { SignInSchema } from '$routes/sign-in/+page.server';

	export let data: SuperValidated<SignInSchema>;

	const { form, errors, enhance, delayed } = superForm(data, {
		defaultValidator: 'clear',
		onError: 'apply',
		onUpdate: ({ form }) => {
			form.data.password = '';
		}
	});
</script>

<form
	class="border-surface-400 bg-surface-500 text-token w-[32rem] space-y-6 rounded-xl border p-8 shadow-md"
	method="POST"
	use:enhance
>
	<h2 class="h2 decoration-primary-400 text-center underline">Sign in</h2>

	{#if $errors._errors}
		<p class="text-center font-semibold text-red-500">{$errors._errors[0]}</p>
	{/if}

	<label class="label relative">
		<span class="sr-only">Email</span>
		<input
			id="email"
			name="email"
			type="email"
			class="input"
			placeholder="Email Address"
			autocomplete="email"
			data-invalid={$errors.email}
			bind:value={$form.email}
			class:input-error={$errors.email}
		/>
		{#if $errors.email}
			<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
			<small class="text-red-500">{$errors.email?.[0] ?? ''}</small>
		{/if}
	</label>

	<label class="label relative">
		<span class="sr-only">Password</span>
		<input
			id="password"
			name="password"
			type="password"
			class="input"
			placeholder="Password"
			autocomplete="current-password"
			data-invalid={$errors.password}
			bind:value={$form.password}
			class:input-error={$errors.password}
		/>
		{#if $errors.password}
			<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
			<small class="text-red-500">{$errors.password?.[0] ?? ''}</small>
		{/if}
	</label>

	<div class="flex justify-center text-sm">
		<a href="/sign-in/forgot-password" class="text-secondary-300 hover:underline">
			Forgot Password?
		</a>
	</div>

	<button type="submit" class="btn variant-filled-primary w-full">
		{#if $delayed}
			<LoadingSpinner />
		{:else}
			Sign in
		{/if}
	</button>

	<div class="flex justify-center text-sm">
		<span class="opacity-60"> Don't have an account? &nbsp; </span>
		<a href="/sign-up" class="text-secondary-300 hover:underline">Sign up</a>
	</div>
</form>
