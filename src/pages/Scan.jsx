import React, { useState, useRef } from "react";
import axios from "axios";

export default function Scan() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const triggerFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    console.log("Uploading file:", selectedFile.name);

    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/ocr/scan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(response.data.extractedText || response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      setResult("Failed to extract text.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white mt-10">
      <h1 className="text-2xl font-bold mb-4">Scan Image with OCR</h1>

      <button
        onClick={triggerFilePicker}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 mb-4"
      >
        Select Image
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mb-4 w-full max-h-64 object-contain border border-gray-300"
        />
      )}

      {selectedFile && (
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Scanning..." : "Upload & Scan"}
        </button>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-100 border rounded text-sm whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Extracted Text:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
