/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect,useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LibrarySidebar from "../components/LibrarySidebar";

export default function AddRecord(){

const router = useRouter();

const [students,setStudents] = useState<any[]>([]);
const [books,setBooks] = useState<any[]>([]);

const [form,setForm] = useState({
student_id:"",
book_id:""
})

const load = async()=>{

try{

const s = await api.get("/students")
const b = await api.get("/library/books")

setStudents(Array.isArray(s.data) ? s.data : s.data.data || [])
setBooks(Array.isArray(b.data) ? b.data : b.data.data || [])

}

catch{

toast.error("Failed to load data")

}

}

useEffect(()=>{
load()
},[])

const submit = async(e:any)=>{

e.preventDefault()

if(!form.student_id || !form.book_id){

toast.error("Select student and book")
return

}

try{

console.log("Sending Data:",form)

await api.post("/library/assign",form)

toast.success("Book Assigned Successfully")

router.push("/library")

}

catch(err:any){

console.log(err.response?.data)

toast.error("Failed to assign book")

}

}

return(

<div className="flex">

<LibrarySidebar/>

<div className="p-6 max-w-lg mx-auto w-full text-black">

<h1 className="text-2xl font-bold mb-6">
Assign Book
</h1>

<form onSubmit={submit} className="space-y-4">

<select
value={form.student_id}
onChange={(e)=>setForm({...form,student_id:e.target.value})}
className="w-full border p-3 rounded"
>

<option value="">Select Student</option>

{students.map((s:any)=>(
<option key={s.student_id} value={s.student_id}>
{s.first_name} {s.last_name}
</option>
))}

</select>

<select
value={form.book_id}
onChange={(e)=>setForm({...form,book_id:e.target.value})}
className="w-full border p-3 rounded"
>

<option value="">Select Book</option>

{books.map((b:any)=>(
<option key={b.book_id} value={b.book_id}>
{b.title}
</option>
))}

</select>

<button className="bg-blue-600 text-white w-full p-3 rounded">
Assign Book
</button>

</form>

</div>

</div>

)

}