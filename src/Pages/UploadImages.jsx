import  { useState } from "react";
import axios from "axios";
const Backend_Url = import.meta.env.VITE_BACKEND_URL;
const UploadFolder = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]); // Convert FileList to Array
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select images.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await axios.post(`${Backend_Url}/api/upload-folder`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
       
      alert("Upload successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading images", error);
      alert("Upload failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Upload Player Images</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*" // Restrict to images only
      />
      <button onClick={handleUpload} style={{ marginTop: "10px", padding: "10px 20px" }}>
        Upload Images
      </button>
    </div>
  );
};

export default UploadFolder;
