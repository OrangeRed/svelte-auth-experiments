<script lang="ts">
	import { ConicGradient } from '@skeletonlabs/skeleton';
</script>

<ConicGradient
	stops={[
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-900))', start: 75, end: 100 }
	]}
	spin
	width="w-6"
/>
