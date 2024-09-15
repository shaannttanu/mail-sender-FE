import "./emailcampaignPage.css";
import "./fileUploadModal.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import UploadModal from "./fileUploadModal";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast, useToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailCampaign = () => {
    const location = useLocation();
    const { campaignName } = location.state || { campaignName: "" };
    const navigate = useNavigate();

    const [subjectOpen, setSubjectOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [senderDropdownOpen, setSenderDropdownOpen] = useState(false);
    const [selectedSender, setSelectedSender] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [emails, setEmails] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy');

    const selectSenderClick = () => {
        setSenderDropdownOpen(!senderDropdownOpen);
    };

    const handleSenderSelect = (sender) => {
        setSelectedSender(sender);
        setSenderDropdownOpen(false);
    };

    const handleAddSubjectClick = () => {
        setSubjectOpen(true);
    };

    const handleHideSubjectClick = () => {
        setSubjectOpen(false);
    };

    const backButton = () => {
        navigate('/');
    };

    const subjectNames = (e) => {
        setSubject(e.target.value);
    };

    const submitSubject = () => {
        setSubjectName(subject);
        setSubjectOpen(false);
        toast.success("Subject Added Successfully..");
        setSubject('');
    };

    const [fileName, setFileName] = useState(""); // Empty state initially
      
    const handleFileChange = (event) => {
        try
        {
            const file = event.target.files[0]; // Get the selected file
            if (file) {
            setFileName(file.name); // Update the file name in the state
            }
        }
        catch(e)
        {
            console.log(e);
            toast.error("Some error occured while uploading file!!");
        }
        
    };


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // Function to handle the email list after file upload
    const handleUploadedEmails = (uploadedEmails) => {
        setEmails(uploadedEmails);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleCopy = () => {
        setCopyButtonText('Copied!');
        toast.success("Emails copied to clipboard..")
        setTimeout(() => {
            setCopyButtonText('Copy');
        }, 2000); // Reset the button text after 2 seconds
    };

    const renderEmails = () => {
        // Combine the emails into a single string and join them with commas
        const emailString = emails.join(', ');
        const maxVisibleLength = 40;

        if (emailString.length <= maxVisibleLength) {
            return emailString;
        } else {
            return (
                <>
                    {isDropdownOpen ? emailString : emailString.slice(0, maxVisibleLength) + '...'}
                    <span className="more-info" onClick={toggleDropdown}>
                        {isDropdownOpen ? ' ▲' : ' ▼'}
                    </span>
                    {isDropdownOpen && (
                        <div className="email-dropdown">
                            {emailString}
                        </div>
                    )}
                </>
            );
        }
    };

    const downloadTemplate = () => {
        fetch('http://localhost:8080/api/v1/emailer/downloadTemplate', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Failed to download template');
            }
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'template.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success("Template Downloaded for your reference");
        })
        .catch(error => {
            console.error('Error downloading template:', error);
            toast.error('Error downloading template');
        });
    };

    return (
        <div className="frame">
            <div className="back-section">
                <button className="back-button" onClick={backButton}>←</button>
                <span className="back-text">{campaignName !== '' ? campaignName : "Back to campaign"}</span>
            </div>

            <div className="campaign-container">
                <div className="section">
                    <div className="section-header">
                        <h3>Sender</h3>
                        <button className="action-button" onClick={selectSenderClick}>Select sender</button>
                    </div>
                    <p>{selectedSender ? `Sender is: ${selectedSender}` : "Who is sending this email campaign?"}</p>
                    {senderDropdownOpen && (
                        <div className="dropdown-box">
                            <ul className="dropdown">
                                <li className="dropdown-item" onClick={() => handleSenderSelect("Yash Garg")}>
                                    Yash Garg
                                    <h4> yash.garg1@ofbusiness.in</h4>
                                    <hr></hr>
                                </li>
                                <li className="dropdown-item" onClick={() => handleSenderSelect("Shantanu Singh")}>
                                    Shantanu Singh
                                    <h4> shantanu.singh@ofbusiness.in</h4>
                                    <hr></hr>
                                </li>
                                <li className="dropdown-item" onClick={() => handleSenderSelect("Naman Jain")}>
                                    Naman jain
                                    <h4> naman.jain@ofbusiness.in</h4>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="section">
                    <div className="section-header">
                        <h3>Recipients</h3>
                        <div className="button-group">
                            <button className="action-button" onClick={downloadTemplate}>Download Template</button>
                            <button className="action-button" onClick={openModal}>Upload File</button>
                        </div>
                    </div>
                    <div className="email-list">
                        {emails.length > 0 ? (
                            <div className="email-container">
                                <textarea
                                    className="email-textarea"
                                    value={emails.join(', ')}
                                    readOnly
                                ></textarea>
                                <CopyToClipboard text={emails.join(', ')} onCopy={handleCopy}>
                                    <button className="copy-button">{copyButtonText}</button>
                                </CopyToClipboard>
                            </div>
                        ) : (
                            "The people who receive your campaign"
                        )}
                    </div>
                </div>

                <div className="section">
                    <div className="section-header">
                        <h3>Subject</h3>
                        {!subjectOpen ? (
                            <button className="action-button" onClick={handleAddSubjectClick}>
                                Add subject
                            </button>
                        ) : (
                            <button className="action-button" onClick={handleHideSubjectClick}>
                                Hide subject
                            </button>
                        )}
                    </div>
                    <p>{subjectName !== "" ? subjectName : "Add a subject line for your campaign here.."}</p>
                    {subjectOpen && (
                        <div className="subject">
                            <input className="input" type="text" value={subject} onChange={subjectNames} />
                            <button className="ok-btn" onClick={submitSubject}>OK</button>
                        </div>
                    )}
                </div>

                <div className="section">
                    <div className="section-header">
                        <h3>Email Content</h3>
                    </div>
                    <textarea
                        className="email-content-textarea"
                        placeholder="Write your email content here..."
                    ></textarea>
                </div>


            {modalOpen && <UploadModal onClose={closeModal} onUpload={handleUploadedEmails} />}
            
            <div className="section">
                <div className="section-header">
                    <h3>Email Attachments</h3>
                    <div className="button-group">
                    <label className="action-button label">
                        Attach File
                        <input 
                        type="file" 
                        style={{ display: 'none' }}
                        onChange={handleFileChange} 
                        />
                    </label>
                    </div>
                </div>
                <p>{fileName || "Add your attachments here..."}</p> {/* Display default text if no file is selected */}
                </div>

            </div>

                <button className="btn submit" >Send Email</button>

                <ToastContainer />
        </div>
    );
};

export default EmailCampaign;
