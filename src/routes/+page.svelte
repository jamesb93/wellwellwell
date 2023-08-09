<script>
	let loaded = true;
	const load = () => {
		loaded = true;
	}
</script>


<main class='custom-cursor'>
	{#if !loaded}
		<button on:click={load}>load</button>
	{:else}
		<h1>hidde it is your birthday</h1>
		<img src='/wordart2.png'>
	{/if}
</main>


<style>
	h1 {
		font-family: 'Times New Roman', Times, serif;
		color: rgb(0, 106, 255);
	}

	img {
		max-width: 100%;
	}
</style>