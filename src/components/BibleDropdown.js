import React from "react";

const BibleDropdown = ({ selectedBook, onBookChange }) => {
  const books = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Revelation",
  ];

  return (
    <div className="my-4">
      <label className="block text-sm font-medium mb-1 text-white">Choose a Bible Book:</label>
      <select
        value={selectedBook}
        onChange={onBookChange}
        className="w-full p-2 rounded bg-white text-black"
      >
        <option value="">-- Select a Book --</option>
        {books.map((book) => (
          <option key={book} value={book}>
            {book}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BibleDropdown;
