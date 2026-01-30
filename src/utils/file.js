export const exportSnippets = (snippets) => {
  const blob = new Blob([JSON.stringify(snippets, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "codelib-snippets.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importSnippets = (file, setSnippets) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    setSnippets(JSON.parse(e.target.result));
  };
  reader.readAsText(file);
};