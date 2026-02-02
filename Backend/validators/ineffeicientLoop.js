const checkInefficientLoops = (codeLines) => {
  const issues = [];

  codeLines.forEach((line, index) => {
    if (line.includes("range(1)")) {
      issues.push({
        line: index + 1,
        type: "Inefficient Loop Usage",
        severity: "Medium",
        rule: "Redundant Loop Rule",
        explanation: "The loop iterates only once (range(1)), creating unnecessary overhead.",
        suggestion: "Remove the loop and simply execute the code inside it directly."
      });
    }
  });

  return issues;
};

export default checkInefficientLoops;