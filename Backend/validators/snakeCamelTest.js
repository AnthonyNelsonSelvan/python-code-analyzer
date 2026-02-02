const checkNamingConventions = (codeLines) => {
  const issues = [];

  codeLines.forEach((line, index) => {
    const assignmentMatch = line.match(/^\s*([a-zA-Z0-9_]+)\s*=/);

    if (assignmentMatch) {
      const varName = assignmentMatch[1];
      if (/[A-Z]/.test(varName) && varName !== varName.toUpperCase()) {
        issues.push({
          line: index + 1,
          type: "Naming Convention Violation",
          severity: "Low",
          rule: "PEP 8 Naming Rule",
          explanation: `Variable '${varName}' uses camelCase. Python prefers snake_case.`,
          suggestion: `Rename '${varName}' to '${varName.replace(/([A-Z])/g, "_$1").toLowerCase()}'.`,
        });
      }
    }
  });

  return issues;
};

export default checkNamingConventions;
