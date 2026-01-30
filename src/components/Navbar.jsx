import { Link } from "react-router-dom";
import { useSnippets } from "../context/SnippetContext";
import { exportSnippets } from "../utils/file";

const Navbar = () => {
  const { snippets } = useSnippets();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      localStorage.setItem("snippets", event.target.result);
      window.location.reload();
    };
    reader.readAsText(file);
  };

  return (
    <nav className="nav">
      {/* LEFT */}
      <div className="nav-group">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/add">Add</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-group">
        <button className="nav-btn" onClick={() => exportSnippets(snippets)}>
          Export
        </button>

        <label className="nav-btn import-btn">
          Import
          <input type="file" accept=".json" hidden onChange={handleImport} />
        </label>
      </div>
    </nav>
  );
};

export default Navbar;