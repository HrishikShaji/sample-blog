"use client";
import { FormEvent, useState } from "react";

export const Form = () => {
	const [task, setTask] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(task),
			}).then((res) => res.json());
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-2 p-5 bg-neutral-500 rounded-3xl"
		>
			<input
				value={task}
				onChange={(e) => setTask(e.target.value)}
				className="p-2 rounded-md"
				placeholder="task..."
			/>
			<button className="px-3 py-2 rounded-md bg-neutral-800 text-white">
				Set Task
			</button>
		</form>
	);
};
