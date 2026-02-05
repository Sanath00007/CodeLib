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

  const handleDelete = () => {
    deleteSnippet(snippet.id);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* ===== HEADER ===== */}
        <div className="modal-header">
          <h2 className="snippet-title">{snippet.title}</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="copy-btn"
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

        {/* ===== META ===== */}
        <div className="modal-meta-row">
          <span className="language-pill">{snippet.language}</span>
          {snippet.tags?.map((tag, i) => (
            <span key={i} className="tag tag-primary">
              {tag}
            </span>
          ))}
        </div>

        {/* ===== BODY ===== */}
        <div className="modal-body">
          {/* NOTES */}
          {snippet.notes && (
            <>
              <h4 style={{ color: "#94a3b8", marginBottom: "6px" }}>
                Notes
              </h4>
              <p style={{ whiteSpace: "pre-wrap", marginBottom: "16px" }}>
                {snippet.notes}
              </p>
            </>
          )}

          {/* CODE */}
          <div className="code-wrapper">
            <pre>
              <code className={`language-${snippet.language.toLowerCase()}`}>
                {snippet.code}
              </code>
            </pre>
          </div>

          {/* ===== VERSION TIMELINE (TOGGLED) ===== */}
          {showTimeline && snippet.versions?.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              <h4 style={{ color: "#94a3b8", marginBottom: "12px" }}>
                Version Timeline
              </h4>

              {snippet.versions
                .slice()
                .reverse()
                .map((version, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "16px",
                      padding: "12px",
                      border: "1px solid #1e293b",
                      borderRadius: "10px",
                      background: "#020617",
                    }}
                  >
                    <small style={{ color: "#94a3b8" }}>
                      {new Date(version.updatedAt).toLocaleString()}
                    </small>

                    {version.notes && (
                      <p
                        style={{
                          marginTop: "8px",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {version.notes}
                      </p>
                    )}

                    <pre style={{ marginTop: "8px" }}>
                      <code>{version.code}</code>
                    </pre>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="modal-footer">
          <button onClick={() => onEdit(snippet)}>Edit</button>

          <button onClick={() => setShowTimeline((v) => !v)}>
            {showTimeline ? "Hide Timeline" : "Timeline"}
          </button>

          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;
