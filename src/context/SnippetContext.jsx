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
    setSnippets([
      ...snippets,
      {
        ...snippet,
        versions: [], // initialize history
      },
    ]);
  };

  const updateSnippet = (updated) => {
    setSnippets(
      snippets.map((s) => {
        if (s.id !== updated.id) return s;

        const previousVersion = {
          code: s.code,
          notes: s.notes,
          updatedAt: new Date().toISOString(),
        };

        return {
          ...updated,
          versions: [...(s.versions || []), previousVersion],
        };
      })
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
