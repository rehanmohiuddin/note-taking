import React from "react";
import "./index.css";
import Button from "../../Components/Button";

function Index() {
  return (
    <div className="page-not-found-container">
      <div className="kash-h4">404 | Page Not Found</div>
      <div className="kash-h5">You just hit a route that doesn't exist...</div>
      <Button type={"link"} navigate="/tasks" data={"Go To Home"} />
    </div>
  );
}

export default Index;
