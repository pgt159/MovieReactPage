import React from "react";
import { useEffect } from "react";

const CheckBox = ({listItem, selected, setSelected}) => {
     let isSelected = selected.includes(listItem);
     console.log(selected)
     useEffect(() => {
        isSelected = selected.includes(listItem);
        console.log(isSelected)
     },[selected])

  return (
    <button
      className="w-6 h-6 border-[3px] border-secondary 
                my-3 relative left-2/4 -translate-x-2/4 hover:border-subText transition-all
                hover:bg-slate-700"
                onClick={() => {
                    if (selected.includes(listItem)){
                        const result = selected.filter(item => (JSON.stringify(item) !== JSON.stringify(listItem)));
                        setSelected([...result]);
                    } else {
                        setSelected([...selected, listItem])
                    }
                }}
    >
      {isSelected && <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>}
    </button>
  );
};

export default CheckBox;
