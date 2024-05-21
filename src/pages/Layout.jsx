import { useContext, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SettingsContext } from '../context/SettingsContext';
import NavBar from '../elements/NavBar';

const Layout = () => {
  const location = useLocation(); // location.pathname === '/' ? 'home' : '';
  const { settings, setSettings } = useContext(SettingsContext);

  return (
    <div>
      <h1>cool</h1>
      <NavBar />

      <div className="route-output">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
