import { Form } from "./components/Form";
import { Todos } from "./components/Todos";

type SearchParams = {
	page: string;
};

export default function Home({ searchParams }: { searchParams: SearchParams }) {
	const page = parseInt(searchParams.page) || 1;
	return (
		<main className="p-10 h-screen w-full bg-teal-500 flex flex-col justify-center items-center">
			<Form />

			<Todos page={page} />
		</main>
	);
}
