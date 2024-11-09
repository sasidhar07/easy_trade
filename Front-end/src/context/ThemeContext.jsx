// src/context/ThemeContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Default theme

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook for using the theme context
export const useThemeContext = () => {
    return useContext(ThemeContext);
};
