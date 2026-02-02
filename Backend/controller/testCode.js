import checkDeepNesting from "../validators/depthTest.js";
import checkInefficientLoops from "../validators/ineffeicientLoop.js";
import checkLineLength from "../validators/lineLengthTest.js";
import checkLongFunctions from "../validators/longFuncTest.js";
import checkNamingConventions from "../validators/snakeCamelTest.js";
import checkUnusedVariables from "../validators/unUsedVariables.js";
import fs from "fs";

function testUploadedCodeFunc(req, res) {
  try {
    const filePath = req.file.path;
    let code = fs.readFileSync(filePath, "utf8");
    const codeLines = code.split("\n");
    const issue = mainTest(codeLines);
    if (!issue) {
      res
        .status(200)
        .json({ message: "There is no issue in the given python code." });
      fs.unlinkSync(filePath);
      return;
    }
    res.status(244).json({
      message: "There was some issue found",
      issue: issue,
      codeLines: codeLines,
    });
    fs.unlinkSync(filePath);
    return;
  } catch (error) {
    console.error("Something went wrong in upload test: ", error);
    res.status(500).json({message: "Something went Wrong"})
  }
}

function testCodeFunc(req, res) {
  try {
    let { source_code } = req.body;
    const codeLines = source_code.split("\n");
    const issue = mainTest(codeLines);
    if (!issue) {
      return res
        .status(200)
        .json({ message: "There is no issue in the given python code." });
    }
    res.status(244).json({
      message: "There was some issue found",
      issue: issue,
      codeLines: codeLines,
    });
  } catch (error) {
    console.error("Something went wrong in upload test: ", error);
    res.status(500).json({message: "Something went Wrong"})
  }
}

function mainTest(codeLines) {
  try {
    const depthIssue = checkDeepNesting(codeLines);

    const loopIssue = checkInefficientLoops(codeLines);

    const lineIssue = checkLineLength(codeLines);

    const longFuncIssue = checkLongFunctions(codeLines);

    const namingIssue = checkNamingConventions(codeLines);

    const varIssue = checkUnusedVariables(codeLines);

    return [
      ...depthIssue,
      ...loopIssue,
      ...lineIssue,
      ...longFuncIssue,
      ...namingIssue,
      ...varIssue,
    ];
  } catch (error) {
    console.error("Something went wrong in main test function: ", error);
  }
}

export { testUploadedCodeFunc, testCodeFunc };
