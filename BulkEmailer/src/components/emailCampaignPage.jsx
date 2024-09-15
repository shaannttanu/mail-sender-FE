import "./emailcampaignPage.css";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';



const EmailCampaign = () => {
    const [subjectOpen, setSubjectOpen] = useState(false); // State to control the visibility of the text box for subject
    const [subject, setSubject] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [senderDropdownOpen, setSenderDropdownOpen] = useState(false); // State for sender dropdown visibility
    const [selectedSender, setSelectedSender] = useState('');
    const location = useLocation();
    const { name } = location.state || { name: "" };
    const navigate = useNavigate();

    const selectSenderClick = () => {
        setSenderDropdownOpen(!senderDropdownOpen);
    };

    const handleSenderSelect = (sender) => {
        setSelectedSender(sender);
        setSenderDropdownOpen(false); // Close the dropdown after selection
    };

    const handleAddSubjectClick = () => {
        setSubjectOpen(true); // Set to true when button is clicked
    };

    const handleHideSubjectClick = () => {
        setSubjectOpen(false); // Set to false to hide the textarea
    };

    const backButton = (e) => {
        navigate('/');
    }
    const subjectNames = (e) => {
        setSubject(e.target.value);
    }
    const submitSubject = () => {
        setSubjectName(subject);
        setSubjectOpen(false);
        setSubject('');
    }
    const [fileName, setFileName] = useState(""); // Empty state initially
      
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
           setFileName(file.name); // Update the file name in the state
        }
    };

    const [toastMessage, setToastMessage] = useState(""); // State to manage toast message visibility

    const uploadCSV = (event) => {
        const file = event.target.files[0];
        
        if (file) {
        const validExtensions = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (validExtensions.includes(file.type)) {
            setFileName(file.name); // If valid file, update fileName
        } else {
            setToastMessage("Please upload only Excel files!"); // Show toast if invalid file
        }
        }
    };

    const handleCloseToast = () => {
        setToastMessage(""); // Close toast message
    };


    return (
        <div className="frame">

           
            <div className="back-section">
                <button className="back-button" onClick={backButton}>←</button>
                <span className="back-text">{name !== '' ? name : "Back to campaign"}</span>
            </div>
           


            <div className="campaign-container">

                <div className="section">
                    <div className="section-header">
                        <h3>Sender</h3>
                        <button className="action-button" onClick={selectSenderClick}>Select sender</button>
                    </div>
                     {/* Display the selected sender or default message */}
                    <p>{selectedSender ? `Sender is: ${selectedSender}` : "Who is sending this email campaign?"}</p>

                    {/* Conditionally render the dropdown */}
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
                            <button className="action-button">Download Template</button>
                            <label className="action-button label" >Upload CSV
                                <input 
                                    className="file_input"
                                    type="file"  
                                    onChange={uploadCSV} 
                                    accept=".xls,.xlsx"
                                />
                            </label>
                        </div>
                    </div>
                    <p>{fileName || "The people who receive your campaign.."}</p>

                    {/* Show toast if there's a message */}
                    {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}
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
                    <p>{subjectName != "" ? subjectName  : "Add a subject line for your campaign here.."}</p>
                    {subjectOpen && (
                        <div className="subject">
                            <input className="input" type="text" value={subject} onChange={subjectNames} />
                            <button className="ok-btn" onClick={submitSubject} >ok</button>
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

                <button className="btn submit" >Submit</button>
            </div>

            

        </div>
    );
};

export default EmailCampaign;
