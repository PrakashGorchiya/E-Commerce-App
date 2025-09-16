import React, { useState } from 'react';
// import './NestedDropdown.css';

const NestedDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubDropdown = () => {
    setIsSubOpen(!isSubOpen);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Menu
        <span className="arrow">▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            Option 1
          </a>
          <a href="#" className="dropdown-item">
            Option 2
          </a>
          <div className="nested-dropdown">
            <button className="nested-button" onClick={toggleSubDropdown}>
              Submenu
              <span className="arrow">▼</span>
            </button>

            {isSubOpen && (
              <div className="sub-dropdown-content">
                <a href="#" className="dropdown-item">
                  Sub Option 1
                </a>
                <a href="#" className="dropdown-item">
                  Sub Option 2
                </a>
                <a href="#" className="dropdown-item">
                  Sub Option 3
                </a>
              </div>
            )}
          </div>
          <a href="#" className="dropdown-item">
            Option 3
          </a>
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;