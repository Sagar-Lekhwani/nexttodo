
import { connectMongoDB } from "@/lib/mongodb";
import task from "@/models/task";

import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTask: taskname, newDescription: description } = await request.json();
  await connectMongoDB();
  await task.findByIdAndUpdate(id, { taskname, description });
  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    console.log(id)
    await connectMongoDB();
    const topic = await task.findOne({ _id: id });
    console.log(topic)
    return NextResponse.json({ task:topic }, { status: 200 });
  }