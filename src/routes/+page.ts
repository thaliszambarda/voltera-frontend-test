import type { PageLoad } from './$types';

interface IDataReponse {
	name: string;
	age: number;
}

export const load: PageLoad = async ({ url, fetch }) => {
	try {
		const name = url.searchParams.get('name') ?? '';
	if (!name) return;

	const res = await fetch(`${import.meta.env.VITE_API_URL}/?name=${name}`);
	const data: IDataReponse = await res.json();
	
	return data;
	} catch (error) {
		console.error(error);
	}
};
