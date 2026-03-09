/* eslint-disable react-hooks/exhaustive-deps */
 
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface Book {
  book_id: string;
  title: string;
  author: string;
  total_quantity: number;
  status: string;
}

export default function ViewBook() {

  const { id } = useParams();

  const [book,setBook] = useState<Book | null>(null);

  const fetchBook = async () => {

    try {

      const res = await api.get(`/library/books/${id}`);

      setBook(res.data);

    } catch {

      toast.error("Failed to load book");

    }

  };

  useEffect(() => {

    if(id) fetchBook();

  },[id]);

  if(!book) {

    return <div className="p-6">Loading...</div>;

  }

  return (

    <div className="p-6 text-black">

      <h1 className="text-2xl font-bold mb-4">
        Book Details
      </h1>

      <div className="space-y-2">

        <p>
          <b>Title:</b> {book.title}
        </p>

        <p>
          <b>Author:</b> {book.author}
        </p>

        <p>
          <b>Total Quantity:</b> {book.total_quantity}
        </p>

        <p>
          <b>Status:</b> {book.status}
        </p>

      </div>

    </div>
  );
}