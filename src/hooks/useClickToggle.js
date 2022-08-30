import { useEffect } from "react";
import { useState } from "react";

const useClickToggle = ({ menuRef }) => {
  const [isShow, setIsShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  function windowClick(e) {
      if (e.target === menuRef.current) {
        setIsShow((x) => !x);
        return;
      } else if (e.target !== menuRef.current) {
        setIsShow(false);
      }
    
  }
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    window.addEventListener("click", windowClick);
    return () => {
      window.removeEventListener("click", windowClick);
    };
  }, []);
  return { isMobile, isShow, setIsShow };
};

export default useClickToggle;
