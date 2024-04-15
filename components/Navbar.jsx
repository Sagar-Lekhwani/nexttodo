import Link from "next/link";

export default function Navbar() {
  return  <div className="w-full p-4">
    <nav  className="max-w-screen-xl mx-auto flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href="/">
        Todolist
      </Link>
      <Link className="bg-white p-2" href="/addtask">
        Add Task
      </Link>
    </nav>
    </div>

  
}