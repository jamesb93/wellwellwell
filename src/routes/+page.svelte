<script>
	import { createDeviceInstance, sendDeviceMessage } from '$lib/helpers.js'
	import Dance from '../lib/Dance.svelte';
	let device, context;
	let danceState = 0;
	let piwiState = false;
	let piwiFlipState = false;
	let piwiFlipAllowed = false;

	const load = () => {
		context = new (window.AudioContext)();
		let output = context.createGain().connect(context.destination);
		createDeviceInstance('/patch.json', context, output)
		.then(async(response) => {
			device = response;
			device.messageEvent.subscribe(e => {
				if (e.tag === 'pulse') {
					danceState = !danceState;
					if (piwiFlipAllowed) {
						piwiFlipState = !piwiFlipState
					}

				} else if (e.tag === 'piwi') {
					piwiState = e.payload;
				} else if (e.tag === 'piwi_flip') {
					piwiFlipAllowed = e.payload;
				}
			});
			await fetch('/song.mp3')
			.then(response => response.arrayBuffer())
			.then(buffer => context.decodeAudioData(buffer))
			.then(audiobuf => device.setDataBuffer('song', audiobuf));
			sendDeviceMessage(device, 'start', [0]);
		})
	}
</script>


<main class='custom-cursor'>
	{#if !device}
		<button on:click={load} class='piwi-load-button'>
			<img src='/piwi.png' class='piwi-load'>
			<h1>enter</h1>
		</button>
	{:else}
		<h1>hidde it is your birthday</h1>
		<Dance bind:state={danceState} bind:piwi={piwiState} bind:piwiflip={piwiFlipState}/>
		<img src='/wordart3.png' class='word-art'>
	{/if}
</main>


<style>
	h1 {
		font-family: 'Times New Roman', Times, serif;
		color: rgb(0, 106, 255);
	}

	.word-art {
		max-width: 100%;
	}

	.piwi-load-button {
		width: 256px;
		background: none;
		outline: none;
		border: none;
		cursor: url('/piwi-cursor.png'), auto;
	}

	.piwi-load {
		max-width: 100%;
	}

	
</style>