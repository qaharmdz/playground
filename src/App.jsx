import React from 'react';

import { SettingsProvider } from './context/SettingsContext';
import Router from "./services/Router";

const App = () => {
  return (
    <SettingsProvider>
      <Router />
    </SettingsProvider>
  );
};

export default App;
