import { useState, useRef } from "react";
import axios from "axios";
import "./codeEditor.css";
import CodeResult from "../Result/CodeResult";
import NavBar from "../Navbar/NavBar";
import Upload from "./Upload";

const CodeEditor = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [change,setChange] = useState(false)


  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lineCount = code ? code.split("\n").length : 1;

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please enter some code first!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/validate/code",
        {
          source_code: code,
        },
      );

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        const data = response.data;
        setAnalysisResult(data);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  if (analysisResult) {
    return (
      <CodeResult
        initialCodeLines={analysisResult.codeLines}
        initialIssues={analysisResult.issue}
      />
    );
  }

  if(change){
    return <Upload />
  }

  return (
    <>
      <NavBar OnUpload={false} change={setChange}/>
    <div className="window">
    <div className="box">
    <div className="editor-container">
      {/* THE EDITOR */}
      <div className="code-editor-wrapper">
        <div className="line-numbers" ref={lineNumbersRef}>
          {Array.from({ length: lineCount }).map((_, i) => (
            <p key={i + 1}>{i + 1}</p>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          spellCheck="false"
          placeholder="// Paste your code here..."
        />
      </div>

      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginTop: "15px" }}
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>
      {message && <p>{message}</p>}
    </div>
    </div>
    </div>
    </>
  );
};

export default CodeEditor;
