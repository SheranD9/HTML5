import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';

const SosButton = () => {
  const { addLog } = useTaskStore();

  const handleClick = () => {
    addLog("🚨 SOS！誰か助けてください！");
  };

  return (
    <button className="sos-button" onClick={handleClick}>
      SOS
    </button>
  );
};

export default SosButton;