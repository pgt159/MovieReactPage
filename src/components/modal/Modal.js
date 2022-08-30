import React from "react";

const Modal = ({ show, setShow, children }) => {
    const handleClick = (e) => {
        if (e.target.className.includes('layer')) {
            setShow(false)
        }
    }
  return (
    <div className={`fixed layer inset-0 bg-black bg-opacity-60 z-[9999] flex justify-center items-center ${show ? 'flex' : "hidden"}`} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Modal;
