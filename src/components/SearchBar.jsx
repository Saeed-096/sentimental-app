"use client";
const SearchBar = () => (
  <div className="flex justify-center items-center mt-8">
    <input
      type="text"
      className="border-2 border-gray-300 rounded-lg py-3 px-6 w-80 md:w-96 text-lg"
      placeholder="@twitter_handle or #content"
    />
  </div>
);

export default SearchBar;
