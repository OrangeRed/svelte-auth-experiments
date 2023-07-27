<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { AlertCircleIcon, XIcon } from 'lucide-svelte';

	import type { SuperValidated } from 'sveltekit-superforms';
	import type { EmailChangeSchema } from '$routes/profile/+page.server';

	export let data: SuperValidated<EmailChangeSchema>;

	const { form, errors, enhance, delayed } = superForm(data, {
		defaultValidator: 'clear',
		onError: 'apply'
	});
</script>

<form
	class="absolute w-[32rem] space-y-6 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
	method="POST"
	action="?/changeEmail"
	use:enhance
>
	<h2 class="h2 text-center underline decoration-primary-400">Change Email</h2>

	{#if $errors._errors}
		<p class="text-center font-semibold text-red-500">{$errors._errors[0]}</p>
	{/if}

	<label class="label relative">
		<span>New Email</span>
		<input
			id="new_email"
			name="new_email"
			type="email"
			class="input"
			placeholder="New Email"
			autocomplete="email"
			data-invalid={$errors.new_email}
			bind:value={$form.new_email}
			class:input-error={$errors.new_email}
		/>
		{#if $errors.new_email}
			<AlertCircleIcon class="absolute bottom-[2.2rem] right-0 mx-3 text-red-500" />
			<small class="text-red-500">{$errors.new_email?.[0] ?? ''}</small>
		{/if}
	</label>

	<label class="label relative">
		<span>Confirm Password</span>
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
		{#if $delayed}
			<LoadingSpinner />
		{:else}
			Change email
		{/if}
	</button>

	<button
		type="reset"
		class="btn absolute left-0 top-0 m-6 rounded-none p-0"
		on:click={() => modalStore.close()}
	>
		<XIcon />
	</button>
</form>
