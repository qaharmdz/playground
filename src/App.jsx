import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SettingsProvider } from './services/SettingsContext';
import Navbar from './elements/NavBar';

const App = () => {
  const location = useLocation();
  const [pageMeta, setPageMeta] = useState({
    title: 'n/a'
  });
  // console.log(location);

  return (
    <SettingsProvider>
      <div>
        <header>
          <h1>{pageMeta.title} Page</h1>
          <Navbar />
          [Breadcrumb :: {pageMeta.title}]
        </header>
        <main>
          <Outlet context={[pageMeta, setPageMeta]} />
        </main>
      </div>
    </SettingsProvider>
  )
};

export default App;
