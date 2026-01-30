import { createContext, useContext, useState } from "react";
import { getSnippets, saveSnippets } from "../utils/storage";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState(() => getSnippets());

  const addSnippet = (snippet) => {
    const updated = [snippet, ...snippets];
    setSnippets(updated);
    saveSnippets(updated);
  };

  const updateSnippet = (updatedSnippet) => {
    const updated = snippets.map((s) =>
      s.id === updatedSnippet.id ? updatedSnippet : s
    );
    setSnippets(updated);
    saveSnippets(updated);
  };

  const deleteSnippet = (id) => {
    const updated = snippets.filter((s) => s.id !== id);
    setSnippets(updated);
    saveSnippets(updated);
  };

  return (
    <SnippetContext.Provider
      value={{ snippets, addSnippet, updateSnippet, deleteSnippet }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => useContext(SnippetContext);