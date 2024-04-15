import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import TasksList from "@/components/tasklist";

export default function Dashboard() {
  return (
    <div>
    <UserInfo />
    <Navbar />
    <TasksList />
    </div>
);
  
  
}
