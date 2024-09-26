<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
</script>

<div class="min-h-[80vh] flex items-center justify-center">
	<div class="w-full max-w-sm mx-auto overflow-hidden bg-base-200 rounded-lg shadow-md">
		<div class="px-6 py-4">
			<h3 class="mt-3 text-xl font-medium text-center text-opacity-60">Criar sua conta!</h3>
			<form method="post" use:enhance>
				<div class="w-full mt-4">
					<label class="input input-bordered flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="h-4 w-4 opacity-70"
						>
							<path
								d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
							/>
						</svg>
						<input type="text" class="grow" placeholder="Username" />
					</label>
				</div>
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

				<button class="btn btn-primary w-full mt-4"> Registrar </button>
			</form>
		</div>

		<div class="flex items-center justify-center py-4 text-center bg-base-300 bg-opacity-40">
			<span class="text-sm text-opacity-60">Já tem uma conta? </span>

			<a href="/login" class="mx-2 text-sm font-bold text-primary hover:underline">Login</a>
		</div>
	</div>
</div>
