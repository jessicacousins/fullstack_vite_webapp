import React, { useState } from "react";
import "./FileConverter.css";

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState("txt");
  const [conversionResult, setConversionResult] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setDownloadLink(""); // Clear previous download link
  };

  const handleConvert = () => {
    if (!selectedFile) {
      alert("Please upload a file first.");
      return;
    }

    const fileExtension = outputFormat.toLowerCase();

    if (["png", "jpg", "jpeg", "webp"].includes(fileExtension)) {
      // Convert images
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const convertedDataUrl = canvas.toDataURL(`image/${fileExtension}`);
          const blob = dataURLtoBlob(convertedDataUrl);
          const link = URL.createObjectURL(blob);

          setDownloadLink(link);
          setConversionResult(
            `File "${
              selectedFile.name
            }" converted to ${fileExtension.toUpperCase()}!`
          );
        };
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Handle text-based formats (like txt or csv)
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        // Simulate the converted file content
        const convertedContent = `Converted ${
          selectedFile.name
        } to ${outputFormat.toUpperCase()}:\n\n${content}`;

        // Create a Blob and generate a download link
        const blob = new Blob([convertedContent], { type: "text/plain" });
        const link = URL.createObjectURL(blob);
        setDownloadLink(link);

        setConversionResult(
          `File "${
            selectedFile.name
          }" converted to ${outputFormat.toUpperCase()}!`
        );
      };

      reader.readAsText(selectedFile);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="file-converter-container">
      <h2 className="file-converter-header">File Converter Tool</h2>
      <form className="file-converter-form">
        <label htmlFor="file-upload" className="file-label">
          Upload File:
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />

        <label htmlFor="output-format" className="file-label">
          Convert To:
        </label>
        <select
          id="output-format"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="file-select"
        >
          <option value="txt">TXT</option>
          <option value="pdf">PDF (Simulated)</option>
          <option value="csv">CSV</option>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WebP</option>
        </select>

        <button
          type="button"
          onClick={handleConvert}
          className="convert-button"
        >
          Convert
        </button>
      </form>

      {conversionResult && (
        <p className="conversion-result">{conversionResult}</p>
      )}

      {downloadLink && (
        <a
          href={downloadLink}
          download={`converted.${outputFormat}`}
          className="download-link"
        >
          Click here to download your converted file
        </a>
      )}
    </div>
  );
};

export default FileConverter;
