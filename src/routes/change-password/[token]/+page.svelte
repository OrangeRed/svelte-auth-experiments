<script lang="ts">
	import PasswordChangeForm from '$lib/forms/PasswordChangeForm.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main class="flex h-full w-full flex-col items-center justify-center gap-4">
	<section class="img-bg h-[32rem] w-[32rem]" />

	<PasswordChangeForm data={data.form} />
</main>
