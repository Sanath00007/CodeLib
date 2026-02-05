import { useLocation, useNavigate } from "react-router-dom";
import { useSnippets } from "../context/SnippetContext";
import { useState } from "react";

const AddSnippet = () => {
  const { addSnippet, updateSnippet } = useSnippets();
  const navigate = useNavigate();
  const location = useLocation();
  const editingSnippet = location.state;

  const [title, setTitle] = useState(editingSnippet?.title || "");
  const [language, setLanguage] = useState(editingSnippet?.language || "");
  const [tags, setTags] = useState(editingSnippet?.tags?.join(", ") || "");
  const [code, setCode] = useState(editingSnippet?.code || "");
  const [notes, setNotes] = useState(editingSnippet?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const snippet = {
      ...editingSnippet,
      id: editingSnippet?.id || Date.now(),
      title,
      language,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      code,
      notes,
    };

    editingSnippet ? updateSnippet(snippet) : addSnippet(snippet);
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingSnippet ? "Edit Snippet" : "Add Snippet"}</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        placeholder="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      />

      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <textarea
        placeholder="Code"
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      <textarea
        placeholder="Notes"
        rows={5}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button type="submit">
        {editingSnippet ? "Update Snippet" : "Save Snippet"}
      </button>
    </form>
  );
};

export default AddSnippet;
