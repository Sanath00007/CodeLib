import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect, useState } from "react";
import { useSnippets } from "../context/SnippetContext";

const SnippetModal = ({ snippet, onClose, onEdit }) => {
  const { deleteSnippet } = useSnippets();

  const [copied, setCopied] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet, showTimeline]);

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

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* COPY (FORCED VISIBLE) */}
            <button
              className="copy-btn"
              style={{ opacity: 1 }}
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? "✓" : "⧉"}
            </button>

            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* META */}
        <div className="modal-meta-row">
          <span className="language-pill">{snippet.language}</span>
          {snippet.tags?.map((tag, i) => (
            <span key={i} className="tag tag-primary">{tag}</span>
          ))}
        </div>

        {/* NOTES (CURRENT) */}
        {snippet.notes && (
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ color: "#94a3b8" }}>Notes</h4>
            <p style={{ whiteSpace: "pre-wrap" }}>{snippet.notes}</p>
          </div>
        )}

        {/* CURRENT CODE */}
        <div className="modal-body">
          <div className="code-wrapper">
            <pre>
              <code className={`language-${snippet.language.toLowerCase()}`}>
                {snippet.code}
              </code>
            </pre>
          </div>
        </div>

        {/* VERSION TIMELINE (TOGGLED) */}
        {showTimeline && snippet.versions?.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4 style={{ color: "#94a3b8", marginBottom: "10px" }}>
              Version Timeline
            </h4>

            {snippet.versions
              .slice()
              .reverse()
              .map((v, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "16px",
                    padding: "12px",
                    border: "1px solid #1e293b",
                    borderRadius: "10px",
                    background: "#020617",
                  }}
                >
                  <small style={{ color: "#94a3b8" }}>
                    {new Date(v.updatedAt).toLocaleString()}
                  </small>

                  {v.notes && (
                    <p
                      style={{
                        marginTop: "8px",
                        whiteSpace: "pre-wrap",
                        fontSize: "13px",
                        opacity: 0.9,
                      }}
                    >
                      {v.notes}
                    </p>
                  )}

                  <pre style={{ marginTop: "10px" }}>
                    <code>{v.code}</code>
                  </pre>
                </div>
              ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="modal-footer">
          <button onClick={() => onEdit(snippet)}>Edit</button>

          <button onClick={() => setShowTimeline((s) => !s)}>
            {showTimeline ? "Hide Timeline" : "Timeline"}
          </button>

          <button
            onClick={() => {
              deleteSnippet(snippet.id);
              onClose();
            }}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default SnippetModal;
