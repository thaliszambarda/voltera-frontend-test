<script lang="ts">
	import './page.css';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { debounce } from '../utils/debounce.js';

	export let data;

	let name = '';
	let age: number = 0;

	function handleSubmit(value: string) {
		if (!browser) return;

		const trimmed = value.trim();

		if (trimmed) {
			goto(`/?name=${encodeURIComponent(trimmed)}`);
		} else {
			clear();
		}
	}

	const clear = () => {
		name = '';
		age = 0;

		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.delete('name');
			history.replaceState({}, '', url.pathname);
		}
	};

	const debouncedSubmit = debounce(handleSubmit, 500);

	$: if (data) {
		name = data.name?.trim?.() ?? '';
		age = data.age ?? 0;
	}
</script>

<main>
	<div class="container">
		<h1>🔮 Preditor de Idade</h1>

		<div class="input-container">
			<input
				type="text"
				bind:value={name}
				on:input={() => debouncedSubmit(name)}
				placeholder="Digite um nome para descobrir a idade..."
				autocomplete="off"
			/>
		</div>

		<div class="result">
			{#if name && age}
				<div class="result-content show">
					<div class="name">{name}</div>
					<div class="age">{age}</div>
					<div class="age-label">anos (estimativa)</div>
				</div>
			{:else}
				<div class="placeholder-text">Digite um nome e descubra a idade estimada!</div>
			{/if}
		</div>
	</div>
</main>