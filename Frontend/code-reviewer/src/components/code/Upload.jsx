import { useState } from "react";
import "./upload.css";
import axios from "axios";
import CodeResult from "../Result/CodeResult";
import NavBar from "../Navbar/NavBar";
import CodeEditor from "./CodeEditor";

const Upload = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("No file selected");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [change,setChange] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("source_code", selectedFile); // Key must match backend

    try {
      const response = await axios.post(
        "http://localhost:3000/api/validate/upload/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        const data = response.data;
        setAnalysisResult(data);
      }
    } catch (error) {
      alert("Error uploading file. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if(change){
    return <CodeEditor />
  }

  if (analysisResult) {
    return (
      <CodeResult
        initialCodeLines={analysisResult.codeLines}
        initialIssues={analysisResult.issue}
      />
    );
  }

  return (
    <>
    <NavBar OnUpload={true} change={setChange}/>
    <div className="window">
      {message && <p style={"color: green"}>{message}</p>}
      <div className="upload-container">
        <div className="upload-card">
          <h2>Upload Source Code</h2>
          <p></p>

          <form method="post" onSubmit={handleSubmit}>
            <div
              className={`drop-zone ${isDragging ? "glow-border" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileInput"
                onChange={handleFileSelect}
                hidden
              />

              <label htmlFor="fileInput" className="upload-btn">
                Choose File
              </label>

              <p id="fileName" className="file-name">
                {fileName}
              </p>
            </div>

            <button type="submit" className="analyze-btn" disabled={loading}>
              {loading ? "Analyzing..." : "Start Analysis"}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Upload;
