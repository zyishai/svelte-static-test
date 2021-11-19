<script>
	export let name;

	let count = 0;
</script>

<main class="p-12">
	<h1 class="text-red-500 font-bold text-4xl">Hello {name}!</h1>
	<p class="text-lg text-gray-700">Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<a href="/views/about" class="underline text-blue-500">About me</a>

	<p>{count}</p>
	<button class="bg-emerald-200 px-5 py-3 rounded-lg" on:click={() => count++}>Increment</button>
	<button on:click={() => count--}>Decrement</button>
</main>

<style windi:preflights:global windi:safelist:global>
</style>