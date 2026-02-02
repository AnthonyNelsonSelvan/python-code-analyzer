const checkDeepNesting = (codeLines) => {
  const issues = [];
  const SPACES_PER_LEVEL = 4;
  const MAX_DEPTH = 3; 

  codeLines.forEach((line, index) => {
    if (!line.trim() || line.trim().startsWith("#")) return;
    let leadingSpaces = line.search(/\S/);
    if (leadingSpaces === -1) leadingSpaces = 0;
    const currentDepth = Math.floor(leadingSpaces / SPACES_PER_LEVEL);
    if (currentDepth > MAX_DEPTH) {
      issues.push({
        line: index + 1,
        type: "Deep Nesting",
        severity: "Medium",
        rule: "Maximum Nesting Depth Rule",
        explanation: `The nesting level (${currentDepth}) is too high (Limit: ${MAX_DEPTH}).`,
        suggestion: "Refactor the logic to avoid unnecessary nested loops or conditions."
      });
    }
  });

  return issues;
};

export default checkDeepNesting;