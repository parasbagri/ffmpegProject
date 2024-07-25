import React, { useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [videoDetails, setVideoDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setVideoDetails(response.data);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {videoDetails && (
        <div>
          <h2>Video Details:</h2>
          <pre>{JSON.stringify(videoDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
