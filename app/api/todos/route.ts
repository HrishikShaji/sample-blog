import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function POST(request: Request) {
	const body = await request.json();
	try {
		await prisma.todo.create({
			data: {
				task: body,
			},
		});
		return new NextResponse(
			JSON.stringify({ message: "success adding todos", status: 200 }),
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong", status: 500 }),
		);
	}
}

export const TODOS_PER_PAGE = 3;
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get("page"));

	try {
		const todos = await prisma.todo.findMany({
			take: TODOS_PER_PAGE,
			skip: (page - 1) * TODOS_PER_PAGE,
		});
		const count = await prisma.todo.count();
		console.log(todos);
		return new NextResponse(JSON.stringify({ todos: todos, count: count }));
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong", status: 500 }),
		);
	}
}
