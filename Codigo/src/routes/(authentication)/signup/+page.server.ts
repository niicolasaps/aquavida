import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';

import type { Actions } from './$types';
import {
	clienteController,
	representanteController,
	userController
} from '$lib/server/db/controllers';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');
		const cpf = String(formData.get('cpf'))
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive

		const isCliente = formData.get('isCliente') === 'true';
		const cep = formData.get('cep');
		const street = formData.get('street');
		const city = formData.get('city');
		const state = formData.get('state');
		const number = formData.get('number');
		const bairro = formData.get('bairro');
		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Nome de úsuario inválido'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Senha inválida'
			});
		}
		if (
			typeof email !== 'string' ||
			email.length < 3 ||
			email.length > 255 ||
			!email.includes('@')
		) {
			return fail(400, {
				message: 'Email inválido'
			});
		}

		if (isCliente) {
			if (typeof cep != 'string' || cep.length !== 8) {
				return fail(400, {
					message: 'CEP deve conter 8 dígitos'
				});
			}
		}

		const userId = generateIdFromEntropySize(10);
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		const existingRepresentante = await representanteController.getRepresentanteByCPF(cpf as string);

		if(!isCliente && !existingRepresentante) {
			return fail(400, {
				message: 'Nenhum representante com esse CPF'
			});
		}

		//TODO: Quando um representante já ta cadastrado não deixar fazer o update

		// TODO: check if username is already used
		await userController.insertUser({
			id: userId,
			username: username,
			password_hash: passwordHash,
			email: email,
			tipo: isCliente ? 'cliente' : 'representante'
		});

		if (isCliente) {
			await clienteController.insertCliente({
				name: username,
				email: email,
				endereco: `${cep}, ${bairro}, ${city}, ${street}, ${number}, ${state}`,
				cnpj: cpf
			});
		} else if (existingRepresentante) {
			await representanteController.updateRepresentante(existingRepresentante.id, {
				name: username,
				email: email,
			});
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
