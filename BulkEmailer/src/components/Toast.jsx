import React from 'react';
import './Toast.css'; 

function Toast({ message, onClose }) {
  return (
    <div className="toast">
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Toast;
