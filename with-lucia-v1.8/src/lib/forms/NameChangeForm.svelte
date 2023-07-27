<script lang="ts">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { AlertCircleIcon, XIcon } from 'lucide-svelte';

	import type { SuperValidated } from 'sveltekit-superforms';
	import type { NameChangeSchema } from '$routes/profile/+page.server';

	export let data: SuperValidated<NameChangeSchema>;

	const { form, errors, enhance, delayed } = superForm(data, {
		defaultValidator: 'clear',
		onError: 'apply',
		onUpdate: ({ form }) => {
			if (form.valid) {
				modalStore.close();
			}
		}
	});
</script>

<form
	class="relative w-[32rem] space-y-6 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
	method="POST"
	action="?/changeName"
	use:enhance
>
	<h2 class="h2 text-center underline decoration-primary-400">Update Profile</h2>

	{#if $errors._errors}
		<p class="text-center font-semibold text-red-500">{$errors._errors[0]}</p>
	{/if}

	<label class="label relative">
		<span>First Name</span>
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
		<span>Last Name</span>
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

	<button type="submit" class="btn variant-filled-primary w-full">
		{#if $delayed}
			<LoadingSpinner />
		{:else}
			Update Profile
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
