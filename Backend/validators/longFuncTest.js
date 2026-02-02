const checkLongFunctions = (codeLines) => {
  const issues = [];
  const MAX_LINES = 20; 

  let currentFuncName = null;
  let currentFuncStartLine = -1;
  let lineCount = 0;

  codeLines.forEach((line, index) => {
    const defMatch = line.match(/^\s*def\s+([a-zA-Z_][a-zA-Z0-9_]*)/);

    if (defMatch) {
      if (currentFuncName && lineCount > MAX_LINES) {
        issues.push({
          line: currentFuncStartLine, 
          type: "Overly Long Function",
          severity: "Medium",
          rule: "Function Length Rule",
          explanation: `Function '${currentFuncName}' is ${lineCount} lines long (Limit: ${MAX_LINES}).`,
          suggestion: "Break this function into smaller helper functions."
        });
      }

      currentFuncName = defMatch[1];
      currentFuncStartLine = index + 1;
      lineCount = 0;
    } else if (currentFuncName) {
      lineCount++;
    }
  });

  if (currentFuncName && lineCount > MAX_LINES) {
    issues.push({
      line: currentFuncStartLine,
      type: "Overly Long Function",
      severity: "Medium",
      rule: "Function Length Rule",
      explanation: `Function '${currentFuncName}' is ${lineCount} lines long (Limit: ${MAX_LINES}).`,
      suggestion: "Break this function into smaller helper functions."
    });
  }

  return issues;
};

export default checkLongFunctions;