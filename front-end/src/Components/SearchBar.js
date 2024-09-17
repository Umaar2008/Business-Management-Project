import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch, ...rest }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    onSearch(event.target.value); 
    // Call the parent-provided onSearch function
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-4">
      <input
        {...rest}
        type="text"
        placeholder="Search products..."
        className="border-2 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full px-4 py-2 pl-10 text-gray-700 placeholder-gray-500 transition duration-300 ease-in-out"
        onChange={handleChange}
        value={value}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
}

export default SearchBar;
