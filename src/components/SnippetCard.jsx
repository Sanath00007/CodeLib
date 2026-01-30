import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect } from "react";

const SnippetCard = ({ snippet, onOpen }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="card" onClick={() => onOpen(snippet)}>
      {/* TITLE */}
      <h3 className="snippet-title">{snippet.title}</h3>

      {/* META ROW */}
      <div className="snippet-meta">
        {/* TAGS (now prominent like old language style) */}
        {snippet.tags?.length > 0 && (
          <div className="tags">
            {snippet.tags.map((tag, i) => (
              <span key={i} className="tag tag-primary">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* LANGUAGE (now subtle like old tag style) */}
        <span className="language-pill">
          {snippet.language}
        </span>
      </div>

      {/* CODE PREVIEW */}
      <div className="code-preview">
        <pre>
          <code className={`language-${snippet.language.toLowerCase()}`}>
            {snippet.code}
          </code>
        </pre>
        <div className="fade-overlay" />
      </div>
    </div>
  );
};

export default SnippetCard;