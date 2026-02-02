const checkUnusedVariables = (codeLines) => {
  const issues = [];
  const cleanCode = codeLines.map((line) => line.split("#")[0]).join("\n");

  codeLines.forEach((line, index) => {
    const assignmentMatch = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);

    if (assignmentMatch) {
      const varName = assignmentMatch[1];
      const regex = new RegExp(`\\b${varName}\\b`, "g");
      const matches = cleanCode.match(regex);

      if (matches && matches.length === 1) {
        issues.push({
          line: index + 1,
          type: "Unused Variable",
          severity: "Low",
          rule: "Unused Variable Rule",
          explanation: `The variable '${varName}' is declared but never used anywhere in the function.`,
          suggestion: `Remove the variable '${varName}' if it is not required.`,
          isFixable: true,
        });
      }
    }
  });

  return issues;
};

export default checkUnusedVariables;
