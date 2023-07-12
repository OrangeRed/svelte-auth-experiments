<script>
	// export let form;
	let showPassword = false;
</script>

<main
	class="variant-gradient-primary-secondary flex h-screen w-full items-center justify-center bg-gradient-to-br"
>
	<form class="w-[400px] rounded-xl bg-surface-500 p-8 shadow-md text-token" method="POST">
		<h2 class="mb-8 text-center text-2xl">Sign Up</h2>
		<!-- {#if form}
        <h4 class="text-red-600 font-light text-md text-center" />
      {/if} -->
		<label class="label py-2">
			<span>First Name</span>
			<input class="input" name="first_name" type="text" placeholder="John" autocomplete="name" />
		</label>
		<label class="label py-2">
			<span>First Name</span>
			<input
				class="input"
				type="text"
				name="last_name"
				placeholder="Smith"
				autocomplete="family-name"
			/>
		</label>
		<label class="label py-2">
			<span>Email</span>
			<input
				class="input"
				name="email"
				type="email"
				placeholder="john@example.com"
				autocomplete="email"
			/>
		</label>
		<label class="label py-2">
			<span>Password</span>
			<input
				class="input"
				name="password"
				type={showPassword ? 'text' : 'password'}
				placeholder="Password"
				autocomplete="current-password"
			/>
		</label>
		<label class="label py-2">
			<span>Confirm Password</span>
			<input
				class="input"
				name="confirm_password"
				type={showPassword ? 'text' : 'password'}
				placeholder="Confirm"
			/>
		</label>
		<div class="flex w-full justify-center p-2">
			<button type="submit" class="btn variant-filled-success">Submit</button>
		</div>
	</form>
</main>
