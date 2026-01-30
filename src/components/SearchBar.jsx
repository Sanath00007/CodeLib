const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      className="search"
      placeholder="Search snippets..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;