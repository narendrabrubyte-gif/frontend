"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

interface Book {
  book_id: string;
  title: string;
  book_class: string;
  total_quantity: number;
  status: string;
}

export default function BooksPage() {

  const router = useRouter();

  const [books,setBooks] = useState<Book[]>([]);
  const [loading,setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/library/books");
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-black">
          <BookOpen size={22}/>
          Library Books
        </h1>

        <button
          onClick={() => router.push("/library/books/add")}
          className="bg-purple-600 text-white px-4 py-2 rounded"        >
          + Add Book
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            Loading books...
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-purple-50 text-black">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">class</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.book_id} className="border-b text-black">
                  <td className="p-4">{b.title}</td>
                  <td className="p-4">{b.book_class}</td>
                  <td className="p-4">{b.total_quantity}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold text-black ${
                        b.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}                   >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
