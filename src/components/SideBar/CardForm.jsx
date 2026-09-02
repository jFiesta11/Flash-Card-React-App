import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import set from "../../assets/images/enter.svg";
import more from "../../assets/images/more.svg";
import upload from "../../assets/images/set.svg";
import closeUpload from "../../assets/images/close-sidebar.svg";
import useUploadedFiles from "../../hooks/checkFileDup";

function CardForm({
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
  onSubmit,
  onUploadFile,
  isUploading,
  uploadError,
}) {
  const [showMore, setShowMore] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { checkFileName, removeFileName, duplicateError, setDuplicateError } =
    useUploadedFiles();

  const handleShowMore = () => {
    setShowMore((state) => !state);
  };

  const handleFileChange = (event) => {
    const [file] = event.target.files;

    if (!file) return;

    const isNewFile = checkFileName(file);
    if (!isNewFile) {
      setDuplicateError(`"${file.name}" has already been updated.`);
      return;
    }
    setDuplicateError(null);
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const [file] = event.dataTransfer.files;
    if (!file) return;

    const isNewFile = checkFileName(file);
    if (!isNewFile) {
      setDuplicateError(`"${file.name}" has already been uploaded.`);
      return;
    }
    setDuplicateError(null);
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    if (selectedFile) {
      removeFileName(selectedFile.name);
    }
    setDuplicateError("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile || isUploading) return;

    // this lets the modal close only after the upload succeeds.
    const uploadSucceeded = await onUploadFile?.(selectedFile);

    if (uploadSucceeded) {
      // hide the file upload dialog after generation finishes.
      setShowMore(false);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };
  return (
    <div className="inputs-container">
      <div className="upload-menu">
        <Button
          className="more-options"
          img={more}
          imgAlt="Upload a file"
          onClick={handleShowMore}
        />
        {showMore &&
          createPortal(
            <div className="upload-overlay" role="presentation">
              <div
                className="upload-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="upload-title"
              >
                {/* this is the upload modal UI while the file is being processed. */}
                <div className="upload-dialog-header">
                  <div>
                    <span className="upload-eyebrow">upload reviewer</span>
                    <h2 id="upload-title">
                      {isUploading
                        ? "Generating your flashcards..."
                        : "Drop your file here"}
                    </h2>
                  </div>
                  <Button
                    className={"close-upload"}
                    onClick={() => setShowMore(false)}
                    img={closeUpload}
                  />
                </div>
                <div
                  className={`upload-panel${isDragging ? " is-dragging" : ""}`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    id="flashcard-file"
                    className="upload-file-input"
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                  />
                  {selectedFile ? (
                    <div className="uploaded-file-card">
                      <div className="uploaded-file-icon">
                        <img src={upload} alt="" />
                      </div>
                      <div className="uploaded-file-details">
                        <strong title={selectedFile.name}>
                          {selectedFile.name}
                        </strong>
                        <span>
                          {selectedFile.name.split(".").pop().toUpperCase()} ·{" "}
                          {formatFileSize(selectedFile.size)}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="remove-upload"
                        onClick={handleRemoveFile}
                        aria-label={`Remove ${selectedFile.name}`}
                      >
                        <img src={closeUpload} />
                      </button>
                      <label
                        htmlFor="flashcard-file"
                        className="replace-upload"
                      >
                        Replace file
                      </label>
                    </div>
                  ) : (
                    <label htmlFor="flashcard-file" className="upload-dropzone">
                      <img src={upload} alt="" />
                      <strong>Choose a file</strong>
                      <span>Drop a PDF or DOCX here, or browse</span>
                    </label>
                  )}
                </div>
                <div className="upload-dialog-actions">
                  <span>Make sure the uploaded files are reviewers!</span>
                  {duplicateError && <span role="alert">{duplicateError}</span>}
                  {uploadError && <span role="alert">{uploadError}</span>}
                  <button
                    type="button"
                    className="upload-submit"
                    disabled={!selectedFile || isUploading}
                    onClick={handleUploadSubmit}
                  >
                    {/* the button text changes while the backend request is running. */}
                    {isUploading ? "Generating..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
      <div className="question-input">
        <Input
          value={question}
          onChange={onQuestionChange}
          placeholder={"Type Question..."}
        />
      </div>
      <div className="answer-input">
        <Input
          value={answer}
          onChange={onAnswerChange}
          onKeyDown={handleKeyDown}
          placeholder={"Type Answer..."}
        />
      </div>
      <div className="form-button-container">
        <Button
          onClick={onSubmit}
          className={"setButton"}
          img={set}
          imgAlt={"update"}
        />
      </div>
    </div>
  );
}

export default CardForm;
