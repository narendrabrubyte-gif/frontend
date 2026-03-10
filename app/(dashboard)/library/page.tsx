/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LibrarySidebar from "./components/LibrarySidebar";

interface RecordType {
  assignment_id: string;
  issued_on: string;
  returned_on?: string;
  status: string;

  student?: {
    student_id: string;
    first_name: string;
    last_name: string;
  };

  book?: {
    book_id: string;
    title: string;
  };
}

export default function LibraryRecordsPage() {

  const router = useRouter();

  const [records,setRecords] = useState<RecordType[]>([]);
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(1);

  const limit = 7;

  const fetchRecords = async () => {
    try{
      const res = await api.get("/library/records");
      setRecords(res.data ?? []);
    }
    catch{
      toast.error("Failed to load records");
    }
  };

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecords();
  },[]);

  const handleDelete = async(id:string)=>{
    if(!confirm("Delete record ?")) return;

    try{
      await api.delete(`/library/records/${id}`);
      toast.success("Deleted");
      fetchRecords();
    }
    catch{
      toast.error("Delete failed");
    }
  }

  const filtered = records.filter((r)=>
  r.student?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
  r.book?.title?.toLowerCase().includes(search.toLowerCase())
)

  const totalPages = Math.ceil(filtered.length/limit);
  const start = (page-1)*limit;
  const paginated = filtered.slice(start,start+limit);

  return(

  <div className="flex">

  <LibrarySidebar/>

  <div className="flex-1 p-6 text-black">

  <div className="flex justify-between mb-5">

  <h1 className="text-2xl font-bold">
  Library Records
  </h1>

  <button
  onClick={()=>router.push("/library/add")}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
  + Add Record
  </button>

  </div>

  <input
  type="text"
  placeholder="Search student or book..."
  value={search}
  onChange={(e)=>{
    setSearch(e.target.value)
    setPage(1)
  }}
  className="border px-3 py-2 rounded mb-4 w-full max-w-md"
  />

  <table className="w-full border">

  <thead className="bg-gray-100">

  <tr>
  <th className="p-2 border">Student</th>
  <th className="p-2 border">Book</th>
  <th className="p-2 border">Issue</th>
  <th className="p-2 border">Return</th>
  <th className="p-2 border">Status</th>
  <th className="p-2 border">Action</th>
  </tr>

  </thead>

  <tbody>

  {paginated.length===0 ?

  <tr>
  <td colSpan={6} className="text-center p-4">
  No Records
  </td>
  </tr>

  :

  paginated.map((r)=>(

  <tr key={r.assignment_id}>

  <td className="border p-2">
  {r.student?.first_name} {r.student?.last_name}
  </td>

 <td className="border p-2">
  {r.book?.title || "No Book"}
</td>
  <td className="border p-2">
  {new Date(r.issued_on).toLocaleDateString()}
  </td>

  <td className="border p-2">
   {r.returned_on
   ? new Date(r.returned_on).toLocaleDateString()
   : "Not Returned"}
  </td>

  <td className="border p-2">
  {r.status}
  </td>

  <td className="border p-2 space-x-2">

  <button
  onClick={()=>router.push(`/library/view/${r.assignment_id}`)}
  className="bg-green-600 text-white px-2 py-1 rounded"
  >
  View
  </button>

  <button
  onClick={()=>router.push(`/library/edit/${r.assignment_id}`)}
  className="bg-yellow-500 text-white px-2 py-1 rounded"
  >
  Edit
  </button>

  <button
  onClick={()=>handleDelete(r.assignment_id)}
  className="bg-red-600 text-white px-2 py-1 rounded"
  >
  Delete
  </button>

  </td>

  </tr>

  ))

  }

  </tbody>

  </table>

  </div>
  </div>
  )
}