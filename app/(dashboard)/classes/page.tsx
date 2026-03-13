"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ClassSidebar from "./components/ClassSidebar";

interface ClassType{
class_id:string
name:string
class:number
}

export default function ClassesPage(){

const router = useRouter()

const [classes,setClasses] = useState<ClassType[]>([])

const fetchClasses = async()=>{

try{

const res = await api.get("/classes")

setClasses(res.data ?? [])

}

catch{

toast.error("Failed to load classes")

}

}

useEffect(()=>{
fetchClasses()
},[])

return(

<div className="flex">

<ClassSidebar/>

<div className="flex-1 p-6 text-black">

<div className="flex justify-between mb-5">

<h1 className="text-2xl font-bold">
Classes
</h1>

<button
onClick={()=>router.push("/classes/add")}
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
+ Add Class
</button>

</div>

<table className="w-full border">

<thead className="bg-gray-100">

<tr>
<th className="p-2 border">ID</th>
<th className="p-2 border">Name</th>
<th className="p-2 border">Class</th>
</tr>

</thead>

<tbody>

{classes.length===0 ?

<tr>
<td colSpan={3} className="text-center p-4">
No Classes
</td>
</tr>

:

classes.map((c)=>(

<tr key={c.class_id}>

<td className="border p-2">
{c.class_id}
</td>

<td className="border p-2">
{c.name}
</td>

<td className="border p-2">
{c.class}
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