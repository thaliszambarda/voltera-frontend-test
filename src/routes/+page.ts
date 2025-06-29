import type { PageLoad } from './$types';

interface IDataReponse {
	age: number;
}

export const load: PageLoad = async ({ url, fetch }) => {
	try {
		const name = url.searchParams.get('name') ?? '';
		if (!name) return;

		const res = await fetch(`${import.meta.env.VITE_API_URL}/?name=${name}`);

		if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

		const { age }: IDataReponse = await res.json();

		return { name, age };
	} catch (error) {
		console.error('Erro ao carregar dados:', error);
	}
};
