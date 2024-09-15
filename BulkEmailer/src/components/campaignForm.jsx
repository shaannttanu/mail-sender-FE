import './campaignform.css'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ campaignName: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.campaignName.trim()) {
      try {
        const response = await fetch('http://localhost:8080/api/v1/emailer/createCampaign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Campaign Created:", data);
          console.log('Navigating to campaignPage...');
          navigate('/campaignPage', { state: { campaignName: formData.campaignName, campaignId: data.id } });
        } else {
          console.error('Failed to create campaign, response status:', response.status);
          alert('Failed to create campaign');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error creating campaign');
      }
    } else {
      alert('Enter the campaign name');
    }
  };

  const handleReset = () => {
    setFormData({ campaignName: '' });
  };

  return (
    <div className="campaign-form">
      <h1 className="title">Create Email Campaign</h1>
      <div className="form-group">
        <label htmlFor="campaignName" className="label">Campaign Name</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="campaignName"
            className="input"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleChange}
            required
          />
          {formData.campaignName && (
            <button className="reset-btn" onClick={handleReset}>Reset</button>
          )}
        </div>
        <div className="buttons">
          <button className="btn submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
