import React from "react";
import "./index.css";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";

function Index({ data, type, style, callBack, navigate }) {
  const getBtnTypeStyle = {
    primary: "btn-primary",
    outline: "btn-outline",
  };
  return type === "button" ? (
    <div onClick={callBack} className={getBtnTypeStyle[style]}>
      {data}
    </div>
  ) : (
    <Link className="btn-link" to={navigate}>
      {data}
    </Link>
  );
}

Index.propTypes = {
  navigate: Proptypes.string,
  style: Proptypes.string,
  data: Proptypes.element,
  callBack: Proptypes.func,
};
Index.defaultProps = {
  navigate: "/",
  type: "button",
  data: "Text",
  style: "primary",
};

export default Index;
