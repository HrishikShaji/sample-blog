import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

type Params = {
	params: {
		id: string;
	};
};

export async function DELETE(request: Request, { params }: Params) {
	try {
		await prisma.todo.delete({
			where: {
				id: params.id,
			},
		});
		return new NextResponse(JSON.stringify({ message: "delete success" }));
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
		);
	}
}

export async function PATCH(request: Request, { params }: Params) {
	const body = await request.json();
	try {
		await prisma.todo.update({
			where: {
				id: params.id,
			},
			data: {
				completed: body,
			},
		});
		return new NextResponse(JSON.stringify({ message: "update complete" }));
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
		);
	}
}
