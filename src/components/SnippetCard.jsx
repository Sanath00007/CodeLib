import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useState } from "react";

const SnippetCard = ({ snippet, onOpen }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const handleCopy = async (e) => {
    e.stopPropagation(); // ⛔ prevent opening modal
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="card" onClick={() => onOpen(snippet)}>
      <h3 className="snippet-title">{snippet.title}</h3>

      <div className="snippet-meta">
        {snippet.tags?.length > 0 && (
          <div className="tags">
            {snippet.tags.map((tag, i) => (
              <span key={i} className="tag tag-primary">
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="language-pill">{snippet.language}</span>
      </div>

      <div className="code-preview code-wrapper">
        {/* COPY BUTTON (CARD) */}
        <button
          className="copy-btn"
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? "✓" : "⧉"}
        </button>

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