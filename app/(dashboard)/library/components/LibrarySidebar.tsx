"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LibrarySidebar(){

const path = usePathname()

const menu = [

{ name:"Books",path:"/library/books" },
{ name:"Records",path:"/library" },
{ name:"Add Record",path:"/library/add" }

]

return(

<div className="w-60 bg-white border-r h-screen p-4">

<h2 className="text-xl font-bold mb-6 text-black">
Library Panel
</h2>

<div className="space-y-2">

{menu.map((item)=>(

<Link
key={item.path}
href={item.path}
className={`block px-3 py-2 rounded-lg ${
path===item.path
?
"bg-blue-600 text-white"
:
"text-black hover:bg-gray-100"
}`}
>

{item.name}

</Link>

))}

</div>

</div>

)

}