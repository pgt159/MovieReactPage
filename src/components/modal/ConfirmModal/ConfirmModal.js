import React, { useState } from "react";

const ConfirmModal = ({ func, action, setShow, reauth }) => {
  const [pass,setPass] = useState('')
  return (
    <div className="max-w-[500px] mx-5 flex flex-col md:gap-10 gap-5 bg-white text-black p-8 rounded-xl md:text-base text-xl">
      <span>
        By clicking <span className="font-semibold">'Confirm'</span> , you will{" "}
        <span className="text-red-600">{action}</span>. Still proceed?
      </span>
      {reauth && (
        <label htmlFor="password">
        <span className="mb-3 block font-semibold text-red-500">Please confirm by entering your password</span>
          <input
            id="password"
            type="password"
            className="px-4 py-2 bg-gray-300 w-full rounded-lg outline-none border-none"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
      )}
      <div className="flex flex-row gap-5 justify-center">
        <button
          className="px-4 py-2 rounded-lg bg-gray-400 hover:opacity-80 transition-all"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 text-white py-2 rounded-lg bg-sky-600 hover:opacity-80 transition-all"
          onClick={() => {
            func(pass);
            setShow(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
