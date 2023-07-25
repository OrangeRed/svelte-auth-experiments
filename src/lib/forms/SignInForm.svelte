<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import { AlertCircleIcon } from 'lucide-svelte';

	import type { SuperValidated } from 'sveltekit-superforms';
	import type { SignInSchema } from '$routes/sign-in/+page.server';

	export let data: SuperValidated<SignInSchema, FormMessage>;

	const { form, message, errors, enhance, delayed } = superForm(data, {
		defaultValidator: 'clear',
		onError: 'apply',
		onUpdate: ({ form }) => {
			form.data.password = '';
		}
	});
</script>

<form
	class="w-[32rem] space-y-6 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
	method="POST"
	use:enhance
>
	<h2 class="h2 text-center underline decoration-primary-400">Sign in</h2>

	{#if $message?.status === 'error'}
		<p class="text-center font-semibold text-red-500">{$message.content}</p>
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
		<!-- TODO password reset -->
		<a href="/" class="text-secondary-300 hover:underline">Forgot Password?</a>
	</div>

	<button type="submit" class="btn variant-filled-primary w-full">
		{#if $delayed}
			<ConicGradient
				stops={[
					{ color: 'transparent', start: 0, end: 25 },
					{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
				]}
				spin
				width="w-6"
			/>
		{:else}
			Sign in
		{/if}
	</button>

	<div class="flex justify-center text-sm">
		<span class="opacity-60"> Don't have an account? &nbsp; </span>
		<a href="/sign-up" class="text-secondary-300 hover:underline">Sign up</a>
	</div>
</form>
