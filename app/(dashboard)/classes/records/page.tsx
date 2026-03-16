"use client";

import { useEffect,useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ClassSidebar from "../components/ClassSidebar";

interface RecordType{
record_id:string

student:{
first_name:string
last_name:string
}
class:number
}

export default function ClassRecords(){
const router = useRouter()
const [records,setRecords] = useState<RecordType[]>([])
const fetchRecords = async()=>{

try{

const res = await api.get("/classes/records")
   setRecords(res.data ?? [])
}

catch{
toast.error("Failed to load records")
}
}

useEffect(()=>{
fetchRecords()
},[])

return( 
      <div className="flex">

<ClassSidebar/>

<div className="flex-1 p-6 text-black">

<div className="flex justify-between mb-5">

<h1 className="text-2xl font-bold">
Class Records
</h1>

<button
onClick={()=>router.push("/classes/records/add")}
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
+ Add Record
</button>

</div>

<table className="w-full border">

<thead className="bg-gray-100">

<tr>
<th className="p-2 border">Student Name</th>
<th className="p-2 border">Class</th>
</tr>

</thead>

<tbody>

{records.length===0 ?

<tr>
<td colSpan={2} className="text-center p-4">
No Records
</td>
</tr>

:

records.map((r)=>(

<tr key={r.record_id}>

<td className="border p-2">
{r.student.first_name} {r.student.last_name}
</td>

<td className="border p-2">
{r.class?.class}
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