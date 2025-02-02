import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = () => {
  const [image, setImage] = useState(null); // To store the selected file
  const [message, setMessage] = useState(""); // To display success or error messages
  const [preview, setPreview] = useState(""); // To show a preview of the image

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview URL for the selected image
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`Image uploaded successfully: ${res.data.filePath}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "block", margin: "10px auto" }}
        />

        {/* Image Preview */}
        {preview && (
          <div>
            <p>Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", maxWidth: "200px", margin: "10px 0" }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
          Upload
        </button>
      </form>

      {/* Display Message */}
      {message && <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>}
    </div>
  );
};

export default ImageUploadForm;
