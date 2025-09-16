import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import Home from './Home';
import Table from './Table';

const toggleButton = () => {
  const [isHome, setIsHome] = useState(true);  // Default to Home component

  // Handle the toggle change
  const handleToggleChange = (event) => {
    setIsHome(event.target.checked);
  };

  return (
    <div>

      {/* Toggle Switch to switch between Home and Table */}
      <FormControlLabel
        control={
          <Switch
            checked={isHome}
            onChange={handleToggleChange}
            name="toggleComponents"
            color="primary"
          />
        }
        label={isHome ? 'Home' : 'Table'}
      />

      {/* Display the corresponding component based on the toggle state */}
      {isHome ? <Home /> : <Table />}
    </div>
  );
};

export default toggleButton;
