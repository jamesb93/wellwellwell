<script>
	export let state = 0;
	export let piwi = 0;
	export let piwiflip = 0;
</script>

<div class='row'>
	{#if state}
	<img src='/hidde0.png'>
	{:else}
	<img src='/hidde1.png'>
	{/if}

	{#if piwi}
	<img src=/piwi.png class:flip={piwiflip}/>
	{/if}
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	img {
		max-width: 500px;
		max-height: 500px;
	}

	.flip {
		transform: scaleX(-1);
	}
</style>
