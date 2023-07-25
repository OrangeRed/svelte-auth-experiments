<script lang="ts">
	import SignUpForm from '$lib/forms/SignUpForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="flex h-full w-full items-center justify-center">
	<section class="img-bg h-[32rem] w-[32rem]" />

	<SignUpForm data={data.form} />
</main>
