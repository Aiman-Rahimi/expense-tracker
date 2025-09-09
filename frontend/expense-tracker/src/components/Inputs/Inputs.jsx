import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Inputs = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      )}

      <div className="input-box flex items-center border rounded-md px-2 py-1">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEyeSlash
              size={20}
              className="text-primary cursor-pointer ml-2"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer ml-2"
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Inputs;
