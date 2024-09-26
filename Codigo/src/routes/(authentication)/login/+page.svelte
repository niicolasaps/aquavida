<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="min-h-[80vh] flex items-center justify-center">
	<div class="w-full max-w-sm mx-auto overflow-hidden bg-base-200 rounded-lg shadow-md">
		<div class="px-6 py-4">
			<h3 class="mt-3 text-xl font-medium text-center text-opacity-60">Bem vindo de volta!</h3>

			<form method="post" use:enhance>
				<div class="w-full mt-4">
					<label class="input input-bordered flex items-center gap-2">
						<input type="text" class="grow" placeholder="Email" />
					</label>
				</div>

				<div class="w-full mt-4">
					<label class="input input-bordered flex items-center gap-2">
						<input type="password" class="grow" />
					</label>
				</div>

				<button class="btn btn-primary w-full mt-4"> Entrar </button>
			</form>
		</div>

		<div class="flex items-center justify-center py-4 text-center bg-base-300 bg-opacity-40">
			<span class="text-sm text-opacity-60">Não tem uma conta? </span>

			<a href="/signup" class="mx-2 text-sm font-bold text-primary hover:underline">Registrar</a>
		</div>
	</div>
</div>
