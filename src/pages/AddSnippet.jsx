import { useState, useEffect } from "react";
import { useSnippets } from "../context/SnippetContext";
import { v4 as uuid } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";

const AddSnippet = () => {
  const { addSnippet, updateSnippet } = useSnippets();
  const navigate = useNavigate();
  const location = useLocation();
  const editingSnippet = location.state;

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title);
      setLanguage(editingSnippet.language);
      setCode(editingSnippet.code);
      setTags(editingSnippet.tags.join(", "));
    }
  }, [editingSnippet]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const snippet = {
      id: editingSnippet ? editingSnippet.id : uuid(),
      title,
      language,
      code,
      tags: tags.split(",").map((t) => t.trim()),
      updatedAt: new Date().toISOString(),
    };

    editingSnippet ? updateSnippet(snippet) : addSnippet(snippet);
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language" required />
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows="8" placeholder="Code..." required />
      <button>{editingSnippet ? "Update Snippet" : "Add Snippet"}</button>
    </form>
  );
};

export default AddSnippet;