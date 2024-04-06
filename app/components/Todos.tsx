"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TODOS_PER_PAGE } from "../api/todos/route";

type TodoType = {
	id: string;
	task: string;
	completed: boolean;
};

type Data = {
	todos: TodoType[];
	count: number;
};

interface TodosProps {
	page: number;
}

export const Todos: React.FC<TodosProps> = ({ page }) => {
	const [data, setData] = useState<Data | null>(null);
	const router = useRouter();
	const [refetch, setRefetch] = useState(true);

	useEffect(() => {
		const getData = async () => {
			await fetch(`/api/todos?page=${page}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => res.json())
				.then((data) => setData(data));
		};

		getData();
	}, [page, refetch]);

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/todos/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			}).then((res) => res.json());
			console.log(response);
		} catch (error) {
			console.log(error);
		} finally {
			setRefetch(!refetch);
		}
	};
	const handleUpdate = async ({
		id,
		completed,
	}: {
		id: string;
		completed: boolean;
	}) => {
		try {
			const response = await fetch(`/api/todos/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(completed),
			}).then((res) => res.json());
			console.log(response);
		} catch (error) {
			console.log(error);
		} finally {
			setRefetch(!refetch);
		}
	};

	if (!data) return <div>Loading...</div>;

	const start = (Number(page) - 1) * TODOS_PER_PAGE;
	const end = start + TODOS_PER_PAGE;

	const hasNextPage = end < data.count;
	const hasPrevPAge = start > 0;

	return (
		<div className="p-10 bg-neutral-300 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				{data?.todos?.length === 0 ? (
					<div>no todos</div>
				) : (
					data.todos?.map((todo: TodoType) => (
						<div
							key={todo.id as string}
							className="flex  items-center justify-between p-2 rounded-2xl bg-white text-black"
						>
							<h1>{todo.task as string}</h1>
							<div className="flex gap-4">
								<button
									className={`${todo.completed ? "bg-green-500" : "bg-red-500"} p-2 rounded-md`}
									onClick={() =>
										handleUpdate({ id: todo.id, completed: !todo.completed })
									}
								>
									Update
								</button>
								<button
									onClick={() => handleDelete(todo.id)}
									className="p-2 rounded-md bg-black text-white"
								>
									DELETE
								</button>
							</div>
						</div>
					))
				)}
			</div>
			<button
				disabled={!hasPrevPAge}
				className="p-2 rounded-md bg-yellow text-black"
				onClick={() => router.push(`?page=${Number(page) - 1}`)}
			>
				PREV
			</button>
			<button
				disabled={!hasNextPage}
				className="p-2 rounded-md bg-yellow text-black"
				onClick={() => router.push(`?page=${Number(page) + 1}`)}
			>
				NEXT
			</button>
		</div>
	);
};
