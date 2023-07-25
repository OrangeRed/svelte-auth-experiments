<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import { AlertCircleIcon } from 'lucide-svelte';

	import type { SuperValidated } from 'sveltekit-superforms';
	import type { SignUpSchema } from '$routes/sign-up/+page.server';

	export let data: SuperValidated<SignUpSchema, FormMessage>;

	const { form, message, errors, enhance, submitting } = superForm(data, {
		defaultValidator: 'clear',
		onError: 'apply',
		onUpdate: ({ form }) => {
			form.data.confirm_password = '';
		}
	});
</script>

<form
	class="w-[32rem] space-y-6 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
	method="POST"
	use:enhance
>
	<h2 class="h2 text-center underline decoration-primary-400">Sign up</h2>

	{#if $message?.status === 'error'}
		<p class="text-center font-semibold text-red-500">{$message.content}</p>
	{/if}

	<label class="label relative">
		<span class="sr-only">First Name</span>
		<input
			id="first_name"
			name="first_name"
			type="text"
			class="input"
			placeholder="First Name"
			autocomplete="name"
			data-invalid={$errors.first_name}
			bind:value={$form.first_name}
			class:input-error={$errors.first_name}
		/>
		{#if $errors.first_name}
			<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
			<small class="text-red-500">{$errors.first_name?.[0] ?? ''}</small>
		{/if}
	</label>

	<label class="label relative">
		<span class="sr-only">Last Name</span>
		<input
			id="last_name"
			name="last_name"
			type="text"
			class="input"
			placeholder="Last Name"
			autocomplete="family-name"
			data-invalid={$errors.last_name}
			bind:value={$form.last_name}
			class:input-error={$errors.last_name}
		/>
		{#if $errors.last_name}
			<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
			<small class="text-red-500">{$errors.last_name?.[0] ?? ''}</small>
		{/if}
	</label>

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
			data-invalid={$errors.password}
			bind:value={$form.password}
			class:input-error={$errors.password}
		/>
		{#if $errors.password}
			<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
			<small class="text-red-500">{$errors.password?.[0] ?? ''}</small>
		{/if}
	</label>

	<label class="label relative">
		<span class="sr-only">Confirm Password</span>
		<input
			id="confirm_password"
			name="confirm_password"
			type="password"
			class="input"
			placeholder="Confirm Password"
			data-invalid={$errors.confirm_password}
			bind:value={$form.confirm_password}
			class:input-error={$errors.confirm_password}
		/>
		{#if $errors.confirm_password}
			<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
			<small class="text-red-500">{$errors.confirm_password?.[0] ?? ''}</small>
		{/if}
	</label>

	<button type="submit" class="btn variant-filled-primary w-full">
		{#if $submitting}
			<ConicGradient
				stops={[
					{ color: 'transparent', start: 0, end: 25 },
					{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
				]}
				spin
				width="w-6"
			/>
		{:else}
			Sign up
		{/if}
	</button>

	<div class="flex text-sm">
		<span class="opacity-60"> Already have an account? &nbsp; </span>
		<a href="/sign-in" class="text-secondary-300 hover:underline">Sign in</a>
	</div>
</form>
