import React from 'react';
import './confirmationModal.css';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmation</h2>
        <p>All the changes will be lost. Do you want to continue?</p>
        <div className="button-group">
          <button className="btn ok-btn" onClick={onConfirm}>OK</button>
          <button className="btn cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
