import React, { forwardRef, useId } from "react";

function Input({
  type = "text",
  placeholder,
  label,
  className = "",
  id,
  ...props
}, ref) {
  return (
    <input
    ref={ref}
      id={id}
      className={`p-3 rounded text-white bg-blue-500/10 flex justify-center items-start ${className} `}
      type={type}
      placeholder={placeholder}
      name={`${label}`}
      {...props}
    />
  );
}

export default forwardRef(Input);
