<script>
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { getUserContext } from '$lib/stores/user';
	import { enhance } from '$app/forms';

	const user = getUserContext();
</script>

<nav class="bg-base-200">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<!-- <img src="logo" class="h-8" alt="Aqua vida logo" /> -->
			<span class="self-center text-2xl font-semibold whitespace-nowrap">Aqua vida</span>
		</a>
		<div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
			{#if $user}
				<div class="dropdown dropdown-end dropdown-bottom">
					<div title="Themes" role="button" tabindex="0" class="btn btn-primary">
						{$user.username}
					</div>

					<div
						class="dropdown-content z-10 mt-2 flex w-40 flex-col gap-2 overflow-y-scroll rounded-box bg-base-200 p-4 shadow-lg"
					>
						<a href="/profile" class="btn btn-secondary btn-sm flex justify-between w-full">
							<span>Meu perfil</span>
						</a>
						<form method="post" action="/login?/logout" class="w-full">
							<button class="btn btn-primary btn-sm flex justify-between w-full">
								<span>Logout</span>
							</button>
						</form>
					</div>
				</div>
				<ThemeSwitch />
				<!-- {$user.username}
				<form method="post" use:enhance>
					<button>Sign out</button>
				</form> -->
			{:else}
				<a href="/login" class="btn btn-primary">Login</a>
				<!-- <a href="/signup">cadastrar</a> -->
			{/if}

			<button
				data-collapse-toggle="navbar-user"
				type="button"
				class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2"
				aria-controls="navbar-user"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
		</div>
		<div
			class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
			id="navbar-user"
		>
			<ul
				class="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-base-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-base-200"
			>
				<li>
					<a href="/" class="btn m-1" aria-current="page">Página inicial</a>
				</li>
				{#if $user}
					<li>
						<a href="/customer/servicos" class="btn m-1">Todos servicos</a>
					</li>
					<div class="dropdown">
						<div tabindex="0" role="button" class="btn m-1">Admin</div>
						<ul
							tabindex="0"
							class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
						>
							<li><a href="/admin/clientes">Clientes</a></li>
							<li><a href="/admin/representantes">Representantes</a></li>
							<li><a href="/admin/servicos">Serviços</a></li>
							<li><a href="/admin/pedidos">Pedidos</a></li>
							<li><a href="/admin/template">Criar templates</a></li>
							<li><a href="/admin/contratos">Contratos</a></li>
						</ul>
					</div>
					<div class="dropdown">
						<div tabindex="0" role="button" class="btn m-1">Cliente</div>
						<ul
							tabindex="0"
							class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
						>
							<li><a href="/customer/solicitar">Solicitar serviço</a></li>
							<li><a href="/customer/contratos/1">Visualizar contratos</a></li>
						</ul>
					</div>
					<div class="dropdown">
						<div tabindex="0" role="button" class="btn m-1">Representante</div>
						<ul
							tabindex="0"
							class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
						>
							<li><a href="/representantes/clientes">Seus clientes</a></li>
						</ul>
					</div>
				{/if}
			</ul>
		</div>
	</div>
</nav>
