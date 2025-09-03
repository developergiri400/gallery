import React, { useState } from "react";
import { storage, db } from "../firebase";  // Changed to named imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import cloudinaryConfig from "../cloudinary";  

// Remove the cloudinaryConfig import since it's not being used
function UploadForm() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      console.log('Preparing to upload file...', file.name);
      
      // Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);
      console.log('Sending to Cloudinary...');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const url = data.secure_url;
      console.log('Cloudinary upload successful! URL:', url);

      // Save to Firestore
      console.log('Storing URL in Firestore...');
      await addDoc(collection(db, "gallery"), {
        url,
        type: file.type.startsWith("video") ? "video" : "image",
        createdAt: serverTimestamp(),
      });
      console.log('URL stored successfully in Firestore!');

      alert("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleChange} accept="image/*,video/*" />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
