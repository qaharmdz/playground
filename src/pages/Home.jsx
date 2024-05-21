import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { SettingsContext } from "../services/SettingsContext";

const Home = () => {
  const [pageMeta, setPageMeta] = useOutletContext();
  const { settings, setSettings } = useContext(SettingsContext);

  const pageInfo = {
    title: 'Home',
  };

  useEffect(() => {
    setPageMeta({ ...pageMeta, ...pageInfo })
  }, []);

  return (
    <div>
      <p>Welcome to the Home Page!</p>
    </div>
  )
};

export default Home;
