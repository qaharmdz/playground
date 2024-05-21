import React, { createContext, useState } from 'react';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    appInfo: 'Tonggo Event Management',
    version: '1.0.0',
    subSettings: {
      theme: 'light',
      notifications: true
    }
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
