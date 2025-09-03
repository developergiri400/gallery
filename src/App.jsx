import React from "react";
import UploadForm from "./components/UploadForm";
import Gallery from "./components/Gallery";

function App() {
  return (
    <div className="App">
      <h1>📸 My Portfolio Gallery</h1>
      <UploadForm />
      <Gallery />
    </div>
  );
}

export default App;
