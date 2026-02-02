import "./navBar.css";

const NavBar = ({ OnUpload, change }) => {

  return (
    <nav className="nav">
      <h1 className="head">Pyzer</h1>

      <div className="link">
        {!OnUpload ? (
          <button className="btn" onClick={() => change(true)}>Upload & analyze</button>
        ) : (
          <button className="btn" onClick={() => change(true)}>Paste & analyze</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
