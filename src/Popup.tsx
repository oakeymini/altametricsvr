import React from 'react';
import './Popup.css';

interface PopupProps {
  onClose: () => void;
  data: any;
}

const Popup: React.FC<PopupProps> = ({ onClose, data }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Invoice Detail</h2>
        <p>ID: {data.id}</p>
        <p>Amount: {data.amount}</p>
        <p>Due Date: {data.due_date}</p>
        <p>Description: {data.description}</p>
        <p>User ID: {data.user_id}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
