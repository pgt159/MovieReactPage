import React from "react";

const ButtonWatch = ({ onClick, className, children, bgColor='primary' }) => {
    let bgClassName = 'bg-primary'
    switch (bgColor) {
        case 'primary':
            bgClassName = 'bg-primary'
            break;
        case 'secondary':
            bgClassName = 'bg-secondary'
            break;
    
        default:
            break;
    }
  return (
    <button
      onClick={onClick}
      className={`${className} ${bgClassName}`}
    >
      {children}
    </button>
  );
};

export default ButtonWatch;
