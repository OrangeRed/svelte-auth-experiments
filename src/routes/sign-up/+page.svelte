<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import { AlertCircleIcon } from 'lucide-svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	const { form, message, errors, enhance, submitting } = superForm(data.form, {
		defaultValidator: 'clear',
		onUpdate: ({ form }) => {
			form.data.confirm_password = '';
		}
	});
</script>

<main class="flex h-full w-full items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />
	<form
		class="w-[32rem] space-y-6 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
		method="POST"
		use:enhance
	>
		<h2 class="h2 text-center underline decoration-primary-400">Sign up</h2>

		<p class="text-center font-semibold text-red-500">{$message ?? ''}</p>

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
			<a href="/sign-in" class="text-secondary-300 focus:underline">Sign in</a>
		</div>
	</form>
</main>

<!-- 

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

		<p class="pt-4 text-center text-red-500">{$message ?? ''}</p>

		<div class="flex w-full justify-center p-2">
			<button type="submit" class="btn variant-filled-success">Submit</button>
		</div>


 -->
