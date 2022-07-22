import React, { useLayoutEffect, useState } from 'react';
import '../styles/darkmode.css';

const DarkMode = () => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    document.body.className = theme;
    document.body.style.backgroundColor = theme;
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div>
      <div className={`${theme}`}>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
};

export default DarkMode;
