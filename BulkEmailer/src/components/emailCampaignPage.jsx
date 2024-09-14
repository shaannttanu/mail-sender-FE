import "./emailcampaignPage.css";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



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
                        <ul className="dropdown">
                            <li className="dropdown-item" onClick={() => handleSenderSelect("Yash Garg")}>Yash Garg</li>
                            <li className="dropdown-item" onClick={() => handleSenderSelect("Shantanu  Singh")}>Shantanu Singh</li>
                            <li className="dropdown-item" onClick={() => handleSenderSelect("Naman Jain")}>Naman Jain</li>
                        </ul>
                    )}
                    
                </div>

                <div className="section">
                    <div className="section-header">
                        <h3>Recipients</h3>
                        <div className="button-group">
                            <button className="action-button">Download Template</button>
                            <button className="action-button">Upload CSV</button>
                        </div>
                    </div>
                    <p>The people who receive your campaign</p>
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
                <button className="btn submit" >Submit</button>
            </div>
        </div>
    );
};

export default EmailCampaign;
