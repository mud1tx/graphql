import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectBook, setSelectBook] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li
            key={book.id}
            onClick={() => {
              setSelectBook(book.id);
            }}
          >
            {book.name}
          </li>
        ))}
      </ul>
      {selectBook && <BookDetails bookId={selectBook} />}
    </div>
  );
};

export default BookList;
