import React, { useEffect, useRef, useState } from "react";

function useOutsideClick() {
  const ref = useRef();
  const [clickedOutside, setClickOutside] = useState(false);
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setClickOutside(true);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [ref]);
  return [ref, clickedOutside];
}

export default useOutsideClick;
