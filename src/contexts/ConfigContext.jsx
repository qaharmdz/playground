import React, { createContext, useState } from 'react';
import rootConfig from '../config';

const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
  const [settings, setSettings] = useState(rootConfig.settings);

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  const config = {
    ...rootConfig,
    settings,
    setSettings: updateSettings,
  };

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
