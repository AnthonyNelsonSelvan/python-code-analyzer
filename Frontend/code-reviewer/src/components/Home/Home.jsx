import { useState } from "react";
import CodeEditor from "../code/CodeEditor";
import Upload from "../code/upload"; 
import "./home.css"

const Home = () => {
  const [showUpload,setShowUpload] = useState(false);
  const [showPaste,setShowPaste] = useState(false)
  if(showUpload){
    return <Upload />
  }
  if(showPaste){
    return <CodeEditor />
  }
  return (
    <div className="window">
      <button className="selection-btn" onClick={() => setShowUpload(true)}>Upload code file</button>
      <h2 className="normal-text">Or</h2>
      <button className="paste-btn" onClick={() => setShowPaste(true)}>Paste code</button>
    </div>
  );
};

export default Home;
