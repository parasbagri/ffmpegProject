const express = require("express");
const { exec } = require("child_process");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3001;

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend files
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const videoPath = req.file.path; // Video path from the upload
  console.log("File uploaded:", req.file);
  exec(
    `ffprobe -v quiet -print_format json -show_format -show_streams "${videoPath}"`,
    (err, stdout, stderr) => {
      if (err) {
        return res.status(500).send(`Error: ${stderr}`);
      }
      res.json(JSON.parse(stdout));
    }
  );
});

// Catch-all handler to serve React frontend for any route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
