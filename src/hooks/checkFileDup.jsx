import { useState } from "react";

function useUploadedFiles() {
  const [uploadedFiles, setUploadedFiles] = useState(new Set());
  const [error, setError] = useState(null);

  function checkFileName(file) {
    if (uploadedFiles.has(file.name)) {
      setError(`" ${file.name} " has already been uploaded.`);
      return false;
    }
    setError(null);
    setUploadedFiles((prev) => new Set(prev).add(file.name));
    return true;
  }
  return { checkFileName, uploadedFiles, error };
}

export default useUploadedFiles;
