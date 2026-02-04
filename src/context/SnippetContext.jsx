import { createContext, useContext, useEffect, useState } from "react";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem("snippets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = (snippet) => {
    setSnippets([...snippets, snippet]);
  };

  const updateSnippet = (updated) => {
    setSnippets(
      snippets.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const deleteSnippet = (id) => {
    setSnippets(snippets.filter((s) => s.id !== id));
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
