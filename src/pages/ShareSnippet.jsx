import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const ShareSnippet = () => {
  const [params] = useSearchParams();
  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    const encoded = params.get("data");
    if (!encoded) return;

    try {
      // decode safely (mobile-friendly)
      const json = decodeURIComponent(escape(atob(encoded)));
      const decoded = JSON.parse(json);
      setSnippet(decoded);
      Prism.highlightAll();
    } catch {
      setSnippet(null);
    }
  }, [params]);

  if (!snippet) {
    return <p className="empty">Invalid or expired share link</p>;
  }

  return (
    <div className="container">
      <h2>{snippet.title}</h2>

      <div className="snippet-meta">
        <span className="language-pill">{snippet.language}</span>
        {snippet.tags?.map((t, i) => (
          <span key={i} className="tag tag-primary">{t}</span>
        ))}
      </div>

      {snippet.notes && (
        <>
          <h4 style={{ color: "#94a3b8" }}>Notes</h4>
          <p style={{ whiteSpace: "pre-wrap" }}>{snippet.notes}</p>
        </>
      )}

      <pre>
        <code className={`language-${snippet.language.toLowerCase()}`}>
          {snippet.code}
        </code>
      </pre>
    </div>
  );
};

export default ShareSnippet;
