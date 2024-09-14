import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignForm from './components/campaignForm'
import EmailCampaignPage from './components/emailCampaignPage'

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<CampaignForm />} />
        <Route path="/campaignPage" element={<EmailCampaignPage />} />
      </Routes>
    </Router>
   
  )
}

export default App
