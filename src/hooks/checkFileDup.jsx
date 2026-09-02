import { useState } from "react";

function useUploadedFiles() {
  const [uploadedFiles, setUploadedFiles] = useState(() => new Set());
  const [duplicateError, setDuplicateError] = useState("");

  function checkFileName(file) {
    if (uploadedFiles.has(file.name)) {
      setDuplicateError(`"${file.name}" has already been uploaded.`);
      return false;
    }

    setDuplicateError("");
    setUploadedFiles((prev) => new Set(prev).add(file.name));
    return true;
  }

  function removeFileName(fileName) {
    setUploadedFiles((prev) => {
      const nextFiles = new Set(prev);
      nextFiles.delete(fileName);
      return nextFiles;
    });
  }

  return {
    checkFileName,
    removeFileName,
    uploadedFiles,
    duplicateError,
    setDuplicateError,
  };
}

export default useUploadedFiles;
