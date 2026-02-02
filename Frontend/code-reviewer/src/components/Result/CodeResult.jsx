import { useState, useEffect, useMemo } from "react";
import "./codeResult.css";

const CodeResult = ({ initialCodeLines = [], initialIssues = [] }) => {
  const [lines, setLines] = useState(initialCodeLines);
  const [issues, setIssues] = useState(initialIssues);
  const [auditLog, setAuditLog] = useState([]);

  useEffect(() => {
    setLines(initialCodeLines);
    setIssues(initialIssues);
    setAuditLog([]);
  }, [initialCodeLines, initialIssues]);

  const issueMap = useMemo(() => {
    const map = new Map();
    issues.forEach((issue) => map.set(issue.line, issue));
    return map;
  }, [issues]);

  const handleFix = (issue) => {
    const newLines = [...lines];
    const index = issue.line - 1;

    if (issue.type === "Unused Variable") {
      newLines[index] = `# ${newLines[index]}  # FIXED: Unused`;
    }

    setLines(newLines);
    setIssues(issues.filter((i) => i.line !== issue.line));
    addToLog(issue, "Auto-Fixed");
  };

  const handleAcknowledge = (lineNum) => {
    const issue = issues.find((i) => i.line === lineNum);
    setIssues(
      issues.map((i) =>
        i.line === lineNum ? { ...i, status: "accepted" } : i,
      ),
    );

    addToLog(issue, "Acknowledged (Manual Fix Required)");
  };

  const handleReject = (lineNum) => {
    const issue = issues.find((i) => i.line === lineNum);
    setIssues(issues.filter((i) => i.line !== lineNum));
    addToLog(issue, "Rejected (False Positive)");
  };

  const addToLog = (issue, action) => {
    setAuditLog((prev) => [...prev, { ...issue, action }]);
  };

  return (
    <div className="container-wrapper">
      <div className="container">
        {lines.length > 0 ? (
          lines.map((code, index) => {
            const lineNumber = index + 1;
            const issue = issueMap.get(lineNumber);
            const isError = !!issue;
            const isAccepted = issue?.status === "accepted";

            return (
              <div
                key={index}
                className={`line ${isError ? "error-line" : ""}`}
              >
                <span className="line-number">{lineNumber}</span>
                <pre className="code-content">{code}</pre>

                {isError && (
                  <div className="issue-wrapper no-copy">
                    <span
                      className={`badge ${isAccepted ? "badge-green" : ""}`}
                    >
                      {isAccepted ? "✓ Verified" : `⚠️ ${issue.type}`}
                    </span>

                    {!isAccepted && (
                      <div className="tooltip">
                        <div className="tooltip-header">
                          <strong>
                            {issue.rule}{" "}
                            <span className={`severity ${issue.severity}`}>
                              {issue.severity}
                            </span>
                          </strong>
                        </div>
                        <p className="msg">{issue.explanation}</p>
                        <p className="suggestion">💡 {issue.suggestion}</p>

                        <div className="tooltip-actions">
                          {issue.isFixable && (
                            <button
                              className="btn-fix"
                              onClick={() => handleFix(issue)}
                            >
                              ✨ Fix
                            </button>
                          )}
                          <button
                            className="btn-ack"
                            onClick={() => handleAcknowledge(issue.line)}
                          >
                            Acknowledge
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleReject(issue.line)}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty-state">Waiting for code analysis...</div>
        )}
      </div>

      <div>
        {auditLog.length > 0 && (
          <div className="audit-report">
            <h3>👨‍💻 Human Review Audit Log</h3>
            <ul>
              {auditLog.map((log, i) => (
                <li key={i}>
                  <strong>Line {log.line}:</strong> {log.type} —{" "}
                  <span className="log-action">{log.action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeResult;
