<script lang="ts">
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import ThemeSwitch from '$lib/components/navbar/ThemeSwitch.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { createUserContext } from '$lib/stores/user';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';

	export let data: LayoutData;

	onMount(() => {
		themeChange(false);
	});

	const user = createUserContext(data.user);
	$: user.set(data.user);


</script>

<div>
	<Navbar fullUser={data.fullUser} servicos={data.servicos}/>
	<slot />
</div>
