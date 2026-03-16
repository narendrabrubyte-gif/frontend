"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function CreateClass() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const createClass = async () => {
    await api.post("/classes", {
      name,
      type,
    });
    alert("Class created");
  };

  return (
    <div>
      <h1>Create Class</h1>
      <input
        placeholder="Class Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

     <input
        placeholder="Class Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <button onClick={createClass}>Create</button>
    </div>
  );
}