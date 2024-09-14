import './campaignform.css'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    if( formData.name.trim()){
      navigate('/campaignPage', { state: formData });
    }
    else{
      alert("Enter the name");
    }
    
  };

  const handleCancel = () => {
    setCampaignName('');
    // Add additional cancel logic here
  };

  return (
    <div className="campaign-form">
      <h1 className="title">Create Email Campaign</h1>
      <div className="form-group">
        <label htmlFor="campaignName" className="label">Campaign Name </label>
        <input
          type="text"
          id="campaignName"
          className="input"
          name='name'
          value={formData.name} onChange={handleChange} 
          required 
        />
        <div className="buttons">
        <button className="btn cancel" onClick={handleCancel}>Cancel</button>
        <button className="btn submit" onClick={handleSubmit}>Submit</button>
      </div>
      </div>
      
    </div>
  );
};

export default CampaignForm;
