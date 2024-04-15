import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";
import task from "@/models/task";

export async function POST(req) {
    
  try {
    
    const { name, description , email } = await req.json();
    await connectMongoDB();

    const currentuser = await User.findOne({ email });
    const ID = currentuser._id;
    const createdtask = await task.create({taskname:name , description:description , user:ID})

     await currentuser.tasks.push(createdtask._id);
     await currentuser.save();
    

    return NextResponse.json({ message: "Task Added successfully." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the task." },
      { status: 500 }
    );
  }
}


export async function GET(req) {
    try {
        await connectMongoDB();
        const tasks = await task.find();
        return NextResponse.json({tasks});
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while fetching the task." },
            { status: 500 }
          );
    }
} 

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        const ftask = await task.findById(id).populate('user');
        const user = await User.findById(ftask.user)
        await connectMongoDB();
        await task.findByIdAndDelete(id);
        await user.tasks.splice(ftask._id , 1);
        await user.save();
        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while deleting the task." },
            { status: 500 }
          );
    }
} 