export const getSnippets = () => {
  return JSON.parse(localStorage.getItem("snippets")) || [];
};

export const saveSnippets = (snippets) => {
  localStorage.setItem("snippets", JSON.stringify(snippets));
};