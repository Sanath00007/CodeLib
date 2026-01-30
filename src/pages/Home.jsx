import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnippets } from "../context/SnippetContext";
import SnippetCard from "../components/SnippetCard";
import SnippetModal from "../components/SnippetModal";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { snippets } = useSnippets();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [activeSnippet, setActiveSnippet] = useState(null);

  const allTags = ["all", ...new Set(snippets.flatMap(s => s.tags || []))];

  const filtered = snippets.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.language.toLowerCase().includes(search.toLowerCase());

    const matchesTag =
      selectedTag === "all" || s.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container">
      {/* FILTER BAR */}
      <div className="filter-bar">
        <SearchBar search={search} setSearch={setSearch} />

        <select
          className="tag-filter"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* CARD GRID */}
      {filtered.length === 0 ? (
        <p className="empty">No snippets found</p>
      ) : (
        <div className="grid">
          {filtered.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onOpen={setActiveSnippet}
            />
          ))}
        </div>
      )}

      {activeSnippet && (
        <SnippetModal
          snippet={activeSnippet}
          onClose={() => setActiveSnippet(null)}
          onEdit={(s) => navigate("/add", { state: s })}
        />
      )}
    </div>
  );
};

export default Home;