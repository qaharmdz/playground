import React from 'react';
import { json } from "react-router-dom";

const About = () => {
  // throw new Response("Not Found", { status: 404 });
  throw json(
    {
      message: "Throw API error.",
    },
    { status: 401 }
  );

  return <div>About Page</div>;
};

export default About;
