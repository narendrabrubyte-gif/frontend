"use client";

import { useEffect,useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ClassSidebar from "../../components/ClassSidebar";

export default function AddRecord(){

const router = useRouter()

const [students,setStudents] = useState<any[]>([])

const [form,setForm] = useState({
student_id:"",
class:""
})

const load = async()=>{

try{

const s = await api.get("/students")

setStudents(Array.isArray(s.data)?s.data:[])

}

catch{

toast.error("Failed to load students")

}

}

useEffect(()=>{
load()
},[])

const submit = async(e:any)=>{

e.preventDefault()

if(!form.student_id || !form.class){

toast.error("Select student and class")
return

}

try{

await api.post("/class-records",form)

toast.success("Record Added")

router.push("/classes/records")

}

catch{

toast.error("Failed")

}

}

return(

<div className="flex">

<ClassSidebar/>

<div className="p-6 max-w-lg mx-auto w-full text-black">

<h1 className="text-2xl font-bold mb-6">
Add Class Record
</h1>

<form onSubmit={submit} className="space-y-4">

<select
value={form.class}
onChange={(e)=>setForm({...form,class:e.target.value})}
className="w-full border p-3 rounded"
>

<option value="">Select Class</option>

{Array.from({length:12},(_,i)=>i+1).map((c)=>(
<option key={c} value={c}>
Class {c}
</option>
))}

</select>

<select
value={form.student_id}
onChange={(e)=>setForm({...form,student_id:e.target.value})}
className="w-full border p-3 rounded"
>

<option value="">Select Student</option>

{students.map((s)=>(
<option key={s.student_id} value={s.student_id}>
{s.first_name} {s.last_name}
</option>
))}

</select>

<button className="bg-blue-600 text-white w-full p-3 rounded">
Save Record
</button>

</form>

</div>

</div>

)

}