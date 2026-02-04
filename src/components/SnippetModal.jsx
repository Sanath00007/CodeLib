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

  const handleCopy = async () => {
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

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="copy-btn"
              style={{ opacity: 1 }}
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? "✓" : "⧉"}
            </button>

            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* META */}
        <div className="modal-meta-row">
          <span className="language-pill">{snippet.language}</span>
          {snippet.tags?.map((tag, i) => (
            <span key={i} className="tag tag-primary">
              {tag}
            </span>
          ))}
        </div>

        {/* 📝 NOTES */}
        {snippet.notes && (
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ marginBottom: "6px", color: "#94a3b8" }}>Notes</h4>
            <p style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
              {snippet.notes}
            </p>
          </div>
        )}

        {/* CODE */}
        <div className="modal-body">
          <div className="code-wrapper">
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
          <button onClick={() => {
    deleteSnippet(snippet.id);
    onClose(); // ✅ CLOSE MODAL
  }}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;
