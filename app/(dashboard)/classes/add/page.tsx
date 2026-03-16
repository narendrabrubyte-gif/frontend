"use client";

import { useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ClassSidebar from "../components/ClassSidebar";

export default function AddClass(){

const router = useRouter()
const [form,setForm] = useState({
name:"",
class:""
})

const submit = async(e:any)=>{
  e.preventDefault()
  if(!form.name || !form.class){
  toast.error("All fields required")
return
}

try{
  await api.post("/classes",form)
  toast.success("Class Added")
  router.push("/classes")
}
catch{
  toast.error("Failed to add class")
}
}

return(
<div className="flex">
   <ClassSidebar/>
<div className="p-6 max-w-lg mx-auto w-full text-black">

<h1 className="text-2xl font-bold mb-6">
Add Class
</h1>

<form onSubmit={submit} className="space-y-4">
<input
  placeholder="Name"
  value={form.name}
  onChange={(e)=>setForm({...form,name:e.target.value})}
  className="w-full border p-3 rounded"
/>

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

<button className="bg-blue-600 text-white w-full p-3 rounded">
Save
</button>
</form>
</div>
</div>

)
}