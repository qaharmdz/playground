import { Routes, Route } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from '../pages/Home';
import Filter from '../pages/Filter';
import About from '../pages/About';
import Error from "../pages/Error";

// Test: throw new Response("Not Found", { status: 404 });
const ErrorBoundary = () => {
  let error = useRouteError();
  console.error('ErrorBoundary', error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>404 Not Found</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }
  }

  return <div>Oops! Something went wrong</div>;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default Router;
