import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [formstate, setFormstate] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const [addBook] = useMutation(addBookMutation, {
    refetchQueries: [{ query: getBooksQuery }],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: formstate.name,
        genre: formstate.genre,
        authorId: formstate.authorId,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form
      id="add-book"
      onSubmit={submitHandler}
    >
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => {
            setFormstate({ ...formstate, name: e.target.value });
          }}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => {
            setFormstate({ ...formstate, genre: e.target.value });
          }}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => {
            setFormstate({ ...formstate, authorId: e.target.value });
          }}
        >
          <option>Select author</option>
          {data.authors.map((author) => (
            <option
              key={author.id}
              value={author.id}
            >
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
