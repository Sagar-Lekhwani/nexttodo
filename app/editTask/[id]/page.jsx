import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditTaskForm from "@/components/EditTaskForm";
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getTaskById = async (id) => {

    const session = await getServerSession(authOptions);

    if(!session) redirect('/')

  try {
    const res = await fetch(`http://localhost:3000/api/task/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function editTask({ params }) {
  const { id } = params;
  const { task } = await getTaskById(id);
  const { taskname, description } = task;

  return <div>
       <UserInfo />
       <Navbar />
      <EditTaskForm id={id} taskname={taskname} description={description} />;
  </div>
  
}