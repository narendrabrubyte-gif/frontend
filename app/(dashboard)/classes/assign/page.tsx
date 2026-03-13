"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function AssignStudent() {
  const [studentId, setStudentId] = useState("");
  const [classId, setClassId] = useState("");

  const assignStudent = async () => {
    await api.post("/classes/assign", {
      student_id: studentId,
      class_id: classId,
    });

    alert("Student Assigned");
  };

  return (
    <div>
      <h1>Assign Student</h1>

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <input
        placeholder="Class ID"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />

      <button onClick={assignStudent}>Assign</button>
    </div>
  );
}