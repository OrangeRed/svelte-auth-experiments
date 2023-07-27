<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { AlertCircleIcon, XIcon } from 'lucide-svelte';
	import { modalStore } from '@skeletonlabs/skeleton';

	import type { User } from 'lucia-auth';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ChangePasswordSchema } from '$routes/profile/+page.server';

	export let user: User | null = null;
	export let data: SuperValidated<ChangePasswordSchema>;

	const { form, errors, enhance, delayed } = superForm(data, {
		defaultValidator: 'clear',
		onError: 'apply',
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				modalStore.close();
			}
		}
	});
</script>

<form
	class="absolute w-[32rem] space-y-6 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
	method="POST"
	action="?/changePassword"
	use:enhance
>
	<h2 class="h2 text-center underline decoration-primary-400">Change Password</h2>

	{#if $errors._errors}
		<p class="text-center font-semibold text-red-500">{$errors._errors[0]}</p>
	{/if}

	<label class="label relative">
		<span>New Password</span>
		<input
			id="password"
			name="password"
			type="password"
			class="input"
			placeholder="New Password"
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
		<span>Confirm New Password</span>
		<input
			id="confirm_password"
			name="confirm_password"
			type="password"
			class="input"
			placeholder="Confirm New Password"
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
		{#if $delayed}
			<LoadingSpinner />
		{:else}
			Change password
		{/if}
	</button>

	{#if user}
		<button
			type="reset"
			class="btn absolute left-0 top-0 m-6 rounded-none p-0"
			on:click={() => modalStore.close()}
		>
			<XIcon />
		</button>
	{/if}
</form>
