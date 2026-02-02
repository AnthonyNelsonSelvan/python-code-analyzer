const checkLineLength = (codeLines) => {
  const issues = [];
  const MAX_CHARS = 79;

  codeLines.forEach((line, index) => {
    if (line.length > MAX_CHARS) {
      issues.push({
        line: index + 1,
        type: "Line Too Long",
        severity: "Low",
        rule: "Line Length Rule",
        explanation: `Line is ${line.length} characters long (Limit: ${MAX_CHARS}).`,
        suggestion: "Break the line into multiple lines for better readability."
      });
    }
  });

  return issues;
};

export default checkLineLength;