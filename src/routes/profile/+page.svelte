<script lang="ts">
	import EmailChangeForm from '$lib/forms/EmailChangeForm.svelte';
	import NameChangeForm from '$lib/forms/NameChangeForm.svelte';
	import PasswordChangeForm from '$lib/forms/PasswordChangeForm.svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { PencilIcon } from 'lucide-svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	$: user = data.user;
</script>

<main class="flex h-full w-full items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />

	<div
		class="w-[32rem] space-y-14 rounded-xl border border-surface-400 bg-surface-500 p-8 shadow-md text-token"
	>
		<h2 class="h2 text-center underline decoration-primary-400">My Profile</h2>

		<div class="grid grid-cols-4">
			<span class="opacity-70">Full Name</span>
			<span class="col-span-2 mx-2 capitalize">{user.firstName} {user.lastName}</span>
			<div class="flex justify-end">
				<button
					class="flex items-center text-secondary-400 underline duration-100 hover:opacity-70"
					on:click={() =>
						modalStore.trigger({
							type: 'component',
							component: { ref: NameChangeForm, props: { data: data.form } }
						})}
				>
					<PencilIcon class="h-4" />
					Edit
				</button>
			</div>
		</div>

		<div class="grid grid-cols-4">
			<span class="opacity-70">Email</span>
			<span class="col-span-2 mx-2">{user.email}</span>
			<div class="flex justify-end">
				<button
					class="flex items-center text-secondary-400 underline duration-100 hover:opacity-70"
					on:click={() =>
						modalStore.trigger({
							type: 'component',
							component: { ref: EmailChangeForm, props: { data: data.form } }
						})}
				>
					<PencilIcon class="h-4" />
					Edit
				</button>
			</div>
		</div>

		<div class="grid grid-cols-4">
			<span class="opacity-70">Password</span>
			<span class="col-span-2 mx-2 tracking-wide">********</span>
			<div class="flex justify-end">
				<button
					class="flex items-center text-secondary-400 underline duration-100 hover:opacity-70"
					on:click={() =>
						modalStore.trigger({
							type: 'component',
							component: { ref: PasswordChangeForm, props: { data: data.form, user: data.user } }
						})}
				>
					<PencilIcon class="h-4" />
					Edit
				</button>
			</div>
		</div>
	</div>
</main>
