import React, { useState } from 'react';
import styles from '../styles/dropdown.module.css';

interface DropdownProps {
  title: string;
  items: string[];
  onSelect: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="p-4 bg-gray-50 flex flex-col items-center">
      <div className={styles.dropdown}>
        <div className="flex justify-center">
            <h1 className="text-xl font-bold pb-2">{title}</h1>
        </div>
        <button onClick={toggleDropdown} className={styles["dropdown-button"]}>
          {title}
        </button>
        {isOpen && (
          <ul className={styles["dropdown-menu"]}>
            {items.map((item, index) => (
              <li key={index} className={styles["dropdown-item"]} onClick={() => handleSelect(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;