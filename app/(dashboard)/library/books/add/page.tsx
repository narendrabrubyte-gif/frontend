/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddBookPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    bookClass: "",
    total_quantity: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!form.title || !form.bookClass) {
      toast.error("All fields required");
      return;
    }

    try {

      await api.post("/library/books", {
         title: form.title,
        book_class: form.bookClass,
        total_quantity: Number(form.total_quantity),
      });

      toast.success("Book Added Successfully");

      router.push("/library/books");

    } catch (error) {

      toast.error("Error adding book");

    }
  };

  return (

    <div className="p-6 text-black max-w-lg mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Add Book
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="bookClass"
          placeholder="Class"
          value={form.bookClass}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="total_quantity"
          placeholder="Quantity"
          value={form.total_quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Save
        </button>

      </form>

    </div>

  );
}