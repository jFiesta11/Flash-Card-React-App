import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import set from "../../assets/images/enter.svg";
import more from "../../assets/images/more.svg";
import upload from "../../assets/images/set.svg";
function CardForm({
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
  onSubmit,
}) {
  const [showMore, setShowMore] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const uploadMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleShowMore = () => {
    setShowMore((state) => !state);
  };

  useEffect(() => {
    if (!showMore) return undefined;

    const handleClickOutside = (event) => {
      if (!uploadMenuRef.current?.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [showMore]);

  const handleFileChange = (event) => {
    const [file] = event.target.files;
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const [file] = event.dataTransfer.files;
    if (file) setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      <div className="upload-menu" ref={uploadMenuRef}>
        <Button className="more-options" img={more} onClick={handleShowMore} />
        <div className={showMore ? "show-more visible" : "show-more"}>
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
            {selectedFile && (
              <div className="uploaded-file-card">
                <div className="uploaded-file-icon">
                  <img src={upload} alt="" />
                </div>
                <div className="uploaded-file-details">
                  <strong title={selectedFile.name}>{selectedFile.name}</strong>
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
                  ×
                </button>
                <label htmlFor="flashcard-file" className="replace-upload">
                  Replace file
                </label>
              </div>
            )}
            {!selectedFile && (
              <label htmlFor="flashcard-file" className="upload-dropzone">
                <img src={upload} alt="" />
                <strong>Choose a file</strong>
                <span>Drop a PDF or DOCX here, or browse</span>
              </label>
            )}
          </div>
        </div>
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
