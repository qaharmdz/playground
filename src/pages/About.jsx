import { useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

const About = () => {
  const [pageMeta, setPageMeta] = useOutletContext();
  const pageInfo = {
    title: 'About',
  };

  useEffect(() => {
    setPageMeta({ ...pageMeta, ...pageInfo })
  }, []);

  return (
    <div>
      <p>Welcome to the About Page!</p>
    </div>
  );
};

export default About;
