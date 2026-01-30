import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useState } from "react";
import { useSnippets } from "../context/SnippetContext";

const SnippetModal = ({ snippet, onClose, onEdit }) => {
  const { deleteSnippet } = useSnippets();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const copyCode = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modal-header">
          <h2>{snippet.title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* META ROW (FIXED) */}
        <div className="modal-meta-row">
          <span className="language-pill">
            {snippet.language}
          </span>

          {snippet.tags?.map((tag, i) => (
            <span key={i} className="tag tag-primary">
              {tag}
            </span>
          ))}
        </div>

        {/* BODY */}
        <div className="modal-body">
          <div className="code-wrapper">
            <button className="copy-btn" onClick={copyCode}>
              {copied ? "✓" : "⧉"}
            </button>

            <pre>
              <code className={`language-${snippet.language.toLowerCase()}`}>
                {snippet.code}
              </code>
            </pre>
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button onClick={() => onEdit(snippet)}>Edit</button>
          <button onClick={() => deleteSnippet(snippet.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;