import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="primary-heading--container">
      <h1 className="heading">REMINDER APP</h1>
      <h1 className="primary-heading">
        Do you keep forgetting important thing on a daily basis?
      </h1>
      <h1 className="secondary-heading">
        Has this caused you to lose a lot of opportunites recently?
      </h1>
      <h1 className="third-heading">
        This Reminder App is the solution to all your problems. Sign Up to find
        out how
      </h1>
      <div className="fourth-heading">
        <Link to="/signup">
          <div> Sign Up |</div>
        </Link>
        <Link to="/login">
          <div>Log In </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
