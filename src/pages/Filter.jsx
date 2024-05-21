import { useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

const Filter = () => {
  const [pageMeta, setPageMeta] = useOutletContext();
  const pageInfo = {
    title: 'Filter',
  };

  useEffect(() => {
    setPageMeta({ ...pageMeta, ...pageInfo })
  }, []);

  return (
    <div>
      <p>Welcome to the Filter Page!</p>
    </div>
  )
};

export default Filter;
