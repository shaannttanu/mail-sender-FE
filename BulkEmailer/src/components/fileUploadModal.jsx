import React from "react";
import "./fileUploadModal.css";

const UploadModal = ({ onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch('http://localhost:8080/api/v1/emailer/uploadExcel', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('File uploaded successfully:', result);

                // Extract emails from the API response
                const emailList = result.data;
                // Pass the emails back to the parent component (EmailCampaign)
                onUpload(emailList);

                // Close the modal
                onClose();
            } else {
                alert('Error uploading file');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading file');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">Upload Excel</h3>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="file-input"
                />
                <div className="modal-buttons">
                    <button
                        className="modal-button upload"
                        onClick={handleUploadClick}
                        disabled={!selectedFile} // Disable button if no file selected
                    >
                        Upload
                    </button>
                    <button className="modal-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
